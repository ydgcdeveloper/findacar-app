import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { ServiceSkeletonComponent } from '../service-skeleton/service-skeleton.component';

@NgModule({
    declarations: [ServiceComponentModule.rootComponent, ServiceSkeletonComponent],
    imports: [
        CommonModule,        
    ],
    exports: [ServiceComponentModule.rootComponent],
    entryComponents: [ServiceComponentModule.rootComponent],
})
export class ServiceComponentModule {
    static rootComponent = ServiceComponent
}