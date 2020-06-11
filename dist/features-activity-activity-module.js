(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-activity-activity-module"],{

/***/ "./src/app/features/activity/activity.component.html":
/*!***********************************************************!*\
  !*** ./src/app/features/activity/activity.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"content\" class=\"no-padding\">\n    <div style=\"height: 90vh;\"\n        #leaflet\n        leaflet \n        [leafletOptions]=\"options\" \n        [leafletLayersControl]=\"layersControl\"\n        [leafletLayers]=\"layers\">\n    </div>\n\n    <div style=\"position: absolute;left: 50px;top: 10px;z-index: 999;\">\n        <div class=\"btn-group\">\n            <select class=\"btn-group\" dropdown=\"\" style=\"height: 32px;\" (change)=\"showEvents()\"\n                    [(ngModel)]=\"selectedActivity\"\n                    [style.display]=\"isActivitySelectVisible ? 'block' : 'none'\">\n                <option *ngFor=\"let activityType of activityTypes\" [ngValue]=\"activityType\">{{activityType.name}}</option>\n              </select>\n            <a class=\"btn btn-default\" placement=\"bottom\" (click)=\"start()\" [style.display]=\"isStartVisible ? 'block' : 'none'\"><strong><i\n                        class=\"fa fa-play fa-lg text-success\"></i></strong></a>\n            <a class=\"btn btn-default\" placement=\"bottom\" (click)=\"stop()\" [style.display]=\"isStopVisible ? 'block' : 'none'\"><strong><i\n                        class=\"fa fa-stop fa-lg text-danger\"></i></strong></a>\n            <a class=\"btn btn-success\" placement=\"bottom\" (click)=\"save()\" [style.display]=\"isSaveVisible ? 'block' : 'none'\"><strong><i\n                        class=\"fa fa-save fa-lg\"></i></strong></a>\n            <a class=\"btn btn-danger\" placement=\"bottom\" (click)=\"discard()\" [style.display]=\"isDiscardVisible ? 'block' : 'none'\"><strong><i\n                class=\"fa fa-trash-o fa-lg\"></i></strong></a>\n        </div>\n        <div class=\"text-info\"><strong>Total Distance {{(totalDistance/1000).toFixed(2)}} km</strong></div>\n        <div class=\"text-info\"><strong>Elapsed Time {{duration}}</strong></div>\n    </div> \n</div>"

/***/ }),

/***/ "./src/app/features/activity/activity.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/features/activity/activity.component.ts ***!
  \*********************************************************/
/*! exports provided: ActivityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityComponent", function() { return ActivityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @asymmetrik/ngx-leaflet */ "./node_modules/@asymmetrik/ngx-leaflet/dist/index.js");
/* harmony import */ var _app_core_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/core/services */ "./src/app/core/services/index.ts");
/* harmony import */ var leaflet_ant_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! leaflet-ant-path */ "./node_modules/leaflet-ant-path/dist/leaflet-ant-path.js");
/* harmony import */ var leaflet_ant_path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(leaflet_ant_path__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ActivityComponent = /** @class */ (function () {
    function ActivityComponent(resolver, inj, activityService, activityTypesService, notificationService) {
        var _this = this;
        this.resolver = resolver;
        this.inj = inj;
        this.activityService = activityService;
        this.activityTypesService = activityTypesService;
        this.notificationService = notificationService;
        this.totalDistance = 0.00000;
        this.duration = '00:00:00';
        this.options = {};
        this.activityTypes = [];
        this.selectedActivity = {};
        this.eventsData = [{
                lat: 39.920763,
                lng: 32.854061,
                time: null
            }];
        this.ip = "0.0.0.0";
        this.layersControl = {
            baseLayers: {
                'Open Street Map': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 30, attribution: '...' }),
                'Open Cycle Map': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
                'Transport': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
                'Landscape': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
                'Outdoors': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
                'Transport Dark': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
                'Spinal Map': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
                'Pioneer': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
                'Mobile Atlas': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
                'Neighbourhood': Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' })
            }
        };
        this.id = navigator.geolocation.watchPosition(function (position) {
            _this.eventsData.push({ lat: position.coords.latitude, lng: position.coords.longitude, time: new Date() });
            _this.options.center.lat = position.coords.latitude;
            _this.options.center.lng = position.coords.longitude;
            _this.leaflet.map.panTo(_this.options.center);
            if (_this.antPath) {
                _this.leaflet.map.removeLayer(_this.antPath);
                if (_this.isStopVisible == true)
                    _this.antPath._path.push([position.coords.latitude, position.coords.longitude]);
                _this.leaflet.map.addLayer(_this.antPath);
            }
            _this.showEvents();
        }, function (err) {
            if (err.code == 1) {
                alert("Error: Access is denied!");
            }
            else if (err.code == 2) {
                alert("Error: Position is unavailable!");
            }
        }, { timeout: 5000 });
        this.isStartVisible = true;
        this.isStopVisible = false;
        this.isSaveVisible = false;
        this.isDiscardVisible = false;
        this.isActivitySelectVisible = true;
    }
    ActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = {
            layers: [
                Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 30, attribution: '...' })
            ],
            zoom: 18,
            center: Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["latLng"])(39.920763, 32.854061),
        };
        this.activityTypesService.getTypes().subscribe(function (resp) {
            _this.activityTypes = resp;
            _this.selectedActivity = resp[0];
            _this.showEvents();
        }, function (err) {
            alert("Activity types could not fetch from api service. Error : " + err);
        });
        this.activityService.ip$.subscribe(function (resp) { return _this.ip = resp.ip; });
    };
    ActivityComponent.prototype.start = function () {
        this.duration = '00:00:00';
        this.totalDistance = 0;
        this.isActivitySelectVisible = false;
        this.isStartVisible = false;
        this.isStopVisible = true;
        this.antPath._path = [];
    };
    ActivityComponent.prototype.stop = function () {
        this.isStopVisible = false;
        this.isSaveVisible = true;
        this.isDiscardVisible = true;
        this.notificationService.smallBox({
            title: "FINISH!",
            content: "Current activity finished! Please save your activity.",
            color: "#296191",
            iconSmall: "fa fa-trophy fa-2x fadeInRight animated",
            timeout: 5000
        });
    };
    ActivityComponent.prototype.save = function () {
        var _this = this;
        var lastPoint = this.eventsData[this.eventsData.length - 1];
        var hour = lastPoint.time.getHours();
        var message = hour > 5 && hour < 11 ? "Morning " :
            hour >= 11 && hour < 15 ? "Lunch " :
                hour >= 15 && hour < 18 ? "Afternoon " :
                    hour >= 18 && hour < 22 ? "Evenning " : "Night ";
        message += this.selectedActivity["name"];
        var activity = this.antPath.toGeoJSON();
        this.notificationService.smartMessageBox({
            title: "Warning",
            content: "Would you like to give a name to your activity?",
            buttons: "[Accept]",
            input: "text",
            placeholder: "Enter your activity name",
            inputValue: message
        }, function (ButtonPress, Value) {
            activity.properties.name = Value;
            activity.properties.ip = _this.ip;
            activity.properties.activityTypeId = _this.selectedActivity["id"];
            activity.properties.duration = _this.calculateTotalDurationTime();
            activity.properties.distance = _this.totalDistance;
            _this.activityService.saveActivity(activity).subscribe(function () {
                _this.notificationService.smallBox({
                    title: "SAVED!",
                    content: "Activity has saved successfully!",
                    color: "#739E73",
                    iconSmall: "fa fa-save fa-2x fadeInRight animated",
                    timeout: 5000
                });
                _this.isSaveVisible = false;
                _this.isDiscardVisible = false;
                _this.isStartVisible = true;
                _this.isActivitySelectVisible = true;
                _this.antPath._path = [];
                _this.totalDistance = 0.00000;
                _this.duration = '00:00:00';
            }, function (err) { return _this.notificationService.smallBox({
                title: "ERROR!",
                content: err,
                color: "#C46A69",
                iconSmall: "fa fa-bell fa-2x fadeInRight animated",
                timeout: 5000
            }); });
        });
    };
    ActivityComponent.prototype.discard = function () {
        var _this = this;
        this.notificationService.smartMessageBox({
            title: "Warning",
            content: "Are you sure discarding your activity?",
            buttons: '[No][Yes]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Yes") {
                _this.isSaveVisible = false;
                _this.isDiscardVisible = false;
                _this.isStartVisible = true;
                _this.isActivitySelectVisible = true;
                _this.totalDistance = 0.00000;
                _this.duration = '00:00:00';
                _this.antPath._path = [];
                _this.notificationService.smallBox({
                    title: "Info",
                    content: "Activity removed successfully",
                    color: "#C46A69",
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            }
        });
    };
    ActivityComponent.prototype.showEvents = function () {
        var markers = [];
        var lastPoint = this.eventsData[this.eventsData.length - 1];
        markers.push(Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["marker"])([lastPoint.lat, lastPoint.lng], {
            icon: Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["icon"])({
                iconUrl: "assets/img/" + this.selectedActivity["id"] + ".png",
                iconSize: [32, 32]
            })
        }));
        this.layers = markers;
        if (this.isStopVisible == true) {
            this.calculateTotalDistance();
            var milliseconds = this.calculateTotalDurationTime();
            this.duration = this.activityService.convertMsToDateString(milliseconds);
        }
    };
    ActivityComponent.prototype.ngAfterViewInit = function () {
        this.antPath = Object(leaflet_ant_path__WEBPACK_IMPORTED_MODULE_4__["antPath"])([[]], { color: 'blue', weight: 5, reverse: false, }).addTo(this.leaflet.map);
    };
    ActivityComponent.prototype.ngDoCheck = function () {
        if (this.componentRef) {
            this.componentRef.changeDetectorRef.detectChanges();
        }
    };
    ActivityComponent.prototype.ngOnDestroy = function () {
        navigator.geolocation.clearWatch(this.id);
        if (this.componentRef) {
            this.subscription.unsubscribe();
            this.componentRef.destroy();
            this.componentRef = null;
        }
    };
    ActivityComponent.prototype.calculateTotalDistance = function () {
        var _this = this;
        // Calculating the distance of the polyline
        var tempLatLng = null;
        this.totalDistance = 0.00000;
        this.antPath._path.forEach(function (position) {
            var latlng = new leaflet__WEBPACK_IMPORTED_MODULE_1__["LatLng"](position[0], position[1]);
            if (tempLatLng == null) {
                tempLatLng = latlng;
                return;
            }
            _this.totalDistance += tempLatLng.distanceTo(latlng);
            tempLatLng = latlng;
        });
    };
    ActivityComponent.prototype.calculateTotalDurationTime = function () {
        var startPoint = this.eventsData.find(function (x) { return x.time > 0; });
        if (!startPoint)
            return 0;
        var lastPoint = this.eventsData[this.eventsData.length - 1];
        return lastPoint.time.getTime() - startPoint.time.getTime();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('leaflet', { read: _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_2__["LeafletDirective"] }),
        __metadata("design:type", _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_2__["LeafletDirective"])
    ], ActivityComponent.prototype, "leaflet", void 0);
    ActivityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'activity',
            template: __webpack_require__(/*! ./activity.component.html */ "./src/app/features/activity/activity.component.html")
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            _app_core_services__WEBPACK_IMPORTED_MODULE_3__["ActivityService"],
            _app_core_services__WEBPACK_IMPORTED_MODULE_3__["ActivityTypesService"],
            _app_core_services__WEBPACK_IMPORTED_MODULE_3__["NotificationService"]])
    ], ActivityComponent);
    return ActivityComponent;
}());



/***/ }),

/***/ "./src/app/features/activity/activity.module.ts":
/*!******************************************************!*\
  !*** ./src/app/features/activity/activity.module.ts ***!
  \******************************************************/
/*! exports provided: ActivityModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityModule", function() { return ActivityModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @asymmetrik/ngx-leaflet */ "./node_modules/@asymmetrik/ngx-leaflet/dist/index.js");
/* harmony import */ var _activity_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./activity.component */ "./src/app/features/activity/activity.component.ts");
/* harmony import */ var _app_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @app/shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _activity_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./activity.routing */ "./src/app/features/activity/activity.routing.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ActivityModule = /** @class */ (function () {
    function ActivityModule() {
    }
    ActivityModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _activity_routing__WEBPACK_IMPORTED_MODULE_5__["activityRouting"],
                _app_shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _asymmetrik_ngx_leaflet__WEBPACK_IMPORTED_MODULE_2__["LeafletModule"]
            ],
            declarations: [_activity_component__WEBPACK_IMPORTED_MODULE_3__["ActivityComponent"]]
        })
    ], ActivityModule);
    return ActivityModule;
}());



/***/ }),

/***/ "./src/app/features/activity/activity.routing.ts":
/*!*******************************************************!*\
  !*** ./src/app/features/activity/activity.routing.ts ***!
  \*******************************************************/
/*! exports provided: activityRoutes, activityRouting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activityRoutes", function() { return activityRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activityRouting", function() { return activityRouting; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _activity_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./activity.component */ "./src/app/features/activity/activity.component.ts");


var activityRoutes = [
    {
        path: '',
        component: _activity_component__WEBPACK_IMPORTED_MODULE_1__["ActivityComponent"],
        data: {
            pageTitle: 'Activity'
        }
    }
];
var activityRouting = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(activityRoutes);


/***/ })

}]);
//# sourceMappingURL=features-activity-activity-module.js.map