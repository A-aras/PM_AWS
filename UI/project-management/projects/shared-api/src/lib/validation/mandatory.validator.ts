import { ValidatorFn } from "@angular/forms";
import { AbstractControl } from "@angular/forms/src/model";
import { IReactiveClassModel } from "../model/IReactiveClassModel";


export function  MandatoryValidator<TModel extends IReactiveClassModel> (model:TModel,property:string ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        const invalidOj = { 'required': true };
        let propertyRule=model.GetPropertyRule(property);
        let isMandatory=propertyRule.MandatoryFunc(model);
        let propertyValue=propertyRule.PropertyValueFunc(model);
        if (isMandatory && (propertyValue==undefined||propertyValue===null || propertyValue===""))
        {
            return invalidOj
        }
        return null;
    }
}

