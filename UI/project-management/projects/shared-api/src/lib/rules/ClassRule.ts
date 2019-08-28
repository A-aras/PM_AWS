import { GetPropertyName } from '../expressiontools/expression.helper';
import { IReactiveClassModel } from '../model/IReactiveClassModel';
import { IClassRule } from './IClassRule';
import { PropertyRule } from './PropertyRule';
import { IEnumeration } from './IEnumeration';
import { Enumeration } from './Enumeration';

export class ClassRule<TModel extends IReactiveClassModel> implements IClassRule<TModel>
{
    private enumaration:IEnumeration<any,any>[];
    Properties: PropertyRule<any, any>[]=[];

    /**
     *
     */
    constructor() {
        //super();
        this.enumaration = [];
    }

    AddProperty<TProperty = any>(propertyFunc: (model: TModel) => TProperty): PropertyRule<TProperty,TModel> {
        let prop = new PropertyRule<TProperty,TModel>();
        let fieldName= GetPropertyName(propertyFunc);
        prop.Name=fieldName;
        prop.Label=fieldName;
        prop.FullLabel=fieldName;
        prop.PropertyValueFunc=propertyFunc;
        this.Properties.push(prop);
        return prop;
    }

    AddEnumaration<TEnumeration=any,TIdentifier=any>(name: string): Enumeration<TEnumeration, TIdentifier> {
        let enumaration=new Enumeration<TEnumeration,TIdentifier>();
        enumaration.Name=name;
        return enumaration;
    }
}





