import { Subject } from 'rxjs';
import { IReactiveClassModel } from '../model/IReactiveClassModel';



export function ReactiveProperty<TModel extends IReactiveClassModel>(target: TModel , key: string)
{
    var val=target[key];

    let reactiveSubject=target['subject'] as Subject<string>;

    var getter=function(){
        return val;
    };

    var setter=function(newval){
        val=newval;
        if(target.NotificationSubject!=undefined)
        {
            target.NotificationSubject.next(key);
        }
        else
        {
            target.NotificationSubject=new Subject<string>(); 
            target.NotificationSubject.next(key);
        }
    };

   Object.defineProperty(target,key,{
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })
}