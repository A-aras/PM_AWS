
export function GetPropertyName<TModel>(expression: Function): string {
    
    return /\.([^\.;]+);?\s*\}$/.exec(expression.toString())[1];

}