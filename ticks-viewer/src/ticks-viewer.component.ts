import { Component, ElementRef, NgZone, ChangeDetectorRef, ViewChild, Renderer2, OnDestroy, OnInit } from "@angular/core";
import {bufferTime, map, tap} from "rxjs/operators";
import {Subject, Subscription} from "rxjs";

@Component({
    selector: 'ticks-viewer',
    styles: [`
        .box{
            width : 10px;
            height: 12px;
            border: 1px solid black;
            margin-right: 3px;
        }
        :host{
            display: block;
            position: absolute;
            top: 8px;
            right: 8px;
            line-height:0px;
        }
        .notDisplay{
            border: 1px solid black;
        }
        .title{
            font-family: arial;
            font-size: 12px;
        }
    `],
    template: `
   <div style=" margin: auto;">
        <button #box class="box"></button>
        <span class="title">Ticks: {{value}} / s</span>
   </div>
`})
export class TicksViewerComponent implements OnDestroy{

    value: number = 0;
    sub :Subscription;
    ticks$ = new Subject<number>();

    @ViewChild('box',{ read:ElementRef , static : true })
    boxElemRef:ElementRef;

    constructor(
        protected render:Renderer2,
        protected zone:NgZone,
        protected cd: ChangeDetectorRef
    ){

        zone.runOutsideAngular(()=>{
            this.sub = this.ticks$
                .pipe(
                    tap       ( t => this.updateBackgroundColor() ),
                    bufferTime( 1000 ),
                    map       ( (val:number[])  => val.length ),
                    tap       ( (length:number) => { this.value = length } ),
                )
                .subscribe( () => {
                    this.cd.detectChanges();
                });
        });
    }


    // tick
    ngDoCheck(){
        this.ticks$.next(1);
    }

    updateBackgroundColor(){
        this.render.setStyle(
            this.boxElemRef.nativeElement,
            'background-color',
            'red'
        );

        this.clearBackgroundColor();
    }
    clearBackgroundColor(){
        this.zone.runOutsideAngular(()=>{
            setTimeout(()=>{
                this.render.setStyle(
                    this.boxElemRef.nativeElement,
                    'background-color',
                    'white'
                );
            },75)
        });
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}
