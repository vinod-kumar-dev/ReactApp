import { Dispatch } from 'redux';
import * as actionTypes from "./actionTypes"
import { ThunkResult } from '../type';
import { IArticle, ArticleAction } from '../type'; 
// export function addArticle(article: IArticle): ThunkResult<void> {
//   const action: ArticleAction = {
//     type: actionTypes.ADD_ARTICLE,
//     article,
//   };

//   return simulateHttpRequest(action);
// }
export function addArticle(article: IArticle): ThunkResult<void> {
  const action: ArticleAction = {
    type: actionTypes.ADD_ARTICLE,
    article,
  };

  return simulateHttpRequest(action);
}

export function removeArticle(article: IArticle): ThunkResult<void> {
  const action: ArticleAction = {
    type: actionTypes.REMOVE_ARTICLE,
    article,
  };

  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: ArticleAction): ThunkResult<void> {
  return (dispatch: Dispatch<ArticleAction>) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
