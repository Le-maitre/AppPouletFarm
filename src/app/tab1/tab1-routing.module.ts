import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { HomeComponent } from '../home/home.component';
import { EntreeComponent } from '../entree/entree.component';
import { ForumComponent } from '../forum/forum.component';
import { CalendrierComponent } from '../calendrier/calendrier.component';
import { AlerteComponent } from '../alerte/alerte.component';
import { GuideComponent } from '../guide/guide.component';
import { PoussinComponent } from '../poussin/poussin.component';
import { DetailComponent } from '../detail/detail.component';
import { BilanComponent } from '../bilan/bilan.component';
import { RapportComponent } from '../rapport/rapport.component';
import { DetailbilanComponent } from '../detailbilan/detailbilan.component';
import { DetailtacheComponent } from '../detailtache/detailtache.component';
import { ModifierentreeComponent } from '../modifierentree/modifierentree.component';
import { AjoutentreeComponent } from '../ajoutentree/ajoutentree.component';
import { ModifiertachebilanComponent } from '../modifiertachebilan/modifiertachebilan.component';
import { AjoutbilanComponent } from '../ajoutbilan/ajoutbilan.component';
import { AjouttachebilanComponent } from '../ajouttachebilan/ajouttachebilan.component';
import { ModifiertachebilantacheComponent } from '../modifiertachebilantache/modifiertachebilantache.component';
import { VaccinComponent } from '../vaccin/vaccin.component';
import { DetailvaccinComponent } from '../detailvaccin/detailvaccin.component';
import { AjoutvaccinComponent } from '../ajoutvaccin/ajoutvaccin.component';
import { ModifiervaccinComponent } from '../modifiervaccin/modifiervaccin.component';
import { AlimentComponent } from '../aliment/aliment.component';
import { StockComponent } from '../stock/stock.component';
import { VitamineComponent } from '../vitamine/vitamine.component';
import { MortComponent } from '../mort/mort.component';
import { DetailalimentComponent } from '../detailaliment/detailaliment.component';
import { AjoutalimenttComponent } from '../ajoutalimentt/ajoutalimentt.component';
import { ModifieralimenttComponent } from '../modifieralimentt/modifieralimentt.component';
import { DetailvitamineComponent } from '../detailvitamine/detailvitamine.component';
import { AjoutvitamineComponent } from '../ajoutvitamine/ajoutvitamine.component';
import { ModifiervitamineComponent } from '../modifiervitamine/modifiervitamine.component';
import { DetailmortComponent } from '../detailmort/detailmort.component';
import { AjoutmortComponent } from '../ajoutmort/ajoutmort.component';
import { ModifiermortComponent } from '../modifiermort/modifiermort.component';
import { DetailalerteComponent } from '../detailalerte/detailalerte.component';
import { DemarrageComponent } from '../demarrage/demarrage.component';
import { CroissanceComponent } from '../croissance/croissance.component';
import { FinitionComponent } from '../finition/finition.component';
import { SanteComponent } from '../sante/sante.component';
import { AjoutforumComponent } from '../ajoutforum/ajoutforum.component';
import { RecetteComponent } from '../recette/recette.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'entree',
    component: EntreeComponent,
  },

  {
    path: 'poussin/:id/recette',
    component: RecetteComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'ajoutforum', 
  component: AjoutforumComponent
 }, 

  {
    path: 'sante',
    component: SanteComponent,
  },
  {
    path: 'poussin/:id',
    component: PoussinComponent,
  },
  {
    path: 'poussin/:id/detail',
    component: DetailComponent,
  },
  {
    path: 'poussin/:id/bilan',
    component: BilanComponent,
    children: [
      {
        path: 'detailbilan/:id',
        component: DetailbilanComponent
      }
    ]
  },
  // {
  //   path: 'detailbilan/:id',
  //   component: DetailbilanComponent
  // },
  
  {
    path: 'poussin/:id/rapport',
    component: RapportComponent,
  },

  {
    path: 'poussin/:id/vaccin:id/detailvaccin',
    component: DetailvaccinComponent,
  },
  {
    path: 'detailvitamine',
    component: DetailvitamineComponent,
  },
  {
    path: 'detailmort',
    component: DetailmortComponent
  },
  {
    path: 'detailalerte',
    component: DetailalerteComponent,
  },
  {
    path: 'poussin/:id/ajoutmort',
    component: AjoutmortComponent
  },
  {
    path: 'modifiermort',
    component: ModifiermortComponent,
  },
  {
    path: 'poussin/:id/ajoutvitamine',
    component: AjoutvitamineComponent,
  },
  {
    path: 'poussin/:id/modifiervitamine',
    component: ModifiervitamineComponent,
  },
  {
    path: 'detailaliment',
    component: DetailalimentComponent
  },
  {
    path: 'poussin/:id/ajoutaliment',
    component: AjoutalimenttComponent
  },
  {
    path: 'modifieraliment',
    component: ModifieralimenttComponent,
  },
  {
    path: 'poussin/:id/ajoutvaccin',
    component: AjoutvaccinComponent,
  },
  {
    path: 'modifiervaccin',
    component: ModifiervaccinComponent,
  },
  {
    path: 'poussin/:id/aliment',
    component: AlimentComponent,
  },
  {
    path: 'poussin/:id/stock',
    component: StockComponent,
  },
  {
    path: 'poussin/:id/vitamine',
    component: VitamineComponent,
  },
  {
    path: 'poussin/:id/mort',
    component: MortComponent,
  },
  {
    path: 'forum',
    component: ForumComponent,
  },
  
  {
    path: 'croissance',
    component: CroissanceComponent,
  },
  {
    path: 'finition',
    component: FinitionComponent,
  },
  {
    path: 'modifiertachebilantache',
    component: ModifiertachebilantacheComponent
  },
  {
    path: 'ajouttachebilan',
    component: AjouttachebilanComponent,
  },
  {
    path: 'calendrier',
    component: CalendrierComponent,
  },
  {
    path: 'poussin/:id/ajoutbilan',
    component: AjoutbilanComponent,
  },
  {
    path: 'ajoutentree',
    component: AjoutentreeComponent,
  },
  {
    path: 'modifiertachebilan',
    component: ModifiertachebilanComponent,
  },
  {
    path: 'detailtache',
    component: DetailtacheComponent,
  },
  {
    path: 'modifierentree/:id',
    component: ModifierentreeComponent,
  },
  {
    path: 'alerte',
    component: AlerteComponent,
  },
  {
    path: 'demarrage',
    component: DemarrageComponent,
  },
  {
    path: 'guide',
    component: GuideComponent,
  },
  {
    path: 'poussin/:id/vaccin',
    component: VaccinComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
