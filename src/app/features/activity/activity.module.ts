import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {ActivityComponent} from "./activity.component";
import { SharedModule } from '@app/shared/shared.module';
import { activityRouting } from './activity.routing';

@NgModule({
  imports: [
    CommonModule,
    activityRouting,
    SharedModule,
    LeafletModule
  ],
  declarations: [ActivityComponent]
})
export class ActivityModule { }
