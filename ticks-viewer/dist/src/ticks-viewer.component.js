"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
var TicksViewerComponent = (function () {
    function TicksViewerComponent(render, zone, cd) {
        var _this = this;
        this.render = render;
        this.zone = zone;
        this.cd = cd;
        this.value = 0;
        this.ticks$ = new Subject_1.Subject();
        zone.runOutsideAngular(function () {
            var pipe$ = _this.ticks$
                .do(function (t) { return _this.updateBackgroundColor(); })
                .takeUntil(Observable_1.Observable.timer(1000))
                .count()
                .do(function (val) {
                _this.value = val;
                _this.cd.detectChanges();
            });
            var next = function (v) {
                _this.sub.unsubscribe();
                pipe$.subscribe(next);
            };
            _this.sub = pipe$.subscribe(next);
        });
    }
    // tick
    TicksViewerComponent.prototype.ngDoCheck = function () {
        //this.countTick();
        this.ticks$.next(1);
        //this.updateBackgroundColor();
    };
    TicksViewerComponent.prototype.updateBackgroundColor = function () {
        this.render.setStyle(this.boxElemRef.nativeElement, 'background-color', 'red');
        this.clearBackgroundColor();
    };
    TicksViewerComponent.prototype.clearBackgroundColor = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                _this.render.setStyle(_this.boxElemRef.nativeElement, 'background-color', 'white');
            }, 75);
        });
    };
    TicksViewerComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return TicksViewerComponent;
}());
__decorate([
    core_1.ViewChild('box', { read: core_1.ElementRef }),
    __metadata("design:type", core_1.ElementRef)
], TicksViewerComponent.prototype, "boxElemRef", void 0);
TicksViewerComponent = __decorate([
    core_1.Component({
        selector: 'ticks-viewer',
        styles: ["\n        .box{ \n            width : 10px;\n            height: 12px;\n            border: 1px solid black;\n            margin-right: 3px;\n        }\n        :host{\n            display: block;\n            position: absolute;\n            top: 8px;\n            right: 8px;\n            line-height:0px;\n        }\n        .notDisplay{\n            border: 1px solid black;    \n        }\n        .title{\n            font-family: arial;\n            font-size: 12px;\n        }\n    "],
        template: "\n   <div style=\" margin: auto;\">\n        <button #box class=\"box\"></button>\n        <span class=\"title\">Ticks: {{value}} / s</span>\n   </div>\n"
    }),
    __metadata("design:paramtypes", [core_1.Renderer2,
        core_1.NgZone,
        core_1.ChangeDetectorRef])
], TicksViewerComponent);
exports.TicksViewerComponent = TicksViewerComponent;
//# sourceMappingURL=ticks-viewer.component.js.map