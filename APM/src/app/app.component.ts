import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
  <div>
    <h1>{{pageTitle}}</h1>
    <h5>My first component (up)</h5>
    <h5>My second component (down)</h5>
    <pm-products></pm-products>
  </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}