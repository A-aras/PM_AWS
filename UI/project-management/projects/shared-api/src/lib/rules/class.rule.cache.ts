import { ClassRuleInfo } from "./class.rule.Info";
import { IReactiveClassModel } from "../model/IReactiveClassModel";
import { ClassRuleBuilder } from "./ClassRuleBuilder";
import { ObjectType } from "../types/Object.type";
import { IClassRule } from "./IClassRule";

export class ClassRulesCache {

    static classRulesDictonary: ClassRuleInfo<any, any>[]=[];

    public static AddClassRulesToCache<TModel extends IReactiveClassModel, TClassMetaDataBuilder extends ClassRuleBuilder<TModel>>(model: new (modelType:ObjectType<TModel>) => TModel, metaData: new () => TClassMetaDataBuilder) {
        const type = typeof (model);
        console.log(type);
        let cacheEntry = new ClassRuleInfo<TModel, TClassMetaDataBuilder>();
        cacheEntry.ModelType=model;
        cacheEntry.ClassRuleBuilderType=metaData;

        let classRuleBuilder=new metaData();

        cacheEntry.ClassRule=classRuleBuilder.Build();
        cacheEntry.ClassRuleBuilder=classRuleBuilder;
        ClassRulesCache.classRulesDictonary.push(cacheEntry);
    }

    public static GetClassRules<TModel>(identifier: ObjectType<TModel>): IClassRule<TModel> {
        let classRuleEntries = ClassRulesCache.classRulesDictonary.filter(x => x.ModelType === identifier);
        if (classRuleEntries.length >= 0) {
            let a=classRuleEntries[0];
            let classRule=a.ClassRule

            return classRule;
        }
        else {
            return null;
        }
    }

    public static GetClassRuleBuilder<TModel extends IReactiveClassModel>(identifier: ObjectType<TModel>): ClassRuleBuilder<TModel> {
        let classRules = ClassRulesCache.classRulesDictonary.filter(x => x.ModelType === identifier);
        if (classRules.length >= 1) {
            
            let a=classRules[0];

            let classRule=a.ClassRuleBuilder;

            return classRule;
        }
        else {
            return null;
        }
    }

}
