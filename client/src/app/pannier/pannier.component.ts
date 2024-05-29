import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../food/food.service';
import { Cart } from './cart';
import { initFlowbite } from 'flowbite';
import { CartService } from './cart.service';

@Component({
  selector: 'app-pannier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pannier.component.html',
  styleUrls: ['./pannier.component.css'],
})
export class PannierComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}
  carts: Cart[] = [];
  totalPrice: number;
  activeTab: string = 'cmd';
  isPaiementEnabled: boolean = false;
  ngOnInit(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        this.carts = data;
        console.log(this.carts);
        if (this.carts.length > 0) {
          this.calculateTotalPrice();
        }
      },
      (error) => {
        console.error('Error fetching cart data', error);
      }
    );
    initFlowbite();
  }
  increment(index: number) {
    this.carts[index].quantity += 1;
    this.calculateTotalPrice();
  }
  decrement(index: number) {
    if (this.carts[index].quantity > 0) {
      this.carts[index].quantity -= 1;
      this.calculateTotalPrice();
    }
  }
  calculateTotalPrice() {
    this.totalPrice = this.carts.reduce(
      (acc, cart) => acc + cart.food.price * cart.quantity,
      0
    );
    console.log(this.totalPrice);
  }
  setActiveTab(tab: string) {
    if (tab === 'paiement' && !this.isPaiementEnabled) {
      return;
    }
    this.activeTab = tab;
  }
  confirm() {
    this.isPaiementEnabled = true;
    this.setActiveTab('paiement');
  }
}
