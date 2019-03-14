
import { ReactiveClassModel, ReactiveProperty, ClassRule, HasClassClassRule } from "projects/shared-api";
import { UserReactiveModelClassRules } from "./user.reactive.model.classrule";

@HasClassClassRule(UserReactiveModelClassRules)
export class UserReactiveModel extends ReactiveClassModel {


    @ReactiveProperty
    FirstName: string;

/**
 *
 */
constructor() {
    super();
}

}
