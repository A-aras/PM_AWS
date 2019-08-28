import { ReactiveClassModel } from "./ReactiveClassModel";
import { ReactiveField } from "../decorators/reactive.property";

// export abstract class IMasterDataModel
// {
//     DisplayMember:any;
//     ValueMember:any;
//     Identifier:any;
// }

export class MasterDataModel extends ReactiveClassModel {
  @ReactiveField
  DisplayMember: any;
  @ReactiveField
  ValueMember: any;
  @ReactiveField
  Identifier: any;
}
