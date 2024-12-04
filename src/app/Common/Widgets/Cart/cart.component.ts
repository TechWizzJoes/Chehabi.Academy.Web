import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { CartService } from '@App/Common/Services/cart.service';
import { CartModels } from '@App/Common/Models/Cart.Models';
import { TosComponent } from './Tos/Tos';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../Spinners/Loader/Loader';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoaderComponent, TosComponent, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  Cart: CartModels.Cart = new CartModels.Cart();
  isAccepted = false;
  IsLoaded: boolean = false;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.Cart = cart;
    });

    this.cartService.GetCart().add(() => {
      this.IsLoaded = true;
    });
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  // clearCart(): void {
  //   this.cartService.clearCart();
  // }

  // check out customizations
  // https://docs.stripe.com/payments/checkout/customization
  getLink() {
    if (this.Cart.CartItems.length == 0 || !this.isAccepted)
      return;
    this.cartService.getCheckoutLink();
  }
}