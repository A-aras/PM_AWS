//import { BaseModel } from "../basemodel/BaseModel";
import { PropertyRule } from "./PropertyRule";
import { IPropertyRule } from "./IPropertyRule";

export abstract class IClassRule<TModel>
{
    abstract Properties: PropertyRule[];
    //abstract ApplyTo(model: TModel);
    abstract AddProperty<TProperty=any>(propertyFunc: (model: TModel) => TProperty): IPropertyRule<TProperty,TModel>;
}
