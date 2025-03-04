import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '@App/Common/Services/cart.service';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss',
})
export class CartButtonComponent implements OnInit {
  counter: number = 0;
  RoutePaths = RoutePaths;
  constructor(private CartService: CartService) { }

  ngOnInit(): void {
    this.CartService.cart$.subscribe({
      next: (cart) => {
        this.counter = cart.CartItems?.length ?? 0;
      },
    });

    this.CartService.GetCart();
  }
}
