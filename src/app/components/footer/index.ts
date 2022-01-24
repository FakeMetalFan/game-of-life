import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <span>
        <span>Powered by</span>
        <a
          href='https://github.com/FakeMetalFan'
          target='_blank'
        >
          <fa-icon
            [icon]='[
              "fab",
              "github",
            ]'
          ></fa-icon>
        </a>
        <span>&copy;</span>
        <span>{{year}}</span>
      </span>
    </footer>
  `,
  styles: [
    `
      footer {
        padding: 2px 0;
      }

      a {
        padding: 0 6px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
