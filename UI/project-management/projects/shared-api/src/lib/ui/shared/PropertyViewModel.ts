
import { FormControl } from "@angular/forms";
import { ReactiveProperty } from "../../decorators/reactive.property";
import { GetPropertyName } from "../../expressiontools/expression.helper";
import { IReactiveClassModel } from "../../model/IReactiveClassModel";
import { ReactiveClassModel } from "../../model/ReactiveClassModel";
import { IPropertyRule } from "../../rules/IPropertyRule";
import { MandatoryValidator } from "../../validation/mandatory.validator";
import { ValidationHelper } from "../../validation/validation.helper";
import { IComponentPropetyViewModel } from "./IComponentPropetyViewModel";

export abstract class PropertyViewModel extends ReactiveClassModel {

    @ReactiveProperty
    public Model: IReactiveClassModel;
    
    public get GetModel(): IReactiveClassModel {
        return this.Model;
    }
    public set SetModel(value: IReactiveClassModel) {
        this.Model = value;
        this.ApplyMetaData();
        this.ApplyValidators();
    }


    public PropertyValue: any;

    public PropertyPath: string;

    public PropertyFunc: (model: IReactiveClassModel) => any;

    public Form: FormControl;

    public PropertyRule: IPropertyRule;

    /**
     *
     */
    constructor(public viewModel: IComponentPropetyViewModel<IReactiveClassModel>) {
        super();

        this.Form = new FormControl("", { updateOn: 'blur' });

        this.Form.valueChanges.subscribe(x => {
            this.SynchronizeFormControlToModel();
            ValidationHelper.MarkForValidation(this.viewModel.formGroup);
            this.viewModel.formGroup.markAsDirty({ onlySelf: true })
            this.viewModel.formGroup.markAsTouched({ onlySelf: true })
        });

        this.Form.statusChanges.subscribe(x => {
            console.log("form group status changed");
        })


        this.WhenPropertyChanged(x => x.Model).subscribe(x => {
            this.Model = x;
            this.ApplyMetaData();
            this.ApplyValidators();
            this.SynchronizeModelToFormControl();
        });

    }

    SynchronizeModelToFormControl() {
        let value = this.GetModelValue();
        this.SetValueToFormControl(value);
    }

    SynchronizeFormControlToModel() {
        let value = this.Form.value;
        this.Model[this.PropertyPath] = value;
    }

    SetValueToFormControl(value: any) {
        this.Form.setValue(value);
    }

    GetModelValue(): any {
        return this.PropertyFunc(this.Model);
    }

    ApplyMetaData() {
        let propMetaDatas = this.Model.Properties.filter(x => x.Name == this.PropertyPath);
        if (propMetaDatas != undefined && propMetaDatas.length >= 1) {
            this.PropertyRule = propMetaDatas[0];
        }
    }

    SetPropertyFunc(propFunc: (model: IReactiveClassModel) => any) {
        let fieldName = GetPropertyName(propFunc);;
        this.PropertyPath = fieldName;
        this.PropertyFunc = propFunc;
        this.viewModel.formGroup.addControl(fieldName, this.Form);

    }

    ApplyValidators() {
        this.Form.clearValidators();
        let propMetaData = this.Model.GetPropertyRule(this.PropertyPath)
        if (propMetaData != undefined) {

            if (propMetaData.MandatoryFunc != undefined) {
                var mandatoryValidator = MandatoryValidator(this.Model, this.PropertyPath);
                this.Form.setValidators(mandatoryValidator);
            }
        }

    }

}