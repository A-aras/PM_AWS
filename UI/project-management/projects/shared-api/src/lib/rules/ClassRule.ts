import { GetPropertyName } from '../expressiontools/expression.helper';
import { IReactiveClassModel } from '../model/IReactiveClassModel';
import { IClassRule } from './IClassRule';
import { PropertyRule } from './PropertyRule';

export class ClassRule<TModel extends IReactiveClassModel> extends IClassRule<TModel>
{
    Properties: PropertyRule<any, any>[]=[];

    /**
     *
     */
    constructor() {
        super();
        
    }

    AddProperty<TProperty = any>(propertyFunc: (model: TModel) => TProperty): PropertyRule<TProperty,TModel> {
        let prop = new PropertyRule<TProperty,TModel>();
        let fieldName= GetPropertyName(propertyFunc);
        prop.Name=fieldName;
        prop.Label=fieldName;
        prop.FullLabel=fieldName;
        prop.propertyValueFunc=propertyFunc;
        this.Properties.push(prop);
        return prop;
    }
}





