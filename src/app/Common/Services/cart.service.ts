import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { CartModels } from '../Models/Cart.Models';
import { HttpService } from './Http.Service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart!: CartModels.Cart;
  cart$: BehaviorSubject<CartModels.Cart> = new BehaviorSubject<CartModels.Cart>(new CartModels.Cart());
  set Cart(value: CartModels.Cart) {
    this.cart = value;
    this.cart$.next(this.cart);
  }
  get Cart(): CartModels.Cart {
    return this.cart
  }


  constructor(private HttpService: HttpService) { }

  GetCart() {
    this.HttpService.Get<any>(HttpEndPoints.Cart.Get).subscribe({
      next: cart => {
        this.Cart = cart
      }
    })
  }

  addToCart(cartItem: CartModels.CartItem) {
    return firstValueFrom(this.HttpService.Put2<CartModels.CartItem, CartModels.Cart>(HttpEndPoints.Cart.AddItem, cartItem)).then(newCart => {
      this.Cart = newCart
    })
  }

  removeFromCart(itemId: number) {
    let endPoint = HttpEndPoints.Cart.RemoveItem;
    endPoint = endPoint.replace('{id}', itemId.toString())
    return this.HttpService.Put2<any, CartModels.Cart>(endPoint, {}).subscribe({
      next: newCart => {
        this.Cart = newCart
      }
    })
  }

  // clearCart(): void {
  //   this.cart.CartItems = [];
  //   this.cart$.next(this.cart);
  // }

  async getCheckoutLink() {
    // test cards
    // https://docs.stripe.com/testing#cards
    // https://www.memberstack.com/blog/stripe-test-cards

    // 4242 4242 4242 4242  success
    // 4000 0000 0000 9995  failure
    const data: any = await firstValueFrom(this.HttpService.Get(HttpEndPoints.Payment.Checkout));
    // return data.url
    window.location.assign(data.url);
  }
}