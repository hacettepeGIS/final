import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SmartadminLayoutModule } from "./layout";

import { UserModule } from "./user/user.module";

import {SmartadminWidgetsModule} from "./widgets/smartadmin-widgets.module";

import {UtilsModule} from "./utils/utils.module";
import {PipesModule} from "./pipes/pipes.module";
import {SmartadminFormsLiteModule} from "./forms/smartadmin-forms-lite.module";
import {SmartProgressbarModule} from "./ui/smart-progressbar/smart-progressbar.module";
import { CalendarComponentsModule } from "@app/shared/calendar/calendar-components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    SmartadminLayoutModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,

    UserModule,
    SmartadminLayoutModule,
    UtilsModule,
    PipesModule,

    SmartadminFormsLiteModule,

    SmartProgressbarModule,

    SmartadminWidgetsModule,

    CalendarComponentsModule,
  ]
})
export class SharedModule {}
