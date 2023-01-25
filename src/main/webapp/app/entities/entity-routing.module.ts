import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pregled',
        data: { pageTitle: 'pacijentApp.pregled.home.title' },
        loadChildren: () => import('./pregled/pregled.module').then(m => m.PregledModule),
      },
      {
        path: 'ustanove',
        data: { pageTitle: 'pacijentApp.ustanove.home.title' },
        loadChildren: () => import('./ustanove/ustanove.module').then(m => m.UstanoveModule),
      },
      {
        path: 'pacijent',
        data: { pageTitle: 'pacijentApp.pacijent.home.title' },
        loadChildren: () => import('./pacijent/pacijent.module').then(m => m.PacijentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
