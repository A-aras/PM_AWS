import { IReactiveClassModel } from "./IReactiveClassModel";
import { ClassRulesCache } from "../rules/class.rule.cache";
import { ObjectType } from "../types/Object.type";

export class ModelFactory {
    public static Create<T extends IReactiveClassModel>(ctor:ObjectType<T>): T {
        let modelInstance = new ctor();
        var metaDatas=ClassRulesCache.GetClassRuleBuilder(ctor);
        if(metaDatas!=null)
        {
            var classmetaData=metaDatas.Build();
            modelInstance.Properties=classmetaData.Properties;
        }
        return modelInstance;
    }
ng 


}