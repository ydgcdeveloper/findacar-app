import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharePageRoutingModule } from './share-routing.module';

import { SharePage } from './share.page';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharePageRoutingModule,
    TranslateModule
  ],
  declarations: [SharePage],
  providers: [Clipboard, SocialSharing]
})
export class SharePageModule {}
