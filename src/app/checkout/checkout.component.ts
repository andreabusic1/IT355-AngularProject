import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: { product: Product, quantity: number }[] = [];
  userId: number = 1;  // Primer korisničkog ID-a, potrebno je da ga dinamički postavite

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  placeOrder(): void {
    this.router.navigate(['/order-form']);  // Navigacija na novu formu za narudžbinu
  }
}
