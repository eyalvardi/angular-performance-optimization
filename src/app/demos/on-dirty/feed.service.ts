import {Subject} from "rxjs";

export class FeedService{
    private worker:any;
    //private observer:Observer<number>;
    private updateFn:any;

    public source:Subject<number> = new Subject();

    constructor(){
        //this.source = Observable.create((observer)=>{ this.observer = observer; }).share();
        this.updateFn = this.update.bind(this);
    }

    start(){
        // create producer
        this.worker = new Worker('assets/js/num-feeds.service.js');
        this.worker.addEventListener('message',this.updateFn);
        this.worker.postMessage(true);
    }
    update(e){
        this.source.next(e.data);
    }
    stop(){
        this.worker.postMessage(false);
        this.worker.removeEventListener(this.updateFn);
        this.worker.terminate();
        this.source.complete();
    }
}

export const feed = new FeedService();
