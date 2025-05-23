import type { Articles } from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import { tryCatch, type TaskEither } from "fp-ts/lib/TaskEither.js";

export const searchArticlesUsecase: (
  cond: ValidateSearchCondition
) => TaskEither<Error, Articles> = () =>
  tryCatch(
    async () => {
      throw new Error("いい感じのエラーです");
    },
    (e) => {
      if (e instanceof Error) {
        return e;
      }
      return new Error("予期せぬエラーです");
    }
  );
