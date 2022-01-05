import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultFoundComponent } from './no-result-found.component';

@NgModule({
    declarations: [NoResultComponentModule.rootComponent],
    imports: [
        CommonModule,        
    ],
    exports: [NoResultComponentModule.rootComponent],
    entryComponents: [NoResultComponentModule.rootComponent],
})
export class NoResultComponentModule {
    static rootComponent = NoResultFoundComponent
}