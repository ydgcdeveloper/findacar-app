import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultFoundComponent } from './no-result-found.component';

@NgModule({
    declarations: [NoResultComponentModule.rootComponent],
    imports: [
        CommonModule,        
    ],
    exports: [NoResultComponentModule.rootComponent],
    entryComponents: [NoResultComponentModule.rootComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NoResultComponentModule {
    static rootComponent = NoResultFoundComponent
}