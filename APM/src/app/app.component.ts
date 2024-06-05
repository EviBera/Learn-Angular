import { Component } from "@angular/core";

@Component({
  selector: 'pm-root',
  template: `
    <h5 class='p-2'>My first component (AppComponent - whole screen, its title:)</h5>
    
    <nav class='navbar nav-expand navbar-light bg-light p-2'>
      <h1 class='navbar-brand'>{{pageTitle}}</h1>
      <ul class='nav nav-pills'>
        <li><a class='nav-link' [routerLink]="['/welcome']">Home</a></li>
        <li><a class='nav-link' [routerLink]="['/products']">Products</a></li>
      </ul>
    </nav>

    <div class='container'>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Acme Product Management';
}