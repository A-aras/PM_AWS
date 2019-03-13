import { FormGroup } from "@angular/forms";
import { IReactiveClassModel } from "../../model/IReactiveClassModel";
import { ReactiveClassModel } from "../../model/ReactiveClassModel";

export abstract class IComponentPropetyViewModel <TModel extends IReactiveClassModel> extends ReactiveClassModel
{
    
    abstract get Model():TModel;

    abstract get formGroup():FormGroup;
}