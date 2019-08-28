import { BehaviorSubject, Observable } from "rxjs";
// import { equal } from "assert";
// import { forEach } from "@angular/router/src/utils/collection";

export interface IEnumarator<TModel=any>
{
    [Index: number]: TModel;
}

export class ObservableCollection<TModel=any> {

    [Symbol.iterator]() {
        return this;
    }

    next() {
        this.pointer++;

        if (this.pointer <= this.collections.length-1)
            return this.collections[this.pointer];
        return {done: true};
    }

    private pointer = 0;

    // next(value?: any): IteratorResult<TModel> {
    //     throw new Error("Method not implemented.");
    // }
    // return?(value?: any): IteratorResult<TModel> {
    //     throw new Error("Method not implemented.");
    // }
    // throw?(e?: any): IteratorResult<TModel> {
    //     throw new Error("Method not implemented.");
    // }
    
    private collections: TModel[];//the data that will be emit
    private collectionsSubject: BehaviorSubject<TModel[]>;//The subject to emit data
    //collections$: Observable<TModel[]>;//The public observable that other components will subscribe to

    constructor() {
        this.collections = [];
        this.collectionsSubject = new BehaviorSubject<TModel[]>(this.collections);

        //this.collections$ = this.collectionsSubject.asObservable();
    }

    Add(model: TModel) {
        this.collections.push(model);
        //Here we will renew the reference and passing it to others component using spread operator
        this.collectionsSubject.next([...this.collections]);
    }

    Remove(model: TModel, sendNotification: boolean = true) {
        let index = this.collections.findIndex(x => { return x === model; })
        if (index >= 0) {
            this.collections.splice(index, 1);
            //Here we will renew the reference and passing it to others component using spread operator
            if (sendNotification) {
                this.collectionsSubject.next([...this.collections]);
            }
        }
    }

    RemoveAll() {
        this.collections = [];
        this.collectionsSubject.next([...this.collections]);
        //Here we will renew the reference and passing it to others component using spread operator
        this.collectionsSubject.next([...this.collections]);
    }

    ReplaceAll(models: TModel[]) {
        this.collections = [];
        this.collections = models;
        //Here we will renew the reference and passing it to others component using spread operator
        this.collectionsSubject.next([...this.collections]);
    }

    WhenCollectionChanged(): Observable<TModel[]> {
        return this.collectionsSubject.asObservable();
    }

    Items():TModel[]
    {
        return this.collections;
    }
}