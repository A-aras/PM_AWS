import { Component, Input, OnInit, EventEmitter, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";

import { MatAutocompleteSelectedEvent } from "@angular/material";


import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface DialogData {
  Header: string;
  Content: string;
}

@Component({
  selector: "MessageBox-Comp",
  templateUrl: "./messageBox.component.html",
  styleUrls: ["./messageBox.component.scss"]
})
export class MessageBoxComponent {
  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  decline(): void {
    this.dialogRef.close(false);
  }
}
