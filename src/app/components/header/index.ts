import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      Game of Life
      <a
        class='link'
        href='https://github.com/FakeMetalFan/game-of-life'
        target='_blank'
      >
        <fa-icon
          [icon]='[
            "fab",
            "github",
          ]'
        ></fa-icon>
      </a>
    </header>
  `,
  styles: [
    `
      header {
        width: 100vw;
        font-size: 20px;
        position: relative;
        text-align: center;
        padding: 6px 0;
      }

      .link {
        position: absolute;
        right: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
