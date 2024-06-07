import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { IqosService } from '../../services/iqos.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private iqosService: IqosService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.iqosService.getProducts().subscribe(
      data => {
        this.products = data;
        this.filterProducts();
      },
      error => {
        console.error('There was an error fetching products!', error);
      }
    );
  }

  loadCategories(): void {
    this.iqosService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('There was an error fetching categories!', error);
      }
    );
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    this.filterProducts();
  
  }

  filterProducts(): void {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => {
        const category = product.category ? product.category.trim() : '';
     
        const match = category === this.selectedCategory.trim();
        return match;
      });
    }
  }

}
