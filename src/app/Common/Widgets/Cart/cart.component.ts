import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { CartService } from '@App/Common/Services/cart.service';
import { StripeService } from '@App/Common/Services/stripe.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: CourseModels.Class[] = [];

  constructor(
    private cartService: CartService,
    private stripeService: StripeService
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  // check out customizations
  // https://docs.stripe.com/payments/checkout/customization
  getLink() {
    this.stripeService.getLink();
  }
}
