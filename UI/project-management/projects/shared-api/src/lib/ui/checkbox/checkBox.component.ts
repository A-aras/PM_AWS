import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {  CheckBoxPropertyViewModel } from "./CheckBoxPropertyViewModel";

@Component({
    selector: "CheckBox-Comp",
    templateUrl: "./checkBox.component.html",
    styleUrls: ["./checkBox.component.scss"]
  })
  export class CheckBoxComponent implements OnInit
  {

    @Input()
    Content:CheckBoxPropertyViewModel;

    InputForm:FormControl;

    ngOnInit(): void {
       this.InputForm= this.Content.Form;
    }

  }
