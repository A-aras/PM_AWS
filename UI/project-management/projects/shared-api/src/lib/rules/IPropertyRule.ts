
export abstract class IPropertyRule<TProperty=any, TModel=any>
{
    abstract  Name: string;
    abstract FullLabel: string;
    abstract Label: string;
    abstract Default: TProperty;

    abstract get EnabledFunc():(model: TModel)=>boolean;
    //abstract enabledFunc:(model: TModel)=>boolean;

    abstract get MandatoryFunc():(model: TModel)=>boolean;

    //abstract mandatoryFunc:(model: TModel)=>boolean;

    abstract get PropertyValueFunc():(model: TModel)=>TProperty;

    //abstract propertyValueFunc:(model: TModel) => TProperty;

}