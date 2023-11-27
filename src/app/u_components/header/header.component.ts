import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart, cartItems } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{

  private _cart : Cart = {items : []};
  itemsQuantity = 0;
  @Input()
  get cart(): Cart{
    return  this._cart;
  }
  set cart(cart : Cart){
    this._cart = cart;
    this.itemsQuantity = cart.items
    .map((item) => item.quantity)
    .reduce((prev, current) => prev + current , 0);
  }
  constructor(private cartService : CartService) { }

  // ngOnInit(): void {
  // }

  getTotal(items : Array<cartItems>): number{
    return this.cartService.getTotal(items);
   }

   onClearCart():void{
    this.cartService.clearCart();
   }

}
