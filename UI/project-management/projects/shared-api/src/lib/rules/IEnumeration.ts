import { MemoizedSelector } from "@ngrx/store";
import { EntityState } from "@ngrx/entity";

export interface IEnumeration<TEnumarationModel=any,TIndentifier=any>
{
      Name: string;
    // abstract FullLabel: string;
    // abstract Label: string;
    // abstract Default: TProperty;

     DisplayValue:(model: TEnumarationModel)=>string;
     ValuePath:(model: TEnumarationModel)=>TIndentifier;

     Selector:MemoizedSelector<EntityState<TEnumarationModel>,TEnumarationModel[]>;

     Filter:(TEnumarationModel)=>boolean;


}