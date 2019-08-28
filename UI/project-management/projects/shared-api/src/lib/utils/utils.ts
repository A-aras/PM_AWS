export function IsNullOrEmpty<T extends any>(value: T): boolean {
    if (value === undefined || value === null) return true;
    if (((value as unknown) as string) === "") {
      return true;
    }
    return false;
  }
  