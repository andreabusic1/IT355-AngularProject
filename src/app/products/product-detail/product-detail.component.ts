import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { IqosService } from '../../services/iqos.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  successMessage: string = ''; 
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private iqosService: IqosService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.iqosService.getProductById(id).subscribe(
      data => this.product = data,
      error => console.error('There was an error!', error)
    );
  }

  get totalPrice(): number {
    return this.quantity * (this.product ? this.product.price : 0);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
  
  addToCart(product: Product): void {
    if (this.quantity > 0 && this.quantity <= product.stock) {
      this.cartService.addToCart(product, this.quantity);
      console.log('Dodato u korpu:', product, 'Količina:', this.quantity);
      this.successMessage = `You have successfully added ${this.quantity}  to the cart`;
      
      // Uklonite poruku nakon 3 sekunde
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } else {
      this.successMessage = 'Invalid quantity';
      
      // Uklonite poruku nakon 3 sekunde
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }
}
