import * as actionTypes from "./actionTypes"
 import { ArticleState, ArticleAction,IArticle } from '../type';
import { v4 as uuidv4 } from 'uuid';

const initialState: ArticleState = {
  articles: [
    {
      id: uuidv4(),
      title: "post 1",
      body:
        "Quisque cursus, metus vitae pharetra Nam libero tempore, cum soluta nobis est eligendi",
    },
    {
      id: uuidv4(),
      title: "post 2",
      body:
        "Harum quidem rerum facilis est et expedita distinctio quas molestias excepturi sint",
    },
  ],
}
const reducer = (
    state: ArticleState = initialState,
    action: ArticleAction
  ): ArticleState => {
    switch (action.type) {
      case actionTypes.ADD_ARTICLE:
        const newArticle: IArticle = {
          id: uuidv4(), // not really unique
          title: action.article.title,
          body: action.article.body,
        }
       var art = state.articles.concat(newArticle)
        return {
          ...state,
          articles: art,
        }
      case actionTypes.REMOVE_ARTICLE:
        const updatedArticles = state.articles.filter(
          (article)  => article.id !== action.article.id
        )
        
        return {
          ...state,
          articles: updatedArticles,
        }
        default:
      return state;
    }
    return state
  }
  
  export default reducer