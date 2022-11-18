import { GraphQLModule } from './graphql.module';
import { LANGUAGE } from './services/language/language.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
// import { Device } from '@awesome-cordova-plugins/device/ngx';
// import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';


export const newTranslateLoader = (handler: HttpBackend) => {
  const http = new HttpClient(handler);
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    TranslateModule.forRoot({
      defaultLanguage: LANGUAGE(),
      loader: {
        provide: TranslateLoader,
        useFactory: newTranslateLoader,
        deps: [HttpBackend]
      }
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geolocation, NativeGeocoder],
  bootstrap: [AppComponent],

})
export class AppModule { }
