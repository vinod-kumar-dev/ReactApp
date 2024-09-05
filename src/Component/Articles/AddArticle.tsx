import * as React from "react"
import { IArticle } from '../../type';
import { useNavigate } from 'react-router-dom';

type Props = {
  saveArticle: (article: IArticle | any) => void
}

export const AddArticle: React.FC<Props> = ({ saveArticle }) => {
  const navigate = useNavigate();
  const [article, setArticle] = React.useState<IArticle| {}>({
    id: '', // Default values or handle properly if not provided
    title: '',
    body: '',
  });

  const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
    setArticle({
      ...article,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  
  const addNewArticle = (e: React.FormEvent) => {
    e.preventDefault()
    saveArticle(article)
    navigate('/articles');
  }

  return (
    <form onSubmit={addNewArticle} className="Add-article">
      <input
        type="text"
        id="title"
        placeholder="Title"
        onChange={handleArticleData}
      />
      <input
        type="text"
        id="body"
        placeholder="Description"
        onChange={handleArticleData}
      />
      <button disabled={article === undefined ? true : false}>
        Add article
      </button>
    </form>
  )
}
export default AddArticle