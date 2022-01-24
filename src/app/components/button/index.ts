import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        cursor: pointer;
        font-family: inherit;
        font-size: 16px;
        padding: 0 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
