import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { CalendarWidgetComponent } from "./calendar-widget/calendar-widget.component";
import { UtilsModule } from "@app/shared/utils/utils.module";
import { SmartadminWidgetsModule } from "@app/shared/widgets/smartadmin-widgets.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UtilsModule,
    SmartadminWidgetsModule,
    BsDropdownModule],

  declarations: [
    CalendarWidgetComponent,
  ],
  exports: [
    CalendarWidgetComponent
  ],
  providers: []
})
export class CalendarComponentsModule {}
