import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { InventoryComponent } from './inventory/inventory';
import { SearchComponent } from './search/search';
import { PrivacyComponent } from './privacy/privacy';
import { HelpComponent } from './help/help';
import { PopularItemsComponent } from './popular-items/popular-items';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'popular', component: PopularItemsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];