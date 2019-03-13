import { IClassRule } from "./IClassRule";

export class ClassRuleInfo<TModel,TClassMetaData>{
    ModelType:Function;
    ClassRuleBuilderType:Function;
    ClassRule:IClassRule<TModel>;
    ClassRuleBuilder:TClassMetaData;
    
    }