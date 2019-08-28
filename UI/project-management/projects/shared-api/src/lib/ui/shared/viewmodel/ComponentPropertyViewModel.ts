import { FormGroup } from "@angular/forms";
import {  ReactiveField } from "../../../decorators/reactive.property";
import { IReactiveClassModel } from "../../../model/IReactiveClassModel";
import { IComponentPropetyViewModel } from "./IComponentPropetyViewModel";
import { TextBoxPropertyViewModel } from "../../textbox/TextBoxPropertyViewModel";
import { Injector, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { ComboBoxPropertyViewModel } from "../../combobox/ComboBoxPropertyViewModel";
import { ReactiveClassModel } from "../../../model/ReactiveClassModel";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MessageBoxComponent } from "../messageBoxViewModel/messagebox.component";
import { Observable } from "rxjs";
import { ObservableViewModel } from "../observableViewModel/ObservableViewModel";
import { DatePickerPropertyViewModel } from "../../datepicker/DatePickerPropertyViewModel";
import { SliderPropertyViewModel } from "../../slider/SliderPropertyViewModel";
import { CheckBoxPropertyViewModel } from "../../checkbox/CheckBoxPropertyViewModel";

export abstract class ComponentPropetyViewModel<TModel extends ReactiveClassModel> extends ObservableViewModel 
implements IComponentPropetyViewModel<TModel> {
    
    WhenModelChanged():Observable<TModel>
    {
        return this.WhenPropertyChanged(x=>x.Model);
    }

    @ReactiveField
    @Input()
    public Model: TModel;

    //private  dialog:MatDialog;

    @ReactiveField
    public _formGroup: FormGroup;

    // get Model(): TModel
    // {
    //     return this.model;
    // }

    // set Model(value:TModel)
    // {
    //     this.model=value;
    // }

    get formGroup(): FormGroup
    {
        return this._formGroup;
    }

    // private _container:Injector;

    // get Container(): Injector
    // {
    //     return this._container;
    // }

      /**
      *
      */
    constructor(model: TModel,container: Injector) {
        super(container);
        this._formGroup=new FormGroup({});
        this.Model = model;
        //this._container=container;
        //this.dialog=this._container.get(MatDialog);
        this.InitializeReativePropertie();

    }

    public TextBox<TProperty =any>(propFunc: (model: TModel) => TProperty): TextBoxPropertyViewModel  {
        //var pvm = ModelObjectFactory.Create(TextBoxPropertyViewModel);
        let storeInstance=this.Container.get(Store);

        var pvm = new TextBoxPropertyViewModel(this,propFunc);
        //pvm.SetPropertyFunc(propFunc);
        // TextBoxPropertyViewModel(this,propFunc);
        //let model=this.Model as BaseModel;
        pvm.Model=this.Model;
        
        return pvm;
    }

    public ComboBox<TProperty =any>(propFunc: (model: TModel) => TProperty): ComboBoxPropertyViewModel  {
        //var pvm = ModelObjectFactory.Create(TextBoxPropertyViewModel);
        let storeInstance=this.Container.get(Store);

        var pvm = new ComboBoxPropertyViewModel(this,propFunc);
        //pvm.SetPropertyFunc(propFunc);
        // TextBoxPropertyViewModel(this,propFunc);
        //let model=this.Model as BaseModel;
        pvm.Model=this.Model;
        
        return pvm;
    }

    
    public DatePicker<TProperty =any>(propFunc: (model: TModel) => TProperty): DatePickerPropertyViewModel  {
        //var pvm = ModelObjectFactory.Create(TextBoxPropertyViewModel);
        let storeInstance=this.Container.get(Store);

        var pvm = new DatePickerPropertyViewModel(this,propFunc);
        //pvm.SetPropertyFunc(propFunc);
        // TextBoxPropertyViewModel(this,propFunc);
        //let model=this.Model as BaseModel;
        pvm.Model=this.Model;
        
        return pvm;
    }

    public Slider<TProperty =any>(propFunc: (model: TModel) => TProperty): SliderPropertyViewModel  {
        //var pvm = ModelObjectFactory.Create(TextBoxPropertyViewModel);
        let storeInstance=this.Container.get(Store);

        var pvm = new SliderPropertyViewModel(this,propFunc);
        //pvm.SetPropertyFunc(propFunc);
        // TextBoxPropertyViewModel(this,propFunc);
        //let model=this.Model as BaseModel;
        pvm.Model=this.Model;
        
        return pvm;
    }

    public CheckBox<TProperty =any>(propFunc: (model: TModel) => TProperty): CheckBoxPropertyViewModel  {
        //var pvm = ModelObjectFactory.Create(TextBoxPropertyViewModel);
        let storeInstance=this.Container.get(Store);

        var pvm = new CheckBoxPropertyViewModel(this,propFunc);
        //pvm.SetPropertyFunc(propFunc);
        // TextBoxPropertyViewModel(this,propFunc);
        //let model=this.Model as BaseModel;
        pvm.Model=this.Model;
        
        return pvm;
    }

    // public ShowConfirmMessage(title:string,content:string):Promise<boolean>
    // {

    //     const dialogRef =this.dialog.open(MessageBoxComponent,{width: '500px', height:'300px',
    //     data: {Header: title, Content: content}})
    //     return dialogRef.afterClosed().toPromise().then(x=>{
    //         return x as boolean;
    //     });
    // }

}