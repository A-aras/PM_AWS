import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { IPropertyRule } from '../rules/IPropertyRule';

export abstract class IReactiveClassModel {
    abstract WhenPropertyChanged<T>(property: ((o: this) => T)): Observable<T>;
    Properties:IPropertyRule[];

    public abstract get NotificationSubject():Subject<string>;
    public abstract set NotificationSubject(value:Subject<string>);

    GetPropertyRule(propertyName:string):IPropertyRule<any,this>
    {
        if(this.Properties!=undefined)
        {
            var propMetaData=this.Properties.filter(x=>x.Name===propertyName);
            return  propMetaData[0] as unknown as IPropertyRule<any,this>;
        }
        return;
    }

    GetPropertyValue<TProperty=any>(propFunc:(IBaseModel)=>TProperty):TProperty
    {
        return propFunc(this);
    }
}