export class StringUtils {
  public static isEmpty(str: string): boolean {
    return !str || str.length === 0;
  }
  public static isNotEmpty(str: string): boolean {
    return str && str.length > 0;
  }
}
