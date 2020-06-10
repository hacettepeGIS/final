import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {HomeComponent} from "./home.component";
import { SharedModule } from '@app/shared/shared.module';
import { LSelect2Module } from 'ngx-select2';

@NgModule({
  imports: [
    CommonModule,
    homeRouting,
    SharedModule,
    LeafletModule,
    LSelect2Module
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
