// export function GetPropertyName<TModel>(expression: Function): string {
//   return /\.([^\.;]+);?\s*\}$/.exec(expression.toString())[1];
// }


export function GetPropertyName<TModel>(expression: (x:TModel)=>any): string {
    const t=evilMagic(expression);
    return t.toString();
  //return /\.([^\.;]+);?\s*\}$/.exec(expression.toString())[1];
}

type ValueOf<T> = T[keyof T];
function evilMagic<T, V extends T[keyof T]>(
  f: (x: T) => V
): ValueOf<{ [K in keyof T]: T[K] extends V ? K : never }>;
function evilMagic(f: (x: any) => any): keyof any {
  var p = new Proxy(
    {},
    {
      get(target, prop) {
        return prop;
      }
    }
  );
  return f(p);
}
