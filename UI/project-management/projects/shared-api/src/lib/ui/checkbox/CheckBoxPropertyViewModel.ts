
import { IReactiveClassModel } from "../../model/IReactiveClassModel";
import { IComponentPropetyViewModel } from "../shared/viewmodel/IComponentPropetyViewModel";
import { PropertyViewModel } from "../shared/propertyViewModel/PropertyViewModel";
import { ReactiveClassModel } from "../../model/ReactiveClassModel";


export class CheckBoxPropertyViewModel  extends PropertyViewModel
{
    /**
     *
     */

    public viewModel1: IComponentPropetyViewModel<ReactiveClassModel>;

    constructor(public viewModel: IComponentPropetyViewModel<ReactiveClassModel>,propFunc:(model:IReactiveClassModel)=>any) {
        
        super(viewModel);
        //this.Model=model;
        this.SetPropertyFunc(propFunc);
        
    }
}

