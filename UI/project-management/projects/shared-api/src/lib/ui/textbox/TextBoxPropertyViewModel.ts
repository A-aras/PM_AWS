
import { IReactiveClassModel } from "../../model/IReactiveClassModel";
import { IComponentPropetyViewModel } from "../shared/IComponentPropetyViewModel";
import { PropertyViewModel } from "../shared/PropertyViewModel";


export class TextBoxPropertyViewModel  extends PropertyViewModel
{
    // @ReactiveProperty
    // Model:TModel;

    //PropertyValue:any;

    //PropertyPath:string;

    //PropertyFunc:(TModel)=>any;

    /**
     *
     */

    public viewModel1: IComponentPropetyViewModel<IReactiveClassModel>;

    constructor(public viewModel: IComponentPropetyViewModel<IReactiveClassModel>,propFunc:(model:IReactiveClassModel)=>any) {
        
        super(viewModel);
        //this.Model=model;
        this.SetPropertyFunc(propFunc);
        
    }
}

