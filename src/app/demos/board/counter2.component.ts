import { Component, Input} from '@angular/core';
import {BaseComponent} from "../base.component";


@Component({
    selector    : 'counter2',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    template : `
    <div>{{value}}</div>
`})
export class Counter2Component extends BaseComponent{

    @Input()
    value:number = 0;

    ngDoCheck(){
        super.ngDoCheck();
        this.value = (this.value + 1) % 100;
    }
}
