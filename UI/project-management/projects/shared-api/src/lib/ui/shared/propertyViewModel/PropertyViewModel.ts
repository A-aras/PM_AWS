import { FormControl } from "@angular/forms";
import { ReactiveField } from "../../../decorators/reactive.property";
import { GetPropertyName } from "../../../expressiontools/expression.helper";
import { IReactiveClassModel } from "../../../model/IReactiveClassModel";
import { ReactiveClassModel } from "../../../model/ReactiveClassModel";
import { IPropertyRule } from "../../../rules/IPropertyRule";
import { MandatoryValidator } from "../../../validation/mandatory.validator";
import { ValidationHelper } from "../../../validation/validation.helper";
import { IComponentPropetyViewModel } from "../viewmodel/IComponentPropetyViewModel";
import {
  merge,
  mergeAll,
  mergeMap,
  mergeMapTo,
  filter,
  switchMap,
  startWith
} from "rxjs/operators";

export abstract class PropertyViewModel extends ReactiveClassModel {
  private enabledWhenFunc: (model: ReactiveClassModel) => boolean;

  @ReactiveField
  public Model: ReactiveClassModel;

  // public get GetModel(): ReactiveClassModel {
  //     return this.Model;
  // }
  // public set SetModel(value: ReactiveClassModel) {
  //     this.Model = value;
  //     this.ApplyMetaData();
  //     this.ApplyValidators();
  // }

  @ReactiveField
  public IsDiabled: boolean;

  public PropertyValue: any;

  public PropertyPath: string;

  public PropertyFunc: (model: ReactiveClassModel) => any;

  public Form: FormControl;

  public PropertyRule: IPropertyRule;

  protected ApplyEnumerations() {
    return;
  }

  /**
   *
   */
  constructor(
    public viewModel: IComponentPropetyViewModel<ReactiveClassModel>
  ) {
    super();
    this.InitializeReativePropertie();
    this.Form = new FormControl("");

    this.Form.valueChanges.subscribe(x => {
      this.SynchronizeFormControlToModel();
    });

    this.Form.statusChanges.subscribe(x => {
      console.log("form group status changed");
    });

    //When Model binded to view model changes
    //Child property view model should use the same model
    this.viewModel.WhenModelChanged().subscribe(x => {
      this.Model = x;
    });

    this.WhenPropertyChanged(x => x.Model).subscribe(x => {
      //this.Model = x;
      this.ApplyMetaData();
      this.ApplyValidators();
      this.SynchronizeModelToFormControl();
    });

    this.WhenPropertyChanged(x => x.Model)
      .pipe(
        filter(x => {
          return x != undefined;
        }),
        mergeMap(x => {
          return x.WhenPropertyChanges().pipe(startWith(this.Model));
        })
      )
      .pipe(
        filter(y => {
          return true;
        })
      )
      .subscribe(x => {
        this.IsDiabled = this.ValidateIsEnabled();
        this.Form.updateValueAndValidity();
        this.viewModel.formGroup.updateValueAndValidity();
      });

    // this.WhenPropertyChanged(x => x.IsDiabled).subscribe(x => {
    //   let enablePVM = true;
    //   if (!(this.enabledWhenFunc === undefined || this.enabledWhenFunc === null)) {
    //     enablePVM = this.enabledWhenFunc(this.Model);
    //   }
    //   let result=x && enablePVM;
    //   if (result) {
    //     this.Form.enable();
    //   } else {
    //     this.Form.disable();
    //   }
    // });
  }

  private ValidateIsEnabled(): boolean {
    let enablePVM = true;
    if (
      !(this.enabledWhenFunc === undefined || this.enabledWhenFunc === null)
    ) {
      enablePVM = this.enabledWhenFunc(this.Model);
    }

    let enableModel = true;
    if (
      !(
        this.PropertyRule.EnabledFunc === undefined ||
        this.PropertyRule.EnabledFunc === null
      )
    ) {
      enableModel = this.PropertyRule.EnabledFunc(this.Model);
    }

    let result = enableModel && enablePVM;
    if (result) {
      this.Form.enable();
    } else {
      this.Form.disable();
    }
    return result;
  }

  public EnabledWhen(func: (model: ReactiveClassModel) => boolean) {
    this.enabledWhenFunc = func;
  }

  SynchronizeModelToFormControl() {
    let value = this.GetModelValue();
    this.SetValueToFormControl(value);
  }

  SynchronizeFormControlToModel() {
    let value = this.Form.value;
    if (value != this.Model[this.PropertyPath]) {
      this.SetPropertyValueToModel(value);
    }
  }

  SetPropertyValueToModel(value: any) {
    this.Model[this.PropertyPath] = value;
  }

  SetValueToFormControl(value: any) {
    this.Form.setValue(value);
  }

  GetModelValue(): any {
    return this.PropertyFunc(this.Model);
  }

  ApplyMetaData() {
    let propMetaDatas = this.Model.Properties.filter(
      x => x.Name == this.PropertyPath
    );
    if (propMetaDatas != undefined && propMetaDatas.length >= 1) {
      this.PropertyRule = propMetaDatas[0];
    }
    this.ApplyEnumerations();
  }

  SetPropertyFunc(propFunc: (model: ReactiveClassModel) => any) {
    let fieldName = GetPropertyName(propFunc);
    this.PropertyPath = fieldName;
    this.PropertyFunc = propFunc;
    this.viewModel.formGroup.addControl(fieldName, this.Form);
  }

  ApplyValidators() {
    this.Form.clearValidators();
    let propMetaData = this.Model.GetPropertyRule(this.PropertyPath);
    if (propMetaData != undefined) {
      if (propMetaData.MandatoryFunc != undefined) {
        var mandatoryValidator = MandatoryValidator(
          this.Model,
          this.PropertyPath
        );
        this.Form.setValidators(mandatoryValidator);
      }
    }
  }
}
