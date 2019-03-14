import { IReactiveClassModel } from "./IReactiveClassModel";
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';


export class ReactiveClassModel extends IReactiveClassModel {
    
    public get NotificationSubject()
    {
        return this.subject;
    }

    public set NotificationSubject(value:Subject<string>)
    {
        this.subject=value;;
    }

    WhenPropertyChanged<T>(property: (o: this) => T): Observable<T> {
        return this.subject.pipe(filter((x) => {
            let prop = property.arguments[0];
            return x === prop;
        }), map((x => {
            return this[x] as T;
        })));
    }

    WhenPropertyChanges<T>(): Observable<this> {
        return this.subject.pipe(map((x => {
            return this;
        })));
    }

    /**
     *
     */
    constructor() {
        super();
        this.subject=new Subject<string>();
    }
    subject: Subject<string>;
}

