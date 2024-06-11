
// import { useEffect, useState } from 'react';
// import NewsItem from './NewsItem';
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";

// const News =(props)=> {
//   const [articles,setArticles]=useState([]);
//   const [loading,setloading]=useState(false);
//   const [page,setPage]=useState(1);
//   const [totalResults,settotalResults]=useState(0);
//   // document.title = `${this.capitilizeFirstLetter(props.category)}-NewsMonkey`;

//  const  capitilizeFirstLetter = (string) => {
//     return string && string.charAt(0).toUpperCase() + string.slice(1)
//   }

// useEffect(()=>{
//   updateNews();

// },[])
 

//    const updateNews = async (page = 1) => {
//     props.setProgress(10);
//     const { country, category, pageSize } = props;
//     let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=475c33284f304fb9aa816ad44cd2aa8f&page=${page}&pageSize=${pageSize}`;
//   setloading( true );
//     try {
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       setArticles(parsedData.articles)
//       settotalResults(parsedData.totalResults)
//       setloading(false)
//       // setPage(nextPage)
//     } catch (error) {
//       console.error("Error fetching the articles: ", error);
//       setloading(false);
//     }
//     props.setProgress(100);
//   }

//    const fetchMoreData = async () => {
//     const { country, category, pageSize } = props;
//     setPage(page+1)
  
//     let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=475c33284f304fb9aa816ad44cd2aa8f&page=${Page+1}&pageSize=${pageSize}`;
//     setloading(true);
//     try {
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       setArticles(parsedData.articles)
//       settotalResults(parsedData.totalResults)
//       setloading(false)
//       // setPage(nextPage)
      
//     } catch (error) {
//       console.error("Error fetching the articles: ", error);
//       setloading(false);
//     }
//   };

//     return (
//      <>
//         <h1 className="text-center" style={{ margin: "35px" }}>NewsMonkey - Top Headlines</h1>
//         <hr />
//         <InfiniteScroll
//           dataLength={articles.length}
//           next={fetchMoreData}
//           hasMore={articles.length !== totalResults}
//           loader={<Spinner />}
//         >
//           <div className="container">
//             <div className="row">
//               {articles.map((element) => {
//                 return (
//                   <div className="col-md-4" key={element.url}>
//                     <NewsItem
//                       title={element.title ? element.title.slice(0, 50) : ""}
//                       description={element.description ? element.description.slice(0, 90) : ""}
//                       imageUrl={element.urlToImage}
//                       newsUrl={element.url}
//                       author={element.author}
//                       date={element.publishedAt}
//                       source={element.source.name} />
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </InfiniteScroll>
//       </>
//     )
  
// }
// News.defaultProps = {
//   country: 'in',
//   pageSize: 6,
//   category: 'general'
// }

// News.propTypes = {
//   country: PropTypes.string,
//   pageSize: PropTypes.number,
//   category: PropTypes.string
// }

// export default News;


import { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const capitilizeFirstLetter = (string) => {
    return string && string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    document.title = `${capitilizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();

    // eslint-disable-next-line

  },[])

  const updateNews = async (page = 1) => {
    props.setProgress(10);
    const { country, category, pageSize } = props;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=475c33284f304fb9aa816ad44cd2aa8f&page=${page}&pageSize=${pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setPage(page);
    } catch (error) {
      console.error("Error fetching the articles: ", error);
      setLoading(false);
    }
    props.setProgress(100);
  }

  const fetchMoreData = async () => {
    const { country, category, pageSize } = props;
    const nextPage = page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=475c33284f304fb9aa816ad44cd2aa8f&page=${nextPage}&pageSize=${pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching the articles: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "35px", marginTop:"90px" }}>NewsMonkey - Top Headlines</h1>
      <hr />
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={element.description ? element.description.slice(0, 90) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name} />
                </div>
              )
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func
}

export default News;

