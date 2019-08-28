import { ValidatorFn,AbstractControl } from "@angular/forms";
import { IReactiveClassModel } from "../model/IReactiveClassModel";
import { ValidationError, Catagroy } from "./validation.result";
import { ReactiveClassModel } from "../model/ReactiveClassModel";
import { IsNullOrEmpty } from "../utils/utils";


export function  MandatoryValidator<TModel extends ReactiveClassModel> (model:TModel,property:string ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        
        const invalidOj = { 'required': true };
        let propertyRule=model.GetPropertyRule(property);
        var value=model.GetPropertyValue(propertyRule.PropertyValueFunc);
        let isMandatory=propertyRule.MandatoryFunc(model);
        //let propertyValue=propertyRule.PropertyValueFunc(model);
        
        if (isMandatory && IsNullOrEmpty(value) && !control.pristine && control.touched)
        {
            let error:ValidationError=new ValidationError();
            error.Message= propertyRule.Name +  " is required";
            error.Category=Catagroy.Error;
            return [error]
        }
        return null;
    }
}

// export function ModelValidator<TModel extends IReactiveClassModel> (model:TModel,property:string ): ValidatorFn{
//     return (control: AbstractControl): { [key: string]: boolean } | null => {

//         const invalidOj = { 'required': true };
//         let propertyRule=model.GetPropertyRule(property);
//         let isMandatory=propertyRule.MandatoryFunc(model);
//         //let propertyValue=propertyRule.PropertyValueFunc(model);
//         if (isMandatory)
//         {
//             return invalidOj
//         }
//         return null;
//     } 
// }