import { FormGroup } from "@angular/forms";
import { ReactiveProperty } from "../../decorators/reactive.property";
import { IReactiveClassModel } from "../../model/IReactiveClassModel";
import { IComponentPropetyViewModel } from "./IComponentPropetyViewModel";
import { TextBoxPropertyViewModel } from "../textbox/TextBoxPropertyViewModel";

export abstract class ComponentPropetyViewModel<TModel extends IReactiveClassModel> extends IComponentPropetyViewModel<TModel> {
    @ReactiveProperty
    public model: TModel;

    @ReactiveProperty
    public _formGroup: FormGroup;
    get Model(): TModel
    {
        return this.model;
    }

    get formGroup(): FormGroup
    {
        return this._formGroup;
    }

      /**
      *
      */
    constructor(model: TModel) {
        super();
        this._formGroup=new FormGroup({});
        this.model = model;
    }

    public TextBox<TProperty =any>(propFunc: (model: TModel) => TProperty): TextBoxPropertyViewModel  {
        //var pvm = ModelObjectFactory.Create(TextBoxPropertyViewModel);

        var pvm = new TextBoxPropertyViewModel(this,propFunc);
        //pvm.SetPropertyFunc(propFunc);
        // TextBoxPropertyViewModel(this,propFunc);
        //let model=this.Model as BaseModel;
        pvm.SetModel=this.Model;
        
        return pvm;
    }

}