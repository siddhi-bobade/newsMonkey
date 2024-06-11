import React from 'react'

const NewsItem =(props)=> {
  
  
    let {title,description,imageUrl,newsUrl,author,date,source} =props;
    return (
      <div className='my-3'>
       <div className="card" >
       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:"90%" , zIndex:1}}>{source}</span>
  <img src={!imageUrl?"https://www.livemint.com/lm-img/img/2024/05/23/1600x900/Awfis_Space_Solutions_IPO_1715828750852_1716444238864.png":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}... </h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel='noreferrer' target="_blank" className="btn  btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsItem

