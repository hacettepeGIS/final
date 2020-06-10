import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldFilterPipe } from './field-filter.pipe';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FieldFilterPipe],
  exports: [FieldFilterPipe]
})
export class PipesModule { }
