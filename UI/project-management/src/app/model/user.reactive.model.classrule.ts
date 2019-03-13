import { ClassRuleBuilder, ClassRule } from "projects/shared-api";
import { UserReactiveModel } from "./user.reactive.model";

export class UserReactiveModelClassRules extends ClassRuleBuilder<UserReactiveModel>
{
    public ApplyImpl(target: ClassRule<UserReactiveModel>) {
        
        target.AddProperty(x=>x.FirstName).WithLabel("First Name");
    }
    
}