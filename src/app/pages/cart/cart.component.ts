import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart, cartItems } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cart : Cart = {items : []};

  dataSource : Array<cartItems> = [];
  displayColumns : Array<string> = [
    'product' ,
    'name',
    'price' ,
    'quantity',
    'total',
    'action'
  ];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart : Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;   
    })
  }

getTotal(items : Array<cartItems>): number{
 return this.cartService.getTotal(items);
}

onClearCart(): void{
this.cartService.clearCart();
}

onRemoveFromCart(item : cartItems):void{
this.cartService.removeFromCart(item);
}

onAddQuantity(item :cartItems) : void{
  this.cartService.addToCart(item);
}

onRemoveQuantity(item : cartItems):void{
this.cartService.removeQuantity(item);
}

}

