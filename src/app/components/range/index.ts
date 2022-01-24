import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-range',
  template: `
    <input
      type='range'
      [min]='min'
      [max]='max'
      [value]='value'
      (change)='onChange($event)'
    />
  `,
  styles: [
    `
      input {
        cursor: pointer;
        position: relative;
        margin: 0 0 0 6px;
        top: 3px;
        width: 200px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeComponent {
  @Input() min: number;
  @Input() max: number;
  @Input() value: number;
  @Output() change$ = new EventEmitter<number>();

  onChange = (event: Event) => {
    this.change$.emit((event.target as HTMLInputElement).valueAsNumber);
  };
}
