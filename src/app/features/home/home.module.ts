import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {HomeComponent} from "./home.component";
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    SharedModule,
    LeafletModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
