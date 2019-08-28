import { IEnumeration } from "./IEnumeration";
import { MemoizedSelector } from "@ngrx/store";

export class Enumeration<TEnumarationModel=any,TIndentifier=any> implements IEnumeration<TEnumarationModel,TIndentifier>
{
    Name: string;
    
    private displayValueFunction:(model: TEnumarationModel)=>string;
    private valuePathFunction:(model: TEnumarationModel)=>TIndentifier;
    private selector:MemoizedSelector<any,any>;
    private filterFunction:(TEnumarationModel)=>boolean;

    get DisplayValue()
    {
        return this.displayValueFunction;
    }
    get ValuePath()
    {
        return this.valuePathFunction;
    }

    get Selector()
    {
        return this.selector;
    }

    get Filter(){
        return this.filterFunction;
    }

    WithDisplayPath(displayFunc:(model: TEnumarationModel)=>string):this
    {
        this.displayValueFunction=displayFunc;
        return this;
    }

    WithValuePath(valueFunc:(model: TEnumarationModel)=>TIndentifier):this
    {
        this.valuePathFunction=valueFunc;
        return this;
    }

    WithSelector(selector:MemoizedSelector<any,any>):this
    {
        this.selector=selector;
        return this;
    }


    WithFilter(filterFunction:(TEnumarationModel)=>boolean):this
    {
        this.filterFunction=filterFunction;
        return this;
    }

}