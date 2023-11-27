export interface Cart {
    items : Array<cartItems>;
}

export interface cartItems{
    product : string;
    name : string;
    price : number;
    quantity : number;
    id : number;
    description : string;
}