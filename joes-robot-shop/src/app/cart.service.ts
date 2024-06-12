import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';
import { ILineItem } from './catalog/lineItem.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //cart: IProduct[] = [];
  cart: ILineItem[] = [];
  
  constructor(private http: HttpClient) { }

  /*
  add(product: IProduct){
    this.cart.push(product);
    console.log(`product: ${product.name} added to cart`);
  }
  */

  findLineItem(product: IProduct) {
    return this.cart.find((li) => li.product.id === product.id);
  }

  add(product: IProduct) {
    let lineItem = this.findLineItem(product);
    if(lineItem !== undefined){
      lineItem.qty++;
    } else {
      lineItem = { product: product, qty: 1};
      this.cart.push(lineItem);
    }
        
    this.http.post('/api/cart', this.cart).subscribe(() => {
      console.log(`product: ${product.name} added to cart`);
      console.log(`Total price: $${this.getTotalPrice()}`);
    })
  }

  getTotalPrice() {
    return (
      Math.round(
        this.cart.reduce<number>((prev, cur) => {
          return (
            prev + cur.qty * (cur.product.price * (1 - cur.product.discount))
          );
        }, 0) * 100
      ) / 100
    );
  }

}
