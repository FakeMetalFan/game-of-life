import produce, {
  Draft,
  produceWithPatches,
} from 'immer';

import {
  each,
  floor,
  flow,
  get,
  map,
  negate,
  partial,
  random,
  some,
  toArray,
} from 'lodash-es';

import Cell from '@constants/cell';

import NeighborsUtils from './neighbors-utils';

import {
  hasChangedCells,
  isDeadCell,
  isNewCell,
} from './utils';

const randomizeCell = () => floor(random(0, 1.2, true)) ? Cell.New : Cell.Dead;

const produceState = (state: Grid, callback: (draft: Draft<Grid>) => void) => {
  const [
    next,
    patches,
  ] = produceWithPatches(state, callback);

  return {
    ...next,
    changedIndexes: map(patches, (patch): number => get(patch, 'path[1]')),
  };
};

const getNextCell = (cell: Cell, aliveNeighbors: number) => {
  if (isDeadCell(cell) && aliveNeighbors === 3) {
    return Cell.New;
  }

  if (!isDeadCell(cell) && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
    return Cell.Old;
  }

  return Cell.Dead;
};

export const initState = (width: number, height: number): Grid => {
  const cells = map(
    toArray({
      length: width * height,
    }),
    randomizeCell,
  );

  return {
    width,
    height,
    cells,
    changedIndexes: [],
    static: false,
  };
};

const getFirstGenState = (state: Grid) =>
  produceState(state, ({
    cells,
    width,
    height,
  }) => {
    each(cells, (cell, index) => {
      cells[index] = getNextCell(
        cell,
        new NeighborsUtils(width, height).countAlive(cells, index),
      );
    });
  });

const getNextGenState = (state: Grid) =>
  produceState(state, (draft) => {
    const {
      width,
      height,
      changedIndexes,
      cells,
    } = state;
    const neighborsUtils = new NeighborsUtils(width, height);

    each(changedIndexes, (index) => {
      each(neighborsUtils.getIndexes(index).concat(index), (x) => {
        draft.cells[x] = getNextCell(
          cells[x],
          neighborsUtils.countAlive(cells, x),
        );
      });
    });
  });

const setIsStatic = (state: Grid) =>
  produce(state, (draft) => {
    const {
      cells,
    } = draft;

    draft.static = !some(cells, partial(negate, isDeadCell))
      || (!some(cells, isNewCell) && !hasChangedCells(draft));
  });

export const updateState = (state: Grid) =>
  flow(
    hasChangedCells(state) ? getNextGenState : getFirstGenState,
    setIsStatic,
  )(state);

export const toggleCell = (index: number, state: Grid) =>
  produce(state, ({
    cells,
    changedIndexes,
  }) => {
    cells[index] = cells[index] === Cell.Dead ? Cell.New : Cell.Dead;
    changedIndexes.push(index);
  });

export const clear = (state: Grid) =>
  produce(state, (draft) => {
    draft.cells = map(draft.cells, () => Cell.Dead);
    draft.changedIndexes = [];
    draft.static = true;
  });
