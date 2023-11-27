import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  visible:boolean = true;
  constructor(
    private cartservice : CartService,
    ) { 
      
    }
    
  title = 'EcommerceFrontend';
  cart : Cart = {items : []}
  ngOnInit(): void {
    this.cartservice.cart.subscribe((_cart) =>{
    this.cart = _cart;
    })
  }
  setVisibility(visibility:boolean):void{
    this.visible = visibility;
  }
}
