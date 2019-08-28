import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SliderPropertyViewModel } from "./SliderPropertyViewModel";

@Component({
    selector: "Slider-Comp",
    templateUrl: "./slider.component.html",
    styleUrls: ["./slider.component.scss"]
  })
  export class SliderComponent implements OnInit
  {

    @Input()
    Content:SliderPropertyViewModel;

    InputForm:FormControl;

    ngOnInit(): void {
       this.InputForm= this.Content.Form;
    }

  }
ts