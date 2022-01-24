import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  UntilDestroy,
  untilDestroyed,
} from '@ngneat/until-destroy';

import {
  filter,
  pluck,
} from 'rxjs';

import {
  GridService,
} from '@services/grid';
import {
  AnimationFramesService,
} from '@services/animation-frames.service';

@UntilDestroy()
@Component({
  selector: 'app-game-of-life',
  template: `
    <app-grid
      *ngIf='gridService.state$ | async as state'
      [width]='state.width'
      [height]='state.height'
      [cells]='state.cells'
      [changedIndexes]='state.changedIndexes'
      [cellSize]='10'
      (click$)='gridService.toggleCell($event)'
    >
    </app-grid>

    <div
      class='controls'
    >
      <div>
        <app-button
          (click)='animationFramesService.resume()'
        >
          Resume
        </app-button>
        <app-button
          (click)='animationFramesService.pause()'
        >
          Pause
        </app-button>
        <app-button
          (click)='gridService.clear()'
        >
          Clear
        </app-button>
        <app-button
          (click)='gridService.populate()'
        >
          Populate
        </app-button>
      </div>

      <div
        class='range'
      >
        <span>Fps cap:</span>
        <app-range
          [min]='0'
          [max]='60'
          [value]='animationFramesService.fpsCap$ | async'
          (change$)='animationFramesService.capFps($event)'
        >
        </app-range>
      </div>
    </div>
  `,
  styles: [
    `
      .controls {
        display: flex;
        align-items: center;
      }

      .range {
        margin: 0 0 0 12px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameOfLifeComponent {
  constructor(
    public gridService: GridService,
    public animationFramesService: AnimationFramesService,
  ) {
    animationFramesService.fps$.pipe(
      untilDestroyed(this),
    ).subscribe(() => {
      gridService.next();
    });
    gridService.state$.pipe(
      pluck('static'),
      filter(Boolean),
      untilDestroyed(this),
    ).subscribe(() => {
      animationFramesService.pause();
    });
  }
}
