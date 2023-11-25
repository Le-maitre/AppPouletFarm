import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { EntreeComponent } from '../entree/entree.component';
import { HomeComponent } from '../home/home.component';
import { PoussinComponent } from '../poussin/poussin.component';
import { DetailComponent } from '../detail/detail.component';
import { BilanComponent } from '../bilan/bilan.component';
import { GestionComponent } from '../gestion/gestion.component';
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
import { AjoutvitamineComponent } from '../ajoutvitamine/ajoutvitamine.component';
import { DetailvitamineComponent } from '../detailvitamine/detailvitamine.component';
import { ModifiervitamineComponent } from '../modifiervitamine/modifiervitamine.component';
import { DetailmortComponent } from '../detailmort/detailmort.component';
import { AjoutmortComponent } from '../ajoutmort/ajoutmort.component';
import { ModifiermortComponent } from '../modifiermort/modifiermort.component';
import { AlerteComponent } from '../alerte/alerte.component';
import { DetailalerteComponent } from '../detailalerte/detailalerte.component';
import { GuideComponent } from '../guide/guide.component';
import { DemarrageComponent } from '../demarrage/demarrage.component';
import { CalendrierComponent } from '../calendrier/calendrier.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ForumComponent } from '../forum/forum.component';
import { RapportComponent } from '../rapport/rapport.component';
import { CalendarModule, DateAdapter } from 'angular-calendar'; // Importez le module
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'; // Adapter import
import { CroissanceComponent } from '../croissance/croissance.component';
import { FinitionComponent } from '../finition/finition.component';
import { SanteComponent } from '../sante/sante.component';
import { AjoutforumComponent } from '../ajoutforum/ajoutforum.component';


@NgModule({
  imports: [
    NgCalendarModule,
    IonicModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page,HomeComponent,PoussinComponent,DetailComponent,BilanComponent,GestionComponent,DetailbilanComponent,
  DetailtacheComponent,ModifierentreeComponent,AjoutentreeComponent,ModifiertachebilanComponent,VaccinComponent,DetailvaccinComponent,AjoutvaccinComponent,ModifiervaccinComponent,AlimentComponent,StockComponent,VitamineComponent,MortComponent,
AjoutbilanComponent,AjouttachebilanComponent,ModifiertachebilantacheComponent,DetailalimentComponent,AjoutalimenttComponent,ModifieralimenttComponent,AjoutvitamineComponent,DetailvitamineComponent,ModifiervitamineComponent,
DetailmortComponent,AjoutmortComponent,ModifiermortComponent,AlerteComponent,DetailalerteComponent,GuideComponent,DemarrageComponent, ForumComponent, RapportComponent, CalendrierComponent, CroissanceComponent, FinitionComponent, SanteComponent, AjoutforumComponent
]
})
export class Tab1PageModule {}
