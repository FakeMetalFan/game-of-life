import {
  NgModule,
} from '@angular/core';

import {
  FaIconLibrary,
  FontAwesomeModule as FontAwesome,
} from '@fortawesome/angular-fontawesome';

import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [
    FontAwesome,
  ],
  exports: [
    FontAwesome,
  ],
})
export class FontAwesomeModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(faGithub);
  }
}
