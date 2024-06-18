import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { authGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ViewSnippetComponent } from './components/view-snippet/view-snippet.component';
import { DefferdemoComponent } from './components/defferdemo/defferdemo.component';
import { Home2Component } from './components/home2/home2.component';
import { MystoreComponent } from './components/mystore/mystore.component';
import { MySnippetComponent } from './components/my-snippet/my-snippet.component';

export const routes: Routes = [
  {  path: 'about', loadComponent: () =>  import('./components/about/about.component').then( (mod) => mod.AboutComponent) },
  {  path: 'create', loadComponent: () =>  import('./components/create-store/create-store.component').then( (mod) => mod.CreateStoreComponent), canActivate: [authGuard] },
  // { path: '',redirectTo:"/login",pathMatch:"full" },
  { path: 'store', component: HomeComponent , canActivate: [authGuard]},
  { path: 'demo', component: DefferdemoComponent, canActivate: [authGuard] },
  { path: '', component: Home2Component },
  { path: 'snippet/:id', component: ViewSnippetComponent , canActivate: [authGuard]},
  { path: 'mysnippet/:id', component: MySnippetComponent , canActivate: [authGuard]},
  { path: 'mystore', component: MystoreComponent , canActivate: [authGuard]},
  { path: '**', component: NotFoundComponent },
];
