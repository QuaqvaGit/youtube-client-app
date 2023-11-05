import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import NotFoundPageComponent from './core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'videos',  pathMatch: 'full' },
  { path: 'videos', loadChildren: () => import('./youtube/youtube.module').then((module => module.default)) },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then((module => module.default)) },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
