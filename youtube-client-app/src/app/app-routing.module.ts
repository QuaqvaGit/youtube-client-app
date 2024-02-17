import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import NotFoundPageComponent from './core/pages/not-found-page/not-found-page.component';
import loggedInGuard from './core/guards/logged-in.guard';
import loggedOutGuard from './core/guards/logged-out.guard';

const routes: Routes = [
  {
    path: 'videos',
    loadChildren: () => import('./youtube/youtube.module'),
    canActivate: [loggedInGuard],
  },
  { path: '', redirectTo: 'videos', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module'),
    canActivate: [loggedOutGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
