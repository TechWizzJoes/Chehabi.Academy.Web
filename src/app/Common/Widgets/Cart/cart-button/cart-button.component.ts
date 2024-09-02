import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '@App/Common/Services/cart.service';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss',
})
export class CartButtonComponent implements OnInit {
  counter: number = 0;
  constructor(private CartService: CartService) { }

  ngOnInit(): void {
    this.CartService.cart$.subscribe({
      next: (cart) => {
        this.counter = cart.CartItems.length;
      },
    });

    this.CartService.GetCart();
  }
}
