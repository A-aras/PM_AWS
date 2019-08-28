//import { BaseModel } from "../basemodel/BaseModel";
import { PropertyRule } from "./PropertyRule";
import { IPropertyRule } from "./IPropertyRule";
import { IEnumeration } from "./IEnumeration";

export interface  IClassRule<TModel>
{
     Properties: PropertyRule[];
    //abstract ApplyTo(model: TModel);
     AddProperty<TProperty=any>(propertyFunc: (model: TModel) => TProperty): IPropertyRule<TProperty,TModel>;

     AddEnumaration(name:string): IEnumeration;
}
