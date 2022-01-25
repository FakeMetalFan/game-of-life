import {
  NgModule,
} from '@angular/core';
import {
  BrowserModule,
} from '@angular/platform-browser';

import {
  ButtonComponent,
} from '@components/button';
import {
  CounterComponent,
} from '@components/counter';
import {
  FooterComponent,
} from '@components/footer';
import {
  GridComponent,
} from '@components/grid';
import {
  HeaderComponent,
} from '@components/header';
import {
  RangeComponent,
} from '@components/range';

import {
  GameOfLifeComponent,
} from '@containers/game-of-life';

import {
  CanvasDirective,
} from '@directives/canvas.directive';

import {
  AppComponent,
} from './app.component';

import {
  FontAwesomeModule,
} from './font-awesome.module';

@NgModule({
  declarations: [
    ButtonComponent,
    CounterComponent,
    FooterComponent,
    GridComponent,
    HeaderComponent,
    RangeComponent,
    GameOfLifeComponent,
    CanvasDirective,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
