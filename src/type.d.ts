// type.d.ts
interface IArticle {
  id: string;
  title: string;
  body: string;
}

type ArticleState = {
  articles: IArticle[];
};

type ArticleAction =
  | { type: typeof ADD_ARTICLE; article: IArticle }
  | { type: typeof REMOVE_ARTICLE; article: IArticle };

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

// Thunk action type for asynchronous operations
import { ThunkAction } from 'redux';
export type ThunkResult<R> = ThunkAction<R, ArticleState, undefined, ArticleAction>;
