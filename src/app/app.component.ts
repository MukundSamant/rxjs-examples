import { Component, Output } from '@angular/core';
import {Subject, timer} from 'rxjs';
import { exhaustMap} from 'rxjs/operators';
import { delay } from 'q';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rx-demo';
  private clickStream = new Subject<Event>();

  @Output() observ = this.clickStream.asObservable();

  constructor() {
    this.observ.pipe(
      exhaustMap((event) => {
        console.log('save start');
        return timer(5000);
      })
    ).subscribe(() => console.log('save finish'));
  }
  buttonClick(event: Event) {
    this.clickStream.next(event);
  }

  secondButtonClick(event: Event) {
    this.clickStream.next(event);
  }
}
