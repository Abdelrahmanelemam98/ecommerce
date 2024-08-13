import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/assets/shared/services/cart.service';
import { LoginService } from 'src/assets/shared/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  countProduct!: number;
  isLoggedIn: boolean = false;
  isLoginRoute: boolean = false;
  constructor(
    private cartService: CartService,
    private authServices: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCountItem();
    this.isLoggedIn = this.authServices.isLoggedIn();
    this.removeToken();
  }
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onSearch(inputElement.value);
  }

  onSearch(query: string) {
    this.searchEvent.emit(query.trim());
  }
  // Remove Token

  removeToken() {
    this.router.events.subscribe(() => {
      this.isLoginRoute = this.router.url.includes('/login');
      localStorage.removeItem('currentUser');
    });
  }
  // Get Count Proudcut In Cart
  getCountItem() {
    this.cartService.getCartItems().subscribe((items) => {
      this.countProduct = items.length;
    });
  }
}
