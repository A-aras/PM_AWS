import { IPropertyRule } from "./IPropertyRule";
import { IEnumeration } from "./IEnumeration";
import { Enumeration } from "./Enumeration";

export class PropertyRule<
  TProperty = any,
  TModel = any,
  TEnumeration = any,
  TIdentifier = any
> implements IPropertyRule<TProperty, TModel, TEnumeration, TIdentifier> {
  min: TProperty|null;
  max: TProperty|null;

  Name: string;
  FullLabel: string;
  Label: string;
  Default: TProperty;
  private _enabledFunc: (model: TModel) => boolean;
  private _mandatoryFunc: (model: TModel) => boolean;
  private _propertyValueFunc: (model: TModel) => TProperty;
  private _enumeration: IEnumeration<TEnumeration, TIdentifier>;

  public get MandatoryFunc(): (model: TModel) => boolean {
    return this._mandatoryFunc;
  }

  public set MandatoryFunc(value: (model: TModel) => boolean) {
    this._mandatoryFunc = value;
  }

  public get Enumaration(): IEnumeration<TEnumeration, TIdentifier> {
    return this._enumeration;
  }

  public set Enumaration(value: IEnumeration<TEnumeration, TIdentifier>) {
    this._enumeration = value;
  }

  public get PropertyValueFunc(): (model: TModel) => TProperty {
    return this._propertyValueFunc;
  }

  public set PropertyValueFunc(value: (model: TModel) => TProperty) {
    this._propertyValueFunc = value;
  }

  public get EnabledFunc(): (model: TModel) => boolean {
    return this._enabledFunc;
  }

  public set EnabledFunc(value: (model: TModel) => boolean) {
    this._enabledFunc = value;
  }

  EnabledWhen(enabledFunc: (model: TModel) => boolean): this {
    this._enabledFunc = enabledFunc;
    return this;
  }

  MandatoryWhen(mandatoryFunc: (model: TModel) => boolean): this {
    this._mandatoryFunc = mandatoryFunc;
    return this;
  }

  WithLabel(label: string): this {
    this.Label = label;
    this.FullLabel = label;
    return this;
  }

  WithEnumeration(enumeration: IEnumeration<TEnumeration, TIdentifier>): this {
    this._enumeration = enumeration;
    return this;
  }

  WithMin(min: TProperty): this {
    this.min = min;
    return this;
  }

  WithMax(max: TProperty): this {
    this.max = max;
    return this;
  }
}
