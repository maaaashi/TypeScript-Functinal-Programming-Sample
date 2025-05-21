import type { Articles } from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import { tryCatch, type TaskEither } from "fp-ts/TaskEither";

export const searchArticlesUsecase: (
  cond: ValidateSearchCondition
) => TaskEither<Error, Articles> = () =>
  tryCatch(
    async () => {
      throw new Error("");
    },
    (e) => new Error("")
  );
