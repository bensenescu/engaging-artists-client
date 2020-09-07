import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import ArtistTable from './components/artist-table/artist-table';
import SearchForm from './components/search-form/search-form';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_params: {
        min_followers: 0,
        max_followers: 0,
        min_engagement_rate: 0
      },
    };

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick({min_followers, max_followers, min_engagement_rate}) {
    const engagement_rate = (min_engagement_rate / 100).toFixed(2);

    this.setState({search_params: {
      min_followers,
      max_followers,
      min_engagement_rate: engagement_rate
    }});
  }
 
  render(){
    const formPadding = {
      paddingTop: '4em'
    };

    return (
      <div className="App">
        <div className="left-section">
          <p className="sub-header">ARTIST FINDER</p>
          <p className="main-title">Find musicians with your desired engagement</p>
          <p className="sub-title">from the most popular playlists</p>
          <div style={formPadding}>
            <SearchForm handleClick={this.handleClick}/>
          </div>
          
        </div>
        <div className="right-section">
          <ArtistTable search_params={this.state.search_params}></ArtistTable>
        </div>
      </div>
    );
    
  } 
}

export default App;
