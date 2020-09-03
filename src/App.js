import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import ArtistTable from './components/artist-table/artist-table';
import SearchForm from './components/search-form/search-form';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="left-section">
        <p class="sub-header">ARTIST FINDER</p>
        <p class="main-title">Find musicians with your desired engagement</p>
        <p class="sub-title">from the most popular playlists</p>
        <SearchForm />
      </div>
      <div className="right-section">
        <ArtistTable></ArtistTable>
      </div>
    </div>
  );
}

export default App;
