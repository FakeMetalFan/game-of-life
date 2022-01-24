import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import {
  each,
  floor,
} from 'lodash-es';

import Cell from '@constants/cell';

import PointUtils from '@utils/point-utils';

const getCellFill = (cell: Cell) => {
  if (cell === Cell.New) {
    return '#66acff';
  }

  if (cell === Cell.Old) {
    return '#0075ff';
  }

  return '#292524';
};

@Component({
  selector: 'app-grid',
  template: `
    <canvas
      [width]='width * cellSize + 1'
      [height]='height * cellSize + 1'
      [drawCallback]='drawCallback'
      (click)='onClick($event)'
      appCanvas
    >
    </canvas>
  `,
  styles: [
    `
      canvas {
        background-color: #000;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnChanges, OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() cellSize: number;
  @Input() cells: Cell[] = [];
  @Input() changedIndexes: number[];
  @Output() click$ = new EventEmitter<number>();
  drawCallback: CanvasDrawCallback;

  private pointUtils: PointUtils;

  ngOnChanges(changes: SimpleChanges) {
    this.drawCallback = (props) => {
      if (changes?.['changedIndexes']?.currentValue?.length) {
        each(this.changedIndexes, (index) => {
          this.drawCell(this.cells[index], index, props);
        });

        return;
      }

      each(this.cells, (cell, index) => {
        this.drawCell(cell, index, props);
      });
    };
  }

  ngOnInit() {
    this.pointUtils = new PointUtils(this.width);
  }

  onClick = ({
    clientX,
    clientY,
    target,
  }: MouseEvent) => {
    const {
      left,
      top,
    } = (target as Element).getBoundingClientRect();

    this.click$.emit(
      this.pointUtils.toIndex(
        floor((clientX - left) / this.cellSize),
        floor((clientY - top) / this.cellSize),
      ),
    );
  };

  private drawCell = (cell: Cell, index: number, {
    ctx,
  }: CanvasDrawProps) => {
    const {
      x,
      y,
    } = this.pointUtils.toPoint(index);

    ctx.fillStyle = getCellFill(cell);
    ctx.fillRect(
      x * this.cellSize + 1,
      y * this.cellSize + 1,
      this.cellSize - 1,
      this.cellSize - 1
    );
  };
}
