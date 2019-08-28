export function clearArray<T>(array: T[]) {
    while (array.length) {
      array.pop();
    }
  }

  export function CopyArray<T>(source: T[],dest: T[]) {
    while (source.length) {
        dest.push(source.pop());
    }
  }