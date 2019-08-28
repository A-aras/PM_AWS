import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ButtonPropertyViewModel } from "./ButtonPropertyViewModel";

@Component({
    selector: "TextBox-Comp",
    templateUrl: "./textBox.component.html",
    styleUrls: ["./textBox.component.scss"]
  })
  export class ButtonComponent implements OnInit
  {

    @Input()
    Content:ButtonPropertyViewModel;

    InputForm:FormControl;

    ngOnInit(): void {
       this.InputForm= this.Content.Form;
    }

  }
