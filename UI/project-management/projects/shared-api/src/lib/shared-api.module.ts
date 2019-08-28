import { NgModule } from "@angular/core";
import { SharedApiComponent } from "./shared-api.component";
import { DomSanitizer, BrowserModule } from "@angular/platform-browser";
import {
  MatIconRegistry,
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule,
  MatCardModule,
  MatCheckboxModule
} from "@angular/material";
import { TextBoxComponent } from "./ui/textbox/textBox.component";
import { ComboBoxComponent } from "./ui/combobox/combobox.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { ReactiveCommandDirective } from "./ui/reactivecommand/reactive.commandDirective";
import { ReactiveCommandRefDirective } from "./ui/reactivecommand/reactive.commandRefDirective ";
import { MessageBoxComponent } from "./ui/shared/messageBoxViewModel/messagebox.component";
import { DatePickerComponent } from "./ui/datepicker/datepicker.component";
import { SliderComponent } from "./ui/slider/slider.component";
import { CheckBoxComponent } from "./ui/checkbox/checkBox.component";

@NgModule({
  declarations: [
    SharedApiComponent,
    TextBoxComponent,
    ComboBoxComponent,
    ReactiveCommandDirective,
    ReactiveCommandRefDirective,
    MessageBoxComponent,
    DatePickerComponent,
    SliderComponent,
    CheckBoxComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSliderModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  exports: [
    SharedApiComponent,
    TextBoxComponent,
    ComboBoxComponent,
    ReactiveCommandDirective,
    ReactiveCommandRefDirective,
    MessageBoxComponent,
    DatePickerComponent,
    SliderComponent,
    CheckBoxComponent
  ],
  providers: [MatIconRegistry]
})
export class SharedApiModule {
  /**
   *
   */
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "inputclear",
      sanitizer.bypassSecurityTrustResourceUrl("assets/clear-input.svg")
    );
    library.add(faTimes);
  }
}
