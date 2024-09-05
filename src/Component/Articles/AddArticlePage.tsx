import * as React from "react"
import AddArticle from './AddArticle';
import { addArticle } from './../../store/actionCreators';
import { useDispatch } from 'react-redux';
import { IArticle } from '../../type';

export const AddArticlePage: React.FC = () => {
  const dispatch = useDispatch();

  // Correctly type the article parameter and dispatch function
  const saveArticle = (article: IArticle) => dispatch<any>(addArticle(article));

  return <AddArticle saveArticle={saveArticle} />;
};

export default AddArticlePage;