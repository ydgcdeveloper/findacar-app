import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./profile/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./profile/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./profile/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'payment-methods',
    loadChildren: () => import('./profile/payment-methods/payment-methods.module').then( m => m.PaymentMethodsPageModule)
  },
  {
    path: 'addresses',
    loadChildren: () => import('./profile/addresses/addresses.module').then( m => m.AddressesPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./profile/help/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./profile/help/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./profile/help/policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./home/filters/filters.module').then( m => m.FiltersPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./profile/addresses/add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'add-address/:id',
    loadChildren: () => import('./profile/addresses/add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
  {
    path: 'search-location',
    loadChildren: () => import('./search-location/search-location.module').then( m => m.SearchLocationPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
  },
  {
    path: 'map',
    loadChildren: () => import('./profile/addresses/add-address/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'rate/:id',
    loadChildren: () => import('./order/rate/rate.module').then( m => m.RatePageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./home/request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./settings/language/language.module').then( m => m.LanguagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
