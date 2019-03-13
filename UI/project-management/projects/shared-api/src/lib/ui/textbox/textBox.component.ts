import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { TextBoxPropertyViewModel } from "./TextBoxPropertyViewModel";

@Component({
    selector: "TextBox-Comp",
    templateUrl: "./textBox.component.html",
    styleUrls: ["./textBox.component.css"]
  })
  export class TextBoxComponent implements OnInit
  {

    @Input()
    Content:TextBoxPropertyViewModel;

    InputForm:FormControl;

    ngOnInit(): void {
       this.InputForm= this.Content.Form;
    }

  }
