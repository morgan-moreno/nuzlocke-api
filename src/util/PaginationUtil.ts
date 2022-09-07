import { PaginationParams } from "../types/domain/PaginationParams";

export interface TypeormPaginationParams {
  skip: number;
  limit: number;
}

export class PaginationUtil {
  public static parseParams(params: PaginationParams): TypeormPaginationParams {
    const { page, limit } = params;
    let results: TypeormPaginationParams = {
      skip: 0,
      limit: 25,
    };

    // If a limit is provided, replace the default limit value
    if (limit) {
      results.limit = Number(limit);
    }

    // If a page is provided, replace the default skip value
    // * Since limit is set first, using `results.limit` will always yeild the correct skip
    // * regardless of whether or not `params.limit` is provided
    if (page) {
      results.skip = Number(page) * results.limit;
    }

    return results;
  }
}
