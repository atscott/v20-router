import { provideRouter, RouterOutlet, RouterLink } from '@angular/router';
import {
  Component,
  inject,
  provideZonelessChangeDetection,
  signal,
} from '@angular/core';
import { Location } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
  <a routerLink="a">a</a><br/><br/><br/>
  <a routerLink="b">b</a><br/><br/><br/>
  browser path: {{url()}}<br/>
  <hr/>
  <router-outlet />
  `,
  imports: [RouterLink, RouterOutlet],
})
export class App {
  name = 'Angular';
  url = signal(window.location.pathname);
  location = inject(Location);

  constructor() {
    if ((window as any).navigation) {
      (window as any).navigation.addEventListener('currententrychange', () => {
        this.url.set(window.location.pathname);
      });
    } else {
      this.location.onUrlChange(() => {
        this.url.set(window.location.pathname);
      });
    }
  }
}

@Component({
  template: 'a component',
})
export class A {}

@Component({
  template: 'b component',
})
export class B {}

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter([
      { component: A, path: 'a' },
      { component: B, path: 'b' },
    ]),
  ],
});
