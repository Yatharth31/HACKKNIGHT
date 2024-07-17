import React from 'react';

interface NewsItemProps {
  title: string;
  description: string;
  imgUrl?: string;
  newsUrl: string;
  author?: string;
  date: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, description, imgUrl, newsUrl, author, date }) => {
  return (
    <div className='my-3'>
      <div className="card">
        <img
          src={imgUrl ? imgUrl : "https://economictimes.indiatimes.com/thumb/msid-102698198,width-1070,height-580,imgsize-88698,overlay-etmarkets/photo.jpg"}
          className="card-img-top"
          alt={title}
        />
        <div className="card-body">
          <h5 className="card-title"><strong>{title}...</strong></h5>
          <p className="card-text"><em>{description}...</em></p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author ? author : "Unknown"} on {new Date(date).toLocaleDateString()}
            </small>
          </p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="my-2 mx-2 btn btn-sm btn-dark">
            Read More
          </a>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light">
            Summarize
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
