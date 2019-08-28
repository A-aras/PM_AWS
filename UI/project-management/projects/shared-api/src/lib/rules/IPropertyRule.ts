import { IEnumeration } from "./IEnumeration";


export interface IPropertyRule<TProperty=any, TModel=any,TEnumeration=any,TIdentifier=any>
{
      Name: string;
     FullLabel: string;
     Label: string;
     Default: TProperty;

     EnabledFunc:(model: TModel)=>boolean;
    //abstract enabledFunc:(model: TModel)=>boolean;

     MandatoryFunc:(model: TModel)=>boolean;

    //abstract mandatoryFunc:(model: TModel)=>boolean;

     PropertyValueFunc:(model: TModel)=>TProperty;

    //abstract propertyValueFunc:(model: TModel) => TProperty;

     Enumaration:IEnumeration<TEnumeration,TIdentifier>;

     min:TProperty|null;

     max:TProperty|null;

}