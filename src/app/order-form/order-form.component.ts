import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expirationDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderData = {
        userId: 1,  // Primer korisničkog ID-a, potrebno je da ga dinamički postavite
        fullName: this.orderForm.value.fullName,
        address: this.orderForm.value.address,
        city: this.orderForm.value.city,
        zipCode: this.orderForm.value.zipCode,
        country: this.orderForm.value.country,
        cardNumber: this.orderForm.value.cardNumber,
        expirationDate: this.orderForm.value.expirationDate,
        cvv: this.orderForm.value.cvv
      };

      this.cartService.createOrder(orderData).subscribe(
        response => {
          console.log('Order placed successfully!', response);
          this.cartService.clearCart();
          this.router.navigate(['/products']);
        },
        error => {
          console.error('There was an error placing the order!', error);
        }
      );
    }
  }
}
