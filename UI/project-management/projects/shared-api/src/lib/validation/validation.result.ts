import { ValidatorFn, AbstractControl } from "@angular/forms";
import { IReactiveClassModel } from "../model/IReactiveClassModel";

export enum Catagroy {
  Error,
  Warning,
  Info
}

export class ValidationError {
  public Message: string;
  public Category: Catagroy;
}

export class ValidationResult {
  public Validations: ValidationError[] = new Array<ValidationError>();

  public get HasError(): boolean {
    if (this.Validations === undefined || this.Validations === null) {
      return false;
    } else {
      let validationError = this.Validations.find(
        x => x.Category === Catagroy.Error
      );
      if (validationError === undefined || validationError === null) {
        return false;
      }
      return true;
    }
  }
}
