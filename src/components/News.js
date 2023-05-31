import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

 const [articles, setarticles] = useState([]);
 const [loading, setloading] = useState(true);
 const [page, setpage] = useState(1);
 const [totalResults, settotalResults] = useState(0);


   

    const capitalizedFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor(props){
    //     super(props);
    // //     // this.state={
    // //     //     articles: [],
    // //     //     loading: false,
    // //     //     page:1,
    // //     //     totalResults: 0
    // //     // }
    // //     // document.title= `${this.capitalizedFirstLetter(props.category)} - NewsWave`;
        
    //  }


    const updateNews =async ()=>{
        props.setprogress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        //setState({loading: true}); https://newscatcher.p.rapidapi.com/v1/latest_headlines
        setloading(true);
        let data=await fetch(url);
        props.setprogress(30);
        let parsedData = await data.json();
        props.setprogress(70);
        //console.log(parsedData);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false);
        //this.setState({
        //     articles: parsedData.articles,
        //     //totalResults: parsedData.totalResults,
        //     loading:false
        //     // page:1,
        //     // totalResults: 0
            
        //})
        props.setprogress(100);
    }
 
    //used instead on componentDidMount
    useEffect(() => {
        document.title= `${capitalizedFirstLetter(props.category)} - NewsWave`;
     updateNews();
    }, [])
    

    // async componentDidMount(){
    //     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data=await fetch(url);
    //     // let parsedData = await data.json();
    //     // console.log(parsedData);
    //     // this.setState({
    //     //     articles: parsedData.articles,
    //     //     totalResults: parsedData.totalResults,
    //     //     loading:false
    //     // })
    //     this.updateNews();

    // }
     
    // handlePrevClick=async () =>{
    //     // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page-1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data=await fetch(url);
    //     // let parsedData = await data.json();
    //     // //console.log(parsedData);
    //     // //this.setState({articles: parsedData.articles})
    //     // this.setState({
    //     //     page: this.state.page-1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     this.setState({page: this.state.page-1});
    //     this.updateNews();
    // }
    // handleNextClick=async () =>{
    //     // //kitne pages tk jayega
    //     // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize))){

    //     //     let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page+1}&pageSize=${props.pageSize}`;
    //     //     this.setState({loading: true});
    //     //     let data=await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     //this.setState({loading: false});
    //     //     //console.log(parsedData);
    //     //     //this.setState({articles: parsedData.articles})
    //     //     this.setState({
    //     //         page: this.state.page+1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     })
    //     // }
    //     this.setState({page: this.state.page+1});
    //     this.updateNews();
        
    // }
    
    const fetchMoreData = async () => {
        //this.setState({page:this.state.page+1})
        
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        // this.setState({loading: true});
        setpage(page+1);
        setloading(true);
        let data=await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        // this.setState({
        //     articles: articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
            
        //     //loading:false
        // })
      };

//   render() {
    return (
        
      <>
      <h1 className="text-center" style={{marginTop: '75px',fontFamily:"'Oswald', sans-serif;"}} >NewsWave - Top {capitalizedFirstLetter(props.category)} Headlines</h1>
      {/* {loading && <Spinner />} */}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className="container" >
        <div className="row">
        
        
        {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
        
        {articles.map((element)=>{
            return <div className="col-md-4 my-4" key={element.url}>
                <NewsItem 
                title={element.title ? element.title.slice(0,45) : ""}
                author={element.author}
                source={element.source}
                publishedAt={element.publishedAt}
                description={element.description?element.description.slice(0,88):""} 
                imgurl={element.urlToImage}
                newsUrl={element.url}
                />
           </div>
        })}
        
           
           
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark mx-3" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
      
    )
//   }
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}

News.propTypes= {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

}

export default News