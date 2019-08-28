import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ReactiveClassModel } from "../model/ReactiveClassModel";
import { MandatoryValidator } from "./mandatory.validator";
import {
  ValidationError,
  ValidationResult,
  Catagroy
} from "./validation.result";
import { error } from "@angular/compiler/src/util";

export class ValidationHelper {
  public static Validate(formGroup: FormGroup | FormArray) {
    // Object.keys(formGroup.controls).forEach(field => {
    //     var control = formGroup.get(field);
    //     if (control instanceof FormControl) {
    //         control.markAsTouched({ onlySelf: true });
    //         control.markAsDirty({ onlySelf: true });
    //     }
    //     else if (control instanceof FormGroup) {
    //         this.Validate(control);
    //     }
    //     else if (control instanceof FormArray) {
    //         this.Validate(control);
    //     }
    // });

    this.MarkForValidation(formGroup);
    let result: ValidationResult = new ValidationResult();
    this.ValidateControl(formGroup, result);
    return result;
  }

  private static MarkForValidation(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      var control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.MarkForValidation(control);
      } else if (control instanceof FormArray) {
        this.MarkForValidation(control);
      }
    });
  }

  private static ValidateControl(
    formGroup: FormGroup | FormArray,
    reuslt: ValidationResult
  ) {
    Object.keys(formGroup.controls).forEach(field => {
      var control = formGroup.get(field);
      if (control instanceof FormControl) {
        let errors1 = control.errors;
        if (errors1 != null || errors1 === undefined) {
          let errors = Object.keys(control.errors);
          if (errors != null && error != undefined) {
            errors.forEach(errorInfo => {
              let error = control.getError(errorInfo);
              reuslt.Validations.push(error);
            });
          }
        }
      } else if (control instanceof FormGroup) {
        this.ValidateControl(control, reuslt);
      } else if (control instanceof FormArray) {
        this.ValidateControl(control, reuslt);
      }
    });
  }

  // public static ValidateModel(model2Validate:ReactiveClassModel):ValidationResults
  // {
  //     let validationResults:ValidationResults;
  //     validationResults=new ValidationResults();;
  //     validationResults.Validations=[];
  //     model2Validate.Properties.forEach(x=>{
  //         let result= MandatoryValidator(model2Validate,x.Name);
  //         if(!result)
  //         {
  //             let validationResult:ValidationResult;
  //             validationResult=new ValidationResult();
  //             validationResult.Category=Catagroy.Error;
  //             validationResult.Message= x.Label + " is required."
  //             validationResults.Validations.push(validationResult);
  //         }
  //     });

  //     return validationResults;
  // }
}
