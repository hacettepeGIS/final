import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import { ActivityComponent } from './activity.component';

export const activityRoutes: Routes = [
    {
        path: '',
        component: ActivityComponent,
        data: {
            pageTitle: 'Activity'
        }
    }
];

export const activityRouting:ModuleWithProviders = RouterModule.forChild(activityRoutes);

