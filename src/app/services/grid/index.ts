import {
  Inject,
  Injectable,
  Optional,
} from '@angular/core';

import {
  BehaviorSubject,
  Observable,
  scan,
} from 'rxjs';

import {
  clear,
  initState,
  toggleCell,
  updateState,
} from './state-producers';

const enum ACTION_TYPE {
  INIT,
  NEXT_GEN,
  CELL_TOGGLE,
  CLEAR,
  Populate,
}

type Action =
  | {
      type: ACTION_TYPE.INIT;
    }
  | {
      type: ACTION_TYPE.NEXT_GEN;
    }
  | {
      type: ACTION_TYPE.CELL_TOGGLE;
      payload: number;
    }
  | {
      type: ACTION_TYPE.CLEAR;
    }
  | {
      type: ACTION_TYPE.Populate;
    };

@Injectable({
  providedIn: 'root',
})
export class GridService {
  private actions$ = new BehaviorSubject<Action>({
    type: ACTION_TYPE.INIT,
  });

  state$: Observable<Grid>;

  constructor(@Inject('gridWidth') @Optional() _width: number) {
    const width = _width ?? 100;
    const height = width / 2;

    this.state$ = this.actions$.pipe(
      scan((acc, action) => {
        switch (action.type) {
          case ACTION_TYPE.NEXT_GEN:
            return updateState(acc);
          case ACTION_TYPE.CELL_TOGGLE:
            return toggleCell(action.payload, acc);
          case ACTION_TYPE.CLEAR:
            return clear(acc);
          case ACTION_TYPE.Populate:
            return initState(width, height);
          default:
            return acc;
        }
      }, initState(width, height)),
    );
  }

  next = () => {
    this.actions$.next({
      type: ACTION_TYPE.NEXT_GEN,
    });
  };

  toggleCell = (index: number) => {
    this.actions$.next({
      type: ACTION_TYPE.CELL_TOGGLE,
      payload: index,
    });
  };

  clear = () => {
    this.actions$.next({
      type: ACTION_TYPE.CLEAR,
    });
  };

  populate = () => {
    this.actions$.next({
      type: ACTION_TYPE.Populate,
    });
  };
}
