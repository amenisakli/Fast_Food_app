import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food } from './food';
import { FoodService } from './food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  foods: Food[];
  constructor(private foodService: FoodService, private router: Router) {}
  ngOnInit(): void {
    this.foodService.getFood().subscribe((data) => {
      this.foods = data;
    });
  }

  ajouterPanier(food: Food) {
    this.foodService.addToCart(food.id).subscribe((data) => {
      this.router.navigate(['pannier']);
    });
  }
}
