import React, { useState, useEffect } from 'react';
import NewsItem from '../components/news/NewsItem';

interface NewsSource {
  id: string | null;
  name: string;
}

interface NewsArticle {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: NewsSource;
  title: string;
  url: string;
  urlToImage: string;
}

const App: React.FC = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {news.map((article, index) => (
          <div className="col-md-4" key={index}>
            <NewsItem
              title={article.title}
              description={article.description}
              imgUrl={article.urlToImage}
              newsUrl={article.url}
              author={article.author ?? ""}
              date={article.publishedAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
