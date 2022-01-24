import {
  Inject,
  Injectable,
  Optional,
} from '@angular/core';

import {
  animationFrames,
  BehaviorSubject,
  filter,
  mapTo,
  Observable,
  pluck,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

const animate = (fpsCap: number) => {
  let prevTimestamp = 0;

  return animationFrames().pipe(
    pluck('timestamp'),
    filter((timestamp) => timestamp - prevTimestamp >= 1e3 / fpsCap),
    tap((timestamp) => {
      prevTimestamp = timestamp;
    }),
    mapTo(fpsCap),
  );
}

@Injectable({
  providedIn: 'root',
})
export class AnimationFramesService {
  private paused$ = new BehaviorSubject(false);
  private fpsCapper$: BehaviorSubject<number>;

  fpsCap$: Observable<number>;
  fps$: Observable<number>;

  constructor(@Inject('fpsCap') @Optional() fpsCap: number) {
    this.fpsCapper$ = new BehaviorSubject(fpsCap ?? 24);
    this.fpsCap$ = this.fpsCapper$.asObservable();
    this.fps$ = this.fpsCap$.pipe(
      switchMap(animate),
      withLatestFrom(this.paused$),
      filter(([, paused]) => !paused),
      pluck('0'),
    );
  }

  capFps = (fpsCap: number) => {
    this.fpsCapper$.next(fpsCap);
  };

  pause = () => {
    this.paused$.next(true);
  };

  resume = () => {
    this.paused$.next(false);
  };
}
