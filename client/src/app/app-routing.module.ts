import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./food/food.component').then((m) => m.FoodComponent),
  },
  {
    path: 'pannier',
    loadComponent: () =>
      import('./pannier/pannier.component').then((m) => m.PannierComponent),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./user/user.component').then((m) => m.UserComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
