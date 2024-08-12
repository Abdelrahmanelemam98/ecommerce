import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './home/components/product-list/product-list.component';
import { LoginComponent } from './home/components/login/login.component';
import { AuthGuard } from 'src/assets/guard/auth.guard';

const routes: Routes = [
  {
    path: 'product',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
