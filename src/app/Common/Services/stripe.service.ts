import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Stripe from 'stripe';
import { HttpService } from './Http.Service';
import { CartService } from './cart.service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  stripe!: Stripe;
  currentCustomer!: Stripe.Customer | Stripe.DeletedCustomer;
  constructor(
    private HttpService: HttpService,
    private CartService: CartService
  ) { }

  async getLink() {
    // test cards
    // https://docs.stripe.com/testing#cards
    // https://www.memberstack.com/blog/stripe-test-cards

    // 4242 4242 4242 4242  success
    // 4000 0000 0000 9995  failure
    let products = await this.CartService.getCartItems();
    let reqmodel = products.map((p) => {
      return { id: p.Id, quantity: p.Quantity };
    });
    const data: any = await firstValueFrom(this.HttpService.Post(HttpEndPoints.Payment.Checkout, reqmodel));
    // return data.url
    window.location.assign(data.url);
  }
}
