import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create/create.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'detail/:id',
    title: 'Product Details',
    loadComponent: () =>
      import('./detail/detail.component').then((m) => m.DetailComponent),
  },
  {
    path: 'create',
    title: 'Create Product',
    loadComponent: () =>
      import('./create/create/create.component').then((m) => m.CreateComponent),
  },
];
