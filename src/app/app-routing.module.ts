import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPageModule } from './tabs/tabs.module';
import { Tab1Page } from './tab1/tab1.page';
import { TabsPage } from './tabs/tabs.page';
import { HomeComponent } from './home/home.component';
import { EntreeComponent } from './entree/entree.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionPageModule)
  },
  
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then(m => m.ConnexionPageModule)
  },
  {
    path: 'Accueil',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionPageModule)
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
