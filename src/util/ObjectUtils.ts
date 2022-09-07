import { isEmpty } from "lodash";

export class ObjectUtils {
  public static isEmpty(obj: Object): boolean {
    return isEmpty(obj);
  }
  public static isNotEmpty(obj: Object): boolean {
    return !isEmpty(obj);
  }

  public static isPresentAndEqualsTrue(obj: boolean): boolean {
    return obj && obj === true;
  }
}
