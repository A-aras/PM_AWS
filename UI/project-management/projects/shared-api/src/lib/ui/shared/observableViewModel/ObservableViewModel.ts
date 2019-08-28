import { FormGroup } from "@angular/forms";
import { IReactiveClassModel } from "../../../model/IReactiveClassModel";
import { TextBoxPropertyViewModel } from "../../textbox/TextBoxPropertyViewModel";
import { Injector } from "@angular/core";
import { Store } from "@ngrx/store";
import { ComboBoxPropertyViewModel } from "../../combobox/ComboBoxPropertyViewModel";
import { ReactiveClassModel } from "../../../model/ReactiveClassModel";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MessageBoxComponent } from "../messageBoxViewModel/messagebox.component";
import { Observable } from "rxjs";
import { IObservableViewModel } from "./IObservableViewModel";

export abstract class ObservableViewModel extends ReactiveClassModel
  implements IObservableViewModel {

    
  private dialog: MatDialog;

  private _container: Injector;

  get Container(): Injector {
    return this._container;
  }

  /**
   *
   */
  constructor(container: Injector) {
    super();
    this._container = container;
    this.dialog = this._container.get(MatDialog);
  }

  public ShowConfirmMessage(title: string, content: string): Promise<boolean> {
    const dialogRef = this.dialog.open(MessageBoxComponent, {
      width: "500px",
      height: "300px",
      data: { Header: title, Content: content }
    });
    return dialogRef
      .afterClosed()
      .toPromise()
      .then(x => {
        return x as boolean;
      });
  }
}
