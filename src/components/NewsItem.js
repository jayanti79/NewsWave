import React from 'react'
import index from "../index.css";

const NewsItem =(props) => {

    

  // render() {
    let {title, source, description,author, imgurl, newsUrl,publishedAt} = props;
    return (
      <div className="card1">
        <div className="card" >
        <img src={!imgurl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeG8eNGIrLcY_4JsLdQS_GmbtCrsh-PvXWaQ&usqp=CAU" : imgurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title} <span className="badge rounded-pill text-bg-danger">{source.name}</span></h5>
          {/* <h5 className="card-author">{author}</h5> */}
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">Published by {!author ? "Unknown": author} on {new Date(publishedAt).toGMTString()}</small></p>
          <a rel="noreference" href={newsUrl} target="blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  // }
}

export default NewsItem