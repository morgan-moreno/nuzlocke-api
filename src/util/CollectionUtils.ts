import { isEmpty } from "lodash";

export class ArrayUtils {
  public static isEmpty(arr: Array<any>): boolean {
    return isEmpty(arr);
  }
  public static isNotEmpty(arr: Array<any>): boolean {
    return !isEmpty(arr);
  }
}
