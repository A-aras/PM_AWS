import { Subject } from "rxjs";
import { IReactiveClassModel } from "../model/IReactiveClassModel";
import { ReactiveClassModel } from "shared-api";
import {} from "reflect-metadata";


export function Ignore(target, key) {
    const fields = Reflect.getMetadata("Ignore", target) || [];
    if (!fields.includes(key)) {
      fields.push(key);
    }
    Reflect.defineMetadata("Ignore", fields, target);
  }