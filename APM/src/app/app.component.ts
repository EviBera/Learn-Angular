import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
    <h5>My first component (AppComponent - whole screen, its title:)</h5>
    
    <nav class='navbar nav-expand navbar-light bg-light'>
      <a class='navbar-brand'>{{pageTitle}}</a>
      <ul class='nav nav-pills'>
        <li><a class='nav-link' [routerLink]="['/welcome']">Home</a></li>
        <li><a class='nav-link' [routerLink]="['/products']">Products</a></li>
      </ul>
    </nav>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}