import { Food } from '../food/food';

export class Cart {
  id: number;
  food: Food; // Supposons que Food soit un modèle avec une propriété price
  quantity: number;
  totalPrice: number;
}
