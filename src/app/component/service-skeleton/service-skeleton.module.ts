import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceSkeletonComponent } from './service-skeleton.component';

@NgModule({
    declarations: [ServiceSkeletonComponentModule.rootComponent],
    imports: [
        CommonModule,
    ],
    exports: [ServiceSkeletonComponentModule.rootComponent],
    entryComponents: [ServiceSkeletonComponentModule.rootComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ServiceSkeletonComponentModule {
    static rootComponent = ServiceSkeletonComponent;
}
