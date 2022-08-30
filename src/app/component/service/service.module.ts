import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';

@NgModule({
    declarations: [ServiceComponentModule.rootComponent],
    imports: [
        CommonModule,
    ],
    exports: [ServiceComponentModule.rootComponent],
    entryComponents: [ServiceComponentModule.rootComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ServiceComponentModule {
    static rootComponent = ServiceComponent;
}
