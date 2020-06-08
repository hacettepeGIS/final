import { StorageService } from "./storage.service";
import { JsonApiService } from "./json-api.service";
import { UserService } from "./user.service";
import { NotificationService } from "./notification.service";
import { BodyService } from "./body.service";
import { LayoutService } from "./layout.service";
import { ActivityTypesService } from "./activity-types.service";
import { ActivityService } from "./activity.service";

export const services = [
  StorageService,
  JsonApiService,
  UserService,
  NotificationService,
  BodyService,
  LayoutService,
  ActivityTypesService,
  ActivityService
];

export * from "./storage.service";
export * from "./json-api.service";
export * from "./user.service";
export * from "./notification.service";
export * from "./body.service";
export * from "./layout.service";
export * from "./activity-types.service";
export * from "./activity.service";