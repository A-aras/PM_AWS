import { Subject } from "rxjs";
import { IReactiveClassModel } from "../model/IReactiveClassModel";
import { ReactiveClassModel } from "shared-api";
import {} from "reflect-metadata";

// export const ReactiveProperty2 =()=>(
//   target: any,
//   key: string,
//   descriptor: PropertyDescriptor
// ) => {
//   const getter = function(this: ReactiveClassModel) {
//     return this[key];
//   };

//   const setter = function(this: ReactiveClassModel, newVal) {
//     this[key] = newVal;
//     if (this.NotificationSubject != undefined) {
//       this.NotificationSubject.next(key);
//     }
//   };

//   descriptor = descriptor || {};
//   descriptor.get = getter;
//   descriptor.set = setter;
//   return descriptor;
// }

// export function ReactiveProperty3 (target: any, key: string) {
//     try {
//         console.log(`${name}...`);
//         let localValue = undefined;
//         let prev = Object.getOwnPropertyDescriptor(target, key);
//         let setter = function (newVal) {
//             try {
//                 console.log(`${name} setter(${newVal}) called...`);
//                 if (prev) prev.set(newVal);
//                 localValue = newVal;
//             } finally {
//                 console.log(`...${name} setter called`);
//             }
//         };
//         let getter = function () {
//             try {
//                 console.log(`${name} getter(${localValue}) called...`);
//                 if (prev) prev.get();
//                 return localValue;
//             } finally {
//                 console.log(`...${name} getter called`);
//             }
//         };
//         Object.defineProperty(target, key, {
//             get: getter,
//             set: setter,
//             enumerable: prev == null ? true : prev.enumerable,
//             configurable: prev == null ? true : prev.configurable
//         });
//     } finally {
//         console.log(`...${name}`);
//     }
// }

// export function ReactiveProperty<TModel extends IReactiveClassModel>(
//   target: TModel,
//   key: string
// ) {
//   var val = target[key];

//   var getter = function() {
//     return val;
//   };

//   var setter = function(newval) {
//     val = newval;
//     if (this.NotificationSubject != undefined) {
//       this.NotificationSubject.next(key);
//     }
//   };

//   Object.defineProperty(target, key, {
//     get: getter,
//     set: setter,
//     enumerable: true,
//     configurable: true
//   });
// }

// export function ReactiveProperty5<TModel extends ReactiveClassModel, TValue>(
//   target: TModel,
//   key: string,
//   descriptor: TypedPropertyDescriptor<TValue>
// ): any {
//   let set = descriptor.set;

//   descriptor.set = function(value: TValue) {
//     // let type = Reflect.getMetadata("design:type", target, propertyKey);
//     // if (!(value instanceof type)) {
//     //     throw new TypeError("Invalid type.");
//     // }

//     set.call(target, value);
//     //value.NotifyPropertyChanged(key);
//   };

//   //ReactivePropertyMapper(target, key);

//   //   const values = new Map<any, TModel>();
//   //   Object.defineProperty(target, key, {
//   //     set(firstValue: any) {
//   //       Object.defineProperty(this, key, {
//   //         get() {
//   //           return values.get(this);
//   //         },
//   //         set(value: any) {
//   //           values.set(this, value);
//   //         },
//   //         enumerable: true
//   //       });
//   //       this[key] = firstValue;
//   //     },
//   //     enumerable: true,
//   //     configurable: true
//   //   });
// }

// export function ReactiveProperty1<TModel1 extends ReactiveClassModel>
// (value: TModel1)
// {
// export function ReactiveProperty1<TModel extends IReactiveClassModel>(
//   target: TModel,
//   key: string
// ): any {
//   //ReactivePropertyMapper(target, key);

//   const values = new Map<any, TModel>();
//   Object.defineProperty(target, key, {
//     set(firstValue: any) {
//       Object.defineProperty(this, key, {
//         get() {
//           return values.get(this);
//         },
//         set(value: any) {
//           values.set(this, value);
//         },
//         enumerable: true
//       });
//       this[key] = firstValue;
//     },
//     enumerable: true,
//     configurable: true
//   });
// }
// //}

// //Inspired from
// //https://romkevandermeulen.nl/2018/01/24/typescript-property-decorators.html

// function ReactivePropertyMapper<TModel extends ReactiveClassModel>(
//   prototype: any,
//   key: string
// ) {
//   const values = new Map<any, TModel>();
//   Object.defineProperty(prototype, key, {
//     set(firstValue: any) {
//       Object.defineProperty(this, key, {
//         get() {
//           return values.get(this);
//         },
//         set(value: any) {
//           values.set(this, value);
//         },
//         enumerable: true
//       });
//       this[key] = firstValue;
//     },
//     enumerable: true,
//     configurable: true
//   });
// }

// export function ReactiveProperty6<TModel1 extends ReactiveClassModel>(
//   value: TModel1
// ) {
//   return function(target: TModel1, key: string): any {
//     var val = target[key];

//     var getter = function() {
//       return val;
//     };

//     var setter = function(newval) {
//       val = newval;

//       if (value != undefined && value.NotificationSubject != undefined) {
//         value.NotificationSubject.next(key);
//       }
//     };

//     Object.defineProperty(target, key, {
//       get: getter,
//       set: setter,
//       enumerable: true,
//       configurable: true
//     });
//   };
// }

// function ReativeClass<TModel extends ReactiveClassModel>(target: TModel) {
//   // save a reference to the original constructor
//   var original = target;
// }

// const formatMetadataKey = Symbol("ReactiveField");

export function ReactiveField(target, key) {
  const fields = Reflect.getMetadata("ReactiveFields", target) || [];
  if (!fields.includes(key)) {
    fields.push(key);
  }
  Reflect.defineMetadata("ReactiveFields", fields, target);
}

// export function ReactiveField(): PropertyDecorator {
//     return (target, key) => {
//         const fields = Reflect.getMetadata('ReactiveFields', target) || [];
//         if (!fields.includes(key)) {
//             fields.push(key)
//         }
//         Reflect.defineMetadata('ReactiveFields', fields, target)
//     }
//   }
