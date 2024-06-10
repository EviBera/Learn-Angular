import { Component } from '@angular/core';
import { IProduct } from './product.model';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  product: IProduct = {
    id: 5,
    description:
      "A robot head with three oscillating eyes -- excellent for surveillance.",
    name: "Surveillance",
    imageName: "head-surveillance.png",
    category: "Heads",
    price: 1255.5,
    discount: 0,
  }

  //the tutorial uses a constructor and hardcodes this.product to be a chosen robot part:
/*   
  constructor() {
    this.product = {
      id: 2,
    description:
      "A friendly robot head with two eyes and a smile -- great for domestic use.",
    name: "Friendly Bot",
    imageName: "head-friendly.png",
    category: "Heads",
    price: 945.0,
    discount: 0.2,
    }
  }
 */

  getImageUrl(product: IProduct): string{
    return '/assets/images/robot-parts/' + product.imageName;
  }

}
