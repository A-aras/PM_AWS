import { ClassRuleBuilder } from "../rules/ClassRuleBuilder";
import { IReactiveClassModel } from "../model/IReactiveClassModel";
import { ObjectType } from "../types/Object.type";
import { ClassRuleInfo } from "../rules/class.rule.Info";
import { ClassRulesCache } from "../rules/class.rule.cache";

export function HasClassClassRule<TClassRuleBuilder extends ClassRuleBuilder<TModel>,TModel extends IReactiveClassModel>(metaData:ObjectType<TClassRuleBuilder>):Function
{
    return function(modelType:ObjectType<TModel>)
    {
        let modelEntry=new ClassRuleInfo<TModel,TClassRuleBuilder>();
        modelEntry.ModelType=modelType;
        modelEntry.ClassRuleBuilderType=metaData;
        ClassRulesCache.AddClassRulesToCache(modelType,metaData)
    }
}