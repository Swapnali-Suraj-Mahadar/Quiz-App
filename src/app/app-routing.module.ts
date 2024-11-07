import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthGuard } from '../app/auth/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'categories', component:CategoriesComponent,
    loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule),
canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
