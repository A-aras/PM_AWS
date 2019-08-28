import { IReactiveClassModel } from "./IReactiveClassModel";
import { ClassRulesCache } from "../rules/class.rule.cache";
import { ObjectType } from "../types/Object.type";
import { ReactiveClassModel } from "./ReactiveClassModel";
import { IReactiveClassInitializer } from "./IReactiveClassInitializer";

export class ModelFactory {
    public static Create<T extends ReactiveClassModel>(ctor:ObjectType<T>): T {
        let modelInstance = new ctor();
        var metaDatas=ClassRulesCache.GetClassRuleBuilder(ctor);
        if(metaDatas!=null)
        {
            var classmetaData=metaDatas.Build();
            modelInstance.Properties=classmetaData.Properties;
        }
        // var initializer= modelInstance as unknown as IReactiveClassInitializer;
        // initializer.InitializeReativePropertie();
        return modelInstance;
    }

}