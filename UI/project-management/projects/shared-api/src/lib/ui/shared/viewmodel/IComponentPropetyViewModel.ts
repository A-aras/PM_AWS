import { FormGroup } from "@angular/forms";
import { IReactiveClassModel } from "../../../model/IReactiveClassModel";
import { ReactiveClassModel } from "../../../model/ReactiveClassModel";
import { Injector } from "@angular/core";
import { Observable } from "rxjs";

export interface IComponentPropetyViewModel <TModel extends IReactiveClassModel> 
{
    
     Model:TModel;

     formGroup:FormGroup;

     Container:Injector;

     WhenModelChanged():Observable<TModel>;
    
}