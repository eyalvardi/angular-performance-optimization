import { Component, ElementRef, NgZone, ChangeDetectorRef, ViewChild, Renderer2, OnDestroy, OnInit } from "@angular/core";

import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

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

    @ViewChild('box',{read:ElementRef})
    boxElemRef:ElementRef;

    constructor(
        protected render:Renderer2,
        protected zone:NgZone,
        protected cd: ChangeDetectorRef
    ){
       /* zone.runOutsideAngular(()=>{
            let pipe$ = this.ticks$
                .do( t => this.updateBackgroundColor() )
                .takeUntil( Observable.timer(1000) )
                .count()
                .do( (val:number) =>{
                    this.value = val;
                    this.cd.detectChanges();
                });

            let next = (v) =>{
                this.sub.unsubscribe();
                pipe$.subscribe(next)
            };
            this.sub = pipe$.subscribe(next);
        });*/


        zone.runOutsideAngular(()=>{
            let pipe$ = this.ticks$
                .do( t => this.updateBackgroundColor() )
                .bufferTime(1000)
				.map((val:number[])=> val.length)
				.do(legth => this.value = legth);


            this.sub = pipe$.subscribe(() =>{                
                this.cd.detectChanges();
            });
        });
    }


    // tick
    ngDoCheck(){
        //this.countTick();
        this.ticks$.next(1);
        //this.updateBackgroundColor();
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
