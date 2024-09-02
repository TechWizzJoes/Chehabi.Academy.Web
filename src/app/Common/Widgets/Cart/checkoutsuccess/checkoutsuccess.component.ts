import { Component } from '@angular/core';
import { CartService } from '@App/Common/Services/cart.service';

@Component({
  selector: 'app-checkoutsuccess',
  standalone: true,
  imports: [],
  templateUrl: './checkoutsuccess.component.html',
  styleUrl: './checkoutsuccess.component.scss'
})
export class CheckoutsuccessComponent {

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {

      this.cartService.GetCart();
    }, 500);
  }
}
