import { IPropertyRule } from "./IPropertyRule"

export class PropertyRule<TProperty=any, TModel=any> extends IPropertyRule<TProperty, TModel>
{
    get MandatoryFunc(): ((model: TModel) => boolean)
    {
        return this.mandatoryFunc;
    }

    get PropertyValueFunc(): ((model: TModel) => TProperty)
    {
        return this.propertyValueFunc;
    }

    get EnabledFunc(): ((model: TModel) => boolean)
    {
        return this.enabledFunc;
    }
    Name: string;    
    FullLabel: string;
    Label: string;
    
    Default: TProperty;
    private _enabledFunc: (model: TModel) => boolean;
    public get enabledFunc(): (model: TModel) => boolean {
        return this._enabledFunc;
    }
    public set enabledFunc(value: (model: TModel) => boolean) {
        this._enabledFunc = value;
    }
    private _mandatoryFunc: (model: TModel) => boolean;
    public get mandatoryFunc(): (model: TModel) => boolean {
        return this._mandatoryFunc;
    }
    public set mandatoryFunc(value: (model: TModel) => boolean) {
        this._mandatoryFunc = value;
    }
    private _propertyValueFunc: (model: TModel) => TProperty;
    public get propertyValueFunc(): (model: TModel) => TProperty {
        return this._propertyValueFunc;
    }
    public set propertyValueFunc(value: (model: TModel) => TProperty) {
        this._propertyValueFunc = value;
    }

    EnabledWhen(enabledFunc: (model: TModel) => boolean):this
    {
        this.enabledFunc=enabledFunc;
        return this;
    }

    MandatoryWhen(mandatoryFunc: (model: TModel) => boolean):this
    {
        this.mandatoryFunc=mandatoryFunc;
        return this;
    }

    WithLabel(label:string):this
    {
        this.Label=label;
        this.FullLabel=label;
        return this;
    }
}