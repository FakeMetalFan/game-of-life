import {
  reduce
} from 'lodash-es';

import Cell from '@constants/cell';

import PointUtils from '@utils/point-utils';

export default class {
  private pointUtils = new PointUtils(this.width);

  constructor(private width: number, private height: number) {}

  getIndexes = (index: number) => {
    const {
      x,
      y,
    } = this.pointUtils.toPoint(index);
    const indexes = [];

    for (let dx = -1; dx < 2; ++dx) {
      for (let dy = -1; dy < 2; ++dy) {
        if (dx || dy) {
          indexes.push(
            this.pointUtils.toIndex(
              (x + dx + this.width) % this.width,
              (y + dy + this.height) % this.height
            )
          );
        }
      }
    }

    return indexes;
  };

  countAlive = (cells: Cell[], index: number) =>
    reduce(
      this.getIndexes(index),
      (count, x) => count + (cells[x] === Cell.Dead ? 0 : 1),
      0,
    );
}
