import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { IPmApiService } from "src/app/service/pm-api.service-interface";
import { PmServiceBus } from "src/app/service/service_bus";
import { EditUserComponentViewModel } from "./edit.user.componentviewmodel";
  
  @Component({
    selector: "app-add-user-new",
    templateUrl: "./add-user.component.new.html",
    styleUrls: ["./add-user.component.new.css"]
  })
  export class AddNewUserComponent implements OnInit {
    // userForm: FormGroup;
    // fName: FormControl;
    // lName: FormControl;
    // empId: FormControl;
    // btnAction = "Add";
  
    // model = new UserModel()
    //       .WithValue(x=>x.EmployeeId=-1)
    //   .WithValue(x=>x.FirstName="")
    //   .WithValue(x=>x.LastName="")
    //   .WithValue(x=>x.UserId=0);
  
    // model: UserModel = {
    //   EmployeeId: null,
    //   FirstName: "",
    //   LastName: "",
    //   //ProjectId: 0,
    //   //Task: null,
    //   //TaskId: 0,
    //   UserId: 0,
    // };
  
    // @ViewChild("alertModal")
    // alertModal: ModalDirective;
  
    // DialogResult: Subject<boolean> = new Subject<boolean>();
  
    // @Output()
    // messageEvent=new EventEmitter<boolean> ();
  
    userViewModel:EditUserComponentViewModel;

    constructor(
      private service: IPmApiService,
      private router: Router,
      private activeRoute: ActivatedRoute,
      private modalService: BsModalService,
      private serviceBus: PmServiceBus
    ) {
     //this.initFormsControl();
     this.userViewModel=new EditUserComponentViewModel();
    }
  
    ngOnInit() {
    //   this.serviceBus.UserEditObservable.subscribe(x => {
    //     this.btnAction = "Save";
    //     this.model = x;
    //     this.UpdateValuesFromModelToFormsControls();
    //   });
      // this.activeRoute.paramMap
      //   .pipe(debounceTime(500),
      //     switchMap((parms: ParamMap) => {
      //       console.log(parms);
      //       if (parms.has("id")) {
      //         let id = Number.parseInt(parms.get("id"));
      //         this.btnAction = "Save";
      //         return this.service.getTaskById(id);
      //       }
      //       this.btnAction = "Add";
      //       return of(this.model);
      //     })
      //   )
      //   .subscribe(x => {
      //     this.model = x;
      //     this.UpdateValuesFromModelToFormsControls();
      //   });
  
    //   this.DialogResult.pipe(filter(x => x)).subscribe(x => {
    //     this.model.FirstName = this.fName.value;
    //     this.model.LastName = this.lName.value;
    //     this.model.EmployeeId = this.empId.value;
  
    //     if (this.btnAction === "Add") {
    //       this.service.AddUser(this.model).subscribe(x => {
    //         console.log("User Added...");
    //         //this.router.navigate(["/AddUser"]);
    //         this.refreshUser();
    //       });
    //     } else if (this.btnAction === "Save") {
    //       this.service.UpdateUser(this.model).subscribe(x => {
    //         console.log("User Updated...");
    //         //this.router.navigate(["/AddUser"]);
    //         this.refreshUser();
    //       });
    //     }
    //   });
    }
  
    // UpdateValuesFromModelToFormsControls() {
    //   this.fName.setValue(this.model.FirstName);
    //   this.lName.setValue(this.model.LastName);
    //   this.empId.setValue(this.model.EmployeeId);
    // }
  
    // private initFormsControl() {
    //   this.fName = new FormControl(this.model.FirstName, Validators.required);
    //   this.lName = new FormControl(this.model.LastName, Validators.required);
  
    //   this.empId = new FormControl(this.model.EmployeeId, Validators.required);
  
    //   this.userForm = new FormGroup({
    //     fName: this.fName,
    //     lName: this.lName,
    //     empId: this.empId
    //   });
    // }
  
    // onUserSave() {
    //   ValidationHelper.Validate(this.userForm);
  
    //   if (this.userForm.valid) {
    //     this.ShowAlterModel();
    //     return;
    //     //alert("form valid");
    //   }
    //   alert("Please enter valid inputs to proceed further");
    // }
  
    // ShowAlterModel() {
    //   this.alertModal.show();
    // }
  
    // confirm(): void {
    //   this.alertModal.hide();
    //   this.DialogResult.next(true);
    // }
  
    // decline(): void {
    //   this.alertModal.hide();
    //   this.DialogResult.next(false);
    // }
  
    // refreshUser(): void {
    //   // this.model.EmployeeId=0;
    //   // this.model.FirstName="";
    //   // this.model.LastName="";
    //   // this.model.ProjectId=0;
    //   // this.model.Task=null;
    //   // this.model.TaskId=0;
    //   // this.model.UserId=0;
    //   //this.initFormsControl();
    //   this.model.UserId=-1;
    //   this.btnAction = "Add";
    //   this.userForm.reset();
    //   this.serviceBus.UserSearchObservable.next(true);
    // }
  }
  