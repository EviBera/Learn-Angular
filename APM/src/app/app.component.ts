import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
  <div>
    <h5>My first component (AppComponent - whole screen, its title:)</h5>
    <h1>{{pageTitle}}</h1>
    <hr style="opacity:1;height:5px;background:black;">
    <h5>My second component (ProductListComponent - below the line)</h5>
    <pm-products></pm-products>
  </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}