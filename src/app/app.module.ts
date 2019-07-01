import {NgModule}       from "@angular/core";
import {BrowserModule}  from "@angular/platform-browser";
import {RouterModule}   from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import {appRoutes}      from "./app.routes";
import {AppComponent}   from "./app.component";
import {DemosModule}    from './demos/demos.module';


@NgModule({
    declarations:[
        AppComponent,
    ],
    bootstrap   :[AppComponent],
    imports     :[
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes,{useHash: true}),
        //InMemoryWebApiModule.forRoot(InMemoryDataService),

        DemosModule
    ],
    providers   :[
        //UpdateService
        /*,{provide: ApplicationRef, useClass: ApplicationRefDebugMode}*/
        ]
})
export class AppModule{
    /* constructor(private appRef:ApplicationRef){
        let tick = appRef.tick;
        appRef.tick = function () {
            console.time(`application ticks`);
            tick.apply(appRef,arguments);
            console.timeEnd(`application ticks`);
        }
    }*/
}
