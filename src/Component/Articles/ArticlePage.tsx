import * as React from "react"
import Article from './Article';
import { removeArticle as removeArticleAction} from '../../store/actionCreators';
import { IArticle } from '../../type';
import { useDispatch,useSelector } from 'react-redux';
import reducer from './../../store/reducer';

export const ArticlePage: React.FC = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: ReturnType<typeof reducer>) => state.articles);

  // Correctly type the article parameter and dispatch function
  const removeArticle = (article: IArticle) => dispatch(removeArticleAction(article));

  return (
    <div>
      {articles.map(article => (
        <Article key={article.id} article={article} removeArticle={removeArticle} />
      ))}
    </div>
  );
};
export default ArticlePage;