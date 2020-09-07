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
        minFollowers: 0,
        maxFollowers: 0,
        minEngagementRate: 0
      },
    };

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick({minFollowers, maxFollowers, minEngagementRate}) {
    const engagement_rate = (minEngagementRate / 100).toFixed(2);
    console.log('clicked')

    this.setState({search_params: {
      minFollowers,
      maxFollowers,
      minEngagementRate: engagement_rate
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
