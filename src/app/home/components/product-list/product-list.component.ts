import { Component, OnInit } from '@angular/core';
import { ButtonTypes } from 'src/assets/model/button-types';
import { Iproduct } from 'src/assets/model/iproduct';
import { CartService } from 'src/assets/shared/services/cart.service';
import { ProductService } from 'src/assets/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  ButtonTypes = ButtonTypes;
  productData: Iproduct[] = [];
  totalProducts = 0;
  itemsPerPage = 6;
  paginatedProducts: Iproduct[] = [];
  currentPage = 1;
  selectedProductName = 'All Products';
  countProduct!: number;
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  // Pagination
  onPageChange(page: number) {
    console.log(`Page changed to: ${page}`);
    this.currentPage = page;
    this.paginate(page, this.itemsPerPage);
  }

  paginate(page: number, pageSize: number): void {
    if (Array.isArray(this.productData)) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      this.paginatedProducts = this.productData.slice(start, end);
    } else {
      console.error('productData is not an array:', this.productData);
    }
  }
  // Add To Cart
  addToCart(product: Iproduct) {
    this.cartService.addToCart(product);
    console.log('add');
  }

  // Calculate Price
  calculateDiscountedPrice(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  // Get All Products
  getProduct(category: string = '') {
    this.productService.getAllProducts().subscribe((response) => {
      console.log('Service response:', response);
      if (Array.isArray(response.body?.products)) {
        let products = response.body?.products || [];
        if (category && category !== '') {
          products = products.filter(
            (product) => product.category === category
          );
        }
        this.productData = products;
        this.totalProducts = products.length;
        this.currentPage = 1;
        this.paginate(this.currentPage, this.itemsPerPage);
        this.selectedProductName = category ? category : 'All Products';
      } else {
        console.error(
          'Expected an array of products but got:',
          response.body?.products
        );
      }
    });
  }

  // Handle Search Product
  searchProduct(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.getProduct(); // Reset to all products
    } else {
      this.productService.searchProducts(searchTerm).subscribe((response) => {
        console.log(response, 'from search');
        const products = response.body?.products;
        if (Array.isArray(products)) {
          this.productData = products;
          this.totalProducts = products.length;
          this.currentPage = 1;
          this.paginate(this.currentPage, this.itemsPerPage);
          this.selectedProductName = searchTerm;
        } else {
          console.error('Expected an array of products but got:', products);
        }
      });
    }
  }

  // Handle Search Event
  onSearch(searchTerm: string) {
    this.searchProduct(searchTerm);
  }

  // Handle Category Change
  onCategoryChange(category: string): void {
    console.log(`Category changed to: ${category}`);
    if (category === '') {
      this.getProduct();
    } else {
      this.categoryProduct(category);
    }
  }

  // Handle Search By Category
  categoryProduct(categorySelect: string) {
    this.productService
      .getProductCategory(categorySelect)
      .subscribe((categoryProduct) => {
        console.log(
          categoryProduct,
          'from component product to display category'
        );
        if (Array.isArray(categoryProduct)) {
          this.productData = categoryProduct;
          this.totalProducts = categoryProduct.length;
          this.currentPage = 1;
          this.paginate(this.currentPage, this.itemsPerPage);
          this.selectedProductName = categorySelect;
        } else {
          console.error(
            'Expected an array of products but got:',
            categoryProduct
          );
        }
      });
  }
  // Handle Sorting

  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const sortOption = selectElement.value;
    const [sortBy, sortOrder] = sortOption.split('_');

    this.productService
      .getSortedProduct(sortBy, sortOrder)
      .subscribe((products) => {
        this.productData = products;
        this.totalProducts = products.length;
        this.currentPage = 1;
        this.paginate(this.currentPage, this.itemsPerPage);
      });
  }
}
