import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/prodct.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { StoreService } from 'src/app/services/store/store.service';


const ROWS_HEIGHT: {[id:number]:number} = {1:400 , 3:355, 4: 350};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  constructor(
    private cartservice : CartService,
    private storeService : StoreService
    ) { }
    cols=3;
    rowHeight = ROWS_HEIGHT[this.cols];
    category:string | undefined;
    products : Array<Product> | undefined;
    sort = 'desc';
    count = '12';
    productsSubscription : Subscription | undefined;
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts():void{
    this.productsSubscription = this.storeService.getAllProducts(this.count,this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
        console.log(this.products);
      });
  }

  onColumnsCountChange(colsNum:number):void{
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];

  }
  onShowCategory(newCategory: string):void{
      this.category = newCategory;
      this.getProducts();
  }
  onAddToCart(product: Product):void{
    this.cartservice.addToCart({
      product : product.imageUrl,
      name : product.name,
      price : product.price,
      description : product.description,
      quantity : 1,
      id : product.code,
    });
  }

  onItemsCountChange(newCount : number):void{
      this.count=newCount.toString();
      this.getProducts();
  }

  onSortChange(newSort : string):void{
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }

}
