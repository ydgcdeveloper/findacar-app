import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';

@NgModule({
    declarations: [CategoryComponentModule.rootComponent],
    imports: [
        CommonModule,        
    ],
    exports: [CategoryComponentModule.rootComponent],
    entryComponents: [CategoryComponentModule.rootComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryComponentModule {
    static rootComponent = CategoryComponent
}