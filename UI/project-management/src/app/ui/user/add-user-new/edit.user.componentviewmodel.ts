import { ComponentPropetyViewModel, ModelFactory, TextBoxPropertyViewModel } from "projects/shared-api";
import { UserReactiveModel } from "src/app/model/user.reactive.model";

export class EditUserComponentViewModel extends ComponentPropetyViewModel<UserReactiveModel>
{

    FirstName:TextBoxPropertyViewModel;
    /**
     *
     */
    constructor() {
        let userModel=ModelFactory.Create(UserReactiveModel);
        super(userModel);
        this.FirstName=this.TextBox(x=>x.FirstName);
    }
}