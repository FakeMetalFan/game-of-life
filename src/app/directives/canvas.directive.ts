import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appCanvas]'
})
export class CanvasDirective implements OnChanges {
  @Input() drawCallback: CanvasDrawCallback;

  private ctx: CanvasRenderingContext2D;

  constructor(private elementRef: ElementRef<HTMLCanvasElement>) {
    if (this.elem instanceof HTMLCanvasElement) {
      this.ctx = this.elem.getContext('2d');

      return;
    }

    throw 'directive [appCanvas] must be used with HTMLCanvasElement';
  }

  ngOnChanges(changes: SimpleChanges) {
    const {
      width,
      height,
    } = this.elem;

    changes?.['drawCallback']?.currentValue?.({
      width,
      height,
      ctx: this.ctx,
    });
  }

  get elem() {
    return this.elementRef.nativeElement;
  }
}
