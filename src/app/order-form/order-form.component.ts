// order-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IqosService } from '../services/iqos.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private iqosService: IqosService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      id: [null, Validators.required],
      user_id: [null, Validators.required],
      address_line1: ['', Validators.required],
      address_line2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;

      this.iqosService.createUserAddress(orderData).subscribe(
        response => {
          console.log('Address saved successfully!', response);
          this.router.navigate(['/success']); // Navigate to a success page or another page as needed
        },
        error => {
          console.error('There was an error saving the address!', error);
        }
      );
    }
  }
}
