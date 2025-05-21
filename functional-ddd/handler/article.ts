import type { Context } from "hono";
import {
  UnValidateSearchCondition,
  ValidateSearchCondition,
} from "../domain/SearchCondition.js";

export const searchArticlesHandler = async (c: Context) => {
  const { query, limit, offset, sort } = c.req.query();
  const unvalidateSearchCondition = new UnValidateSearchCondition(
    query,
    +limit,
    +offset,
    sort
  );
  const validateSearchCOndition = ValidateSearchCondition.apply(
    unvalidateSearchCondition
  );

  return c.json({
    articles: [],
  });
};
