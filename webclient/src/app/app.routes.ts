import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShareComponent } from './share/share.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'where',
    component: HomeComponent
  },
  {
    path: 'share',
    component: ShareComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
