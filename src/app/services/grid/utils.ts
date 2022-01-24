import {
  isEmpty,
} from 'lodash-es';

import Cell from '@constants/cell';

export const hasChangedCells = (state: Grid) =>
  !isEmpty(state.changedIndexes);

export const isDeadCell = (cell: Cell) => cell === Cell.Dead;

export const isNewCell = (cell: Cell) => cell === Cell.New;
