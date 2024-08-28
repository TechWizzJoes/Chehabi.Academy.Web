import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '@App/Common/Services/cart.service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss',
})
export class CartButtonComponent implements OnInit {
  counter: number = 0;
  constructor(private CartService: CartService, private HttpService: HttpService) { }

  ngOnInit(): void {
    this.CartService.cart$.subscribe({
      next: (cart) => {
        this.counter = cart.CartItems.length;
      },
    });

    this.HttpService.Get<any>(HttpEndPoints.Cart.Get).subscribe({
      next: cart => {
        this.CartService.Cart = cart
      }
    })
  }
}
