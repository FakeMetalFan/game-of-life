import {
  Directive,
  ElementRef,
  Input,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appCanvas]'
})
export class CanvasDirective {
  @Input() drawCallback: CanvasDrawCallback;

  private drawProps: CanvasDrawProps;

  constructor({
    nativeElement,
  }: ElementRef) {
    if (!(nativeElement instanceof HTMLCanvasElement)) {
      throw 'directive [appCanvas] must be used with HTMLCanvasElement';
    }

    const {
      width,
      height,
    } = nativeElement;

    this.drawProps = {
      width,
      height,
      ctx: nativeElement.getContext('2d')!,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    changes?.['drawCallback']?.currentValue?.(this.drawProps);
  }
}
