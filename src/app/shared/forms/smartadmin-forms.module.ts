

import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {SmartadminValidationModule} from "./validation/smartadmin-validation.module";
import {DropzoneModule} from "./dropzone/dropzone.module";
import {SmartadminWizardsModule} from "./wizards/smartadmin-wizards.module";

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [
  ],
  exports: [

    SmartadminValidationModule,

    DropzoneModule,
    SmartadminWizardsModule,
  ]

})
export class SmartadminFormsModule{}
