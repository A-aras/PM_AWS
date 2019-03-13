import { IReactiveClassModel } from "../model/IReactiveClassModel";
import { ClassRule } from "./ClassRule";

export abstract class ClassRuleBuilder<TModel extends IReactiveClassModel>{
    
    public Build(): ClassRule<TModel> {
        let target = new ClassRule<TModel>();
        this.ApplyImpl(target);
        return target;
    }

    public abstract ApplyImpl(target: ClassRule<TModel>);
}