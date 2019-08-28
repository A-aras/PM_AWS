import { Observable, Subject } from 'rxjs';
import { IPropertyRule } from '../rules/IPropertyRule';

export interface  IReactiveClassModel {
    WhenPropertyChanged<T>(property: ((o: this) => T)): Observable<T>;
    WhenPropertyChanges<T>(): Observable<this>;
    Properties:IPropertyRule[];

    NotificationSubject:Subject<string>;
    //NotificationSubject(value:Subject<string>);

    NotifyPropertyChanged(property:string);
    

    GetPropertyRule(propertyName:string):IPropertyRule<any,this>;

    GetPropertyValue<TProperty=any>(propFunc:(IBaseModel)=>TProperty):TProperty;

    // GetPropertyRule(propertyName:string):IPropertyRule<any,this>
    // {
    //     if(this.Properties!=undefined)
    //     {
    //         var propMetaData=this.Properties.filter(x=>x.Name===propertyName);
    //         return  propMetaData[0] as unknown as IPropertyRule<any,this>;
    //     }
    //     return;
    // }

    // GetPropertyValue<TProperty=any>(propFunc:(IBaseModel)=>TProperty):TProperty
    // {
    //     return propFunc(this);
    // }
}