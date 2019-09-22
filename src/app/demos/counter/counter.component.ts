import {Component,Input} from '@angular/core';
import {BaseComponent} from "../base.component";

@Component({
    selector    : 'counter',
    template : `
    <div (click)="onClick()">{{value}}</div>
`})
export class CounterComponent extends BaseComponent{

    _isRun:boolean;
    runFnBind:()=>void;
    _isDetectChanges:boolean;
    _id:any;

    @Input() set isStart(value){
        value ? this.start() : this.stop();
    }
    @Input() set isDetectChanges(value){
        this._isDetectChanges = value;
    }

    _value:number;
    @Input()
    set value(value){
        this._value = value;
    }
    get value(){return this._value;}

    _ms:number;
    @Input()
    set ms(value){ this._ms = value; }
    get ms(){return this._ms;}

    _isTick:boolean;
    @Input()
    set isTick(value){
        this._isTick = value;
        this.start();
    }
    get isTick(){return this._isTick;}

    start(){
        //console.time('counter');
        this.runFnBind = this.run.bind(this);
        this.stop();
        this._isRun = true;
        this.isTick ? this.run()
                    : this.zone.runOutsideAngular(this.runFnBind);
    }
    run(){
        this._value++;
        if( this._value > 100) {
            //console.timeEnd('counter');
            this._value = 0;
            //console.time('counter');
        }
        if(this._isDetectChanges) {
            this.cd.detectChanges();
        }
        if(this._isRun){
           this._id = setTimeout(this.runFnBind);
        }
    }

    onClick(){
        this.value = 0;
        this._isRun = !this._isRun;
        if(this._isRun){
            this.start();
        }
    }

    stop(){
        this.value = 0;
        this._isRun = false;
        if(this._id){
            clearTimeout(this._id);
        }
    }
    ngOnDestroy(){
        this.stop();
    }
}
