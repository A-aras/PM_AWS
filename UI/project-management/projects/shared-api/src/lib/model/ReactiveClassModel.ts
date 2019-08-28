import { IReactiveClassModel } from "./IReactiveClassModel";
import { Observable, Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { GetPropertyName } from "../expressiontools/expression.helper";
import { IPropertyRule } from "../rules/IPropertyRule";
import {} from "reflect-metadata";
import { IReactiveClassInitializer } from "./IReactiveClassInitializer";
import { ModelFactory } from "./model.factory";
import { ObjectType } from "../../public_api";
import { Ignore } from "../decorators/ignore.property";

export class ReactiveClassModel
  implements IReactiveClassModel, IReactiveClassInitializer {
  get ReactiveFields() {
    let fields = [];
    let target = Object.getPrototypeOf(this);
    while (target != Object.prototype) {
      var test = Reflect.getOwnMetadataKeys(target);
      var test1 = Reflect.getMetadataKeys(target);
      let childFields = Reflect.getMetadata("ReactiveFields", target) || [];
      fields.push(...childFields);
      target = Object.getPrototypeOf(target);
    }
    return fields;
  }

  get IgnoreFields() {
    let fields = [];
    let target = Object.getPrototypeOf(this);
    while (target != Object.prototype) {
      var test = Reflect.getOwnMetadataKeys(target);
      var test1 = Reflect.getMetadataKeys(target);
      let childFields = Reflect.getMetadata("Ignore", target) || [];
      fields.push(...childFields);
      target = Object.getPrototypeOf(target);
    }
    return fields;
  }

  GetPropertyRule(propertyName: string): IPropertyRule<any, this, any, any> {
    if (this.Properties != undefined) {
      var propMetaData = this.Properties.filter(x => x.Name === propertyName);
      return (propMetaData[0] as unknown) as IPropertyRule<any, this>;
    }
    return;
  }
  GetPropertyValue<TProperty = any>(
    propFunc: (IBaseModel: any) => TProperty
  ): TProperty {
    return propFunc(this);
  }

  @Ignore
  readonly _subject: Subject<string> = new Subject<string>();

  @Ignore
  private _properties: IPropertyRule<any, this, any, any>[];

  public get NotificationSubject(): Subject<string> {
    return this._subject;
  }

  //   public set NotificationSubject(value: Subject<string>) {
  //     this._subject = value;
  //   }

  NotifyPropertyChanged(property: string) {
    this.NotificationSubject.next(property);
  }

  public set Properties(value: IPropertyRule<any, any, any, any>[]) {
    this._properties = value;
  }

  public get Properties(): IPropertyRule<any, any, any, any>[] {
    return this._properties;
  }

  WhenPropertyChanged<T>(property: (o: this) => T): Observable<T> {
    let path = GetPropertyName(property);
    return this._subject.pipe(
      filter(x => {
        //let prop = property.arguments[0];
        return x === path;
      }),
      map(x => {
        return this[x] as T;
      })
    );
  }

  WhenPropertyChanges<T>(): Observable<this> {
    return this._subject.pipe(
      map(x => {
        return this;
      })
    );
  }

  /**
   *
   */
  constructor() {
    //this._subject = new Subject<string>();
    this.InitializeReativePropertie()
  }

  public WithValue(valueFn: (model: this) => void): this {
    valueFn(this);
    return this;
  }

  InitializeReativePropertie() {
    const fields = this.ReactiveFields;
    if (fields != undefined) {
      fields.forEach(field => {
        this.CreateReactiveProperty(field as string);
      });
    }
    // forEach(fields, (a, b) => {
    //   this.setupProperty(a as string);
    // });
  }

  private CreateReactiveProperty(name: string): void {
    this[name + "__"] = this[name];
    delete this[name];

    var getter = function() {
      return this[name + "__"];
    };

    var setter = function(newval) {
      var oldValue = this[name + "__"];
      //val = newval;
      this[name + "__"] = newval;
      if (this.NotificationSubject != undefined) {
        this.NotificationSubject.next(name);
      }
    };

    if (!this.hasOwnProperty(name)) {
      Object.defineProperty(this, name, {
        //configurable: true,
        //enumerable: true,
        get: getter,
        set: setter
        //writable:true
      });
      //this.set(name, val);
    }
  }

  private CloneObject() {
    var cloneObj = ModelFactory.Create(Object.getPrototypeOf(this).constructor);
    let ignoreFields = this.IgnoreFields;

    for (var field in Object.getOwnPropertyDescriptors(this)) {
      if (ignoreFields != undefined) {
        if (ignoreFields.indexOf(field) < 0) {
            if (Object.getOwnPropertyDescriptor(this, field).writable) {
                if (this[field] === "object") {
                  cloneObj[field] = this.Clone();
                } else {
                  cloneObj[field] = this[field];
                }
              }
        }
      }
      
    }
    return cloneObj;
  }

  public Clone<TModel>(): TModel {
    return (this.CloneObject() as unknown) as TModel;
  }

  
  //   public Clone<TModel extends ReactiveClassModel>(ctor:ObjectType<TModel>): TModel  {
  //     var cloneObj = ModelFactory.Create(ctor);
  //     for (var attribut in this) {
  //         if (typeof this[attribut] === "object") {
  //             cloneObj[attribut] = this.Clone();
  //         } else {
  //             cloneObj[attribut] = this[attribut];
  //         }
  //     }
  //     return cloneObj;
  // }

  //       /**
  //    * Gets the value of the given property from this object.
  //    * @param property The name of the property whose value should be retrieved.
  //    */
  //   public get<T>(property: string | ((vm: this) => T)): T | any {
  //     let evaluated = ReactiveClassModel.evaluateLambdaOrString(this, property);
  //     if (evaluated.children.length === 1) {
  //       return ReactiveClassModel.getReactiveProperty(this, evaluated.property);
  //     } else {
  //       return ReactiveClassModel.getDeepProperty(this, evaluated);
  //     }
  //   }
  //   /**
  //    * Sets the value of the given property on this object and emits the "propertyChanged" event.
  //    * @param property The name of the property to change.
  //    * @param value The value to give the property.
  //    */
  //   public set<T>(property: string | ((vm: this) => T), value: T): void {
  //     ReactiveClassModel.traverse(
  //       this,
  //       property,
  //       evaluated => {
  //         ReactiveClassModel.setReactiveProperty(this, evaluated.property, value);
  //       },
  //       evaluated => {
  //         ReactiveClassModel.setDeepProperty(this, evaluated, value);
  //       }
  //     );
  //   }

  //   private static evaluateLambdaOrString<TObj>(obj: TObj, expression: string | ((o: TObj) => any)) {
  //     let property: string;
  //     if (typeof expression === 'function') {
  //       property = ReactiveClassModel.evaluateLambdaExpression(obj, expression);
  //     } else {
  //       property = <string>expression;
  //     }
  //     const children = property.split('.');
  //     return { children, property };
  //   }

  //   private static evaluateLambdaExpression<TObj>(obj: TObj, expr: (o: TObj) => any): string {
  //     let path: string[] = [];
  //     let ghost = ReactiveClassModel.buildGhostObject(path);
  //     if (ghost) {
  //       expr(ghost);
  //     } else {
  //         ReactiveClassModel.evaluateLambdaErrors(path, expr);
  //     }
  //     return path.join('.');
  //   }
}
