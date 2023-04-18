import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractOverviewComponent } from './contract/contract-overview/contract-overview.component';

const routes: Routes = [{
  path: '',
  component: ContractOverviewComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
