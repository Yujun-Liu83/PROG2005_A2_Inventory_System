import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { InventoryComponent } from './inventory/inventory';
import { SearchComponent } from './search/search';
import { PrivacyComponent } from './privacy/privacy';
import { HelpComponent } from './help/help';
import { PopularItemsComponent } from './popular-items/popular-items';

// Application route definitions
export const routes: Routes = [
  { path: '', component: HomeComponent },                    // Default/home route
  { path: 'inventory', component: InventoryComponent },      // Inventory management page
  { path: 'search', component: SearchComponent },            // Search/filter items page
  { path: 'popular', component: PopularItemsComponent },     // Popular items showcase
  { path: 'privacy', component: PrivacyComponent },          // Privacy policy page
  { path: 'help', component: HelpComponent },                // Help/FAQ page
  { path: '**', redirectTo: '' }                             // Wildcard route - redirects unknown paths to home
];