import { Component } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products!: IProduct[];
  filter: string = '';
  //we can put the injected service here to be more readable (instead of putting it into the constructor)
  //but at testing this can cause problems:
  //private cartSvc: CartService = inject(CartService);

  constructor(
    private cartSvc: CartService, 
    private productSvc: ProductService
  ) { }

  ngOnInit() {
    this.productSvc.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  getFilteredProducts() {
    return this.filter === '' ?
      this.products :
      this.products.filter((product) => product.category === this.filter);
  }

  /*   We have multiple options for applying ngClass directive, eg.: 

  getDiscountedClasses(product: IProduct) {
      return { strikeThroug: product.discount > 0 }
    }
  
  getDiscountedClasses(product: IProduct) {
    if(product.discount > 0) return ['strikeThroug', 'bold'];
    else return [];
  }
  
  */
     
  addToCart(product: IProduct){
    this.cartSvc.add(product);
  }

}
