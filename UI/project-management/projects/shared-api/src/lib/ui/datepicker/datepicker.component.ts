import { Component, Input, OnInit, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import {  DatePickerPropertyViewModel } from "./DatePickerPropertyViewModel";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { MasterDataModel } from "../../model/MasterDataModel";
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
@Component({
    selector: "DatePicker-Comp",
    templateUrl: "./datepicker.component.html",
    styleUrls: ["./datepicker.component.scss"]
})
export class DatePickerComponent implements OnInit {


    faTimes = faTimes;
    //private optionSelected: EventEmitter<MatAutocompleteSelectedEvent>
    @Input()
    Content: DatePickerPropertyViewModel;

    InputForm: FormControl;

    ngOnInit(): void {
        this.InputForm = this.Content.Form;
        //    this.optionSelected.subscribe(x=>{
        //        console.log(x);
        //    });
    }

    // OnOptionSelected(event: MatAutocompleteSelectedEvent) {
    //     console.log(event);
    //     let selectedItem = event.option.value as MasterDataModel;
    //     this.Content.SetSelectedItem(selectedItem);
    // }

    // ClearSelection() {
    //     this.Content.SetSelectedItem(null);
    //     this.InputForm.setValue(null);
    // }

}
