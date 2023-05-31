import './App.css';

import React,{useState} from 'react'
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import News from './components/News';
//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App=()=> {

  const pageSize=6;
  const apiKey=process.env.REACT_APP_NEWS_API;
  const [progress, setprogress] = useState(0);
  
  
  //method for loading bar
  // state = {
  //   progress:0
  // }
  // setProgress=(progress)=>{
  //   this.setState({progress: progress})
  // }
  // render() {
    
    return (
      <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        {/* <News pageSize={this.pageSize} country="in" category="" /> */}
        <Routes >
          <Route exact path="/" element={<News setprogress={setprogress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />}></Route>
          <Route exact path="/business" element={<News setprogress={setprogress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News setprogress={setprogress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />}></Route>
          {/* <Route exact path="/general" element={<News setprogress={setprogress} key="general" pageSize={pageSize} country="in" category="general" />}></Route> */}
          <Route exact path="/health" element={<News setprogress={setprogress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />}></Route>
          <Route exact path="/science" element={<News setprogress={setprogress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />}></Route>
          <Route exact path="/sports" element={<News setprogress={setprogress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />}></Route>
          <Route exact path="/technology" element={<News setprogress={setprogress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />}></Route>
      </Routes>
        </BrowserRouter>
      </div>
    );
  // }
}
export default App;