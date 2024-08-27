import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { CourseModels } from '../Models/Course.Models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CourseModels.Class[]>([]);
  cartItems$: Observable<CourseModels.Class[]> = this.cartItems.asObservable();

  addToCart(product: CourseModels.Class): void {
    const currentCart = this.cartItems.getValue();
    const existingItemIndex = currentCart.findIndex(
      (item) => item.Id === product.Id
    );

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].Quantity!++; // Increment quantity if already in cart
    } else {
      product.Quantity = 1; // Add quantity property if new
      currentCart.push(product);
    }

    this.cartItems.next(currentCart);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartItems.getValue();
    const itemIndex = currentCart.findIndex((item) => item.Id === productId);

    if (itemIndex !== -1) {
      currentCart.splice(itemIndex, 1);
      this.cartItems.next(currentCart);
    }
  }

  async getCartItems(): Promise<CourseModels.Class[]> {
    return await firstValueFrom(this.cartItems$);
  }

  clearCart(): void {
    this.cartItems.next([]);
  }
}
