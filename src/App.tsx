import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
// @ts-ignore
import ArtistTable from './components/artist-table/artist-table.tsx';
// @ts-ignore
import SearchForm from './components/search-form/search-form.tsx';
import { ISearchParams } from './ts/interfaces';

function App() {
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    minFollowers: 0,
    maxFollowers: 0,
    minEngagementRate: 0
  })
  
  const handleClick = (searchParams: ISearchParams) => {
    const engagementRate = parseFloat((searchParams.minEngagementRate / 100).toFixed(2));

    setSearchParams({
      minFollowers: searchParams.minFollowers,
      maxFollowers: searchParams.maxFollowers,
      minEngagementRate: engagementRate,
    });
  }

  return (
    <div className="App">
      <div className="left-section">
        <p className="sub-header">ARTIST FINDER</p>
        <p className="main-title">Find musicians with your desired engagement</p>
        <p className="sub-title">from the most popular playlists</p>
        <div style={{paddingTop: '4em'}}>
          <SearchForm handleClick={handleClick}/>
        </div>
      </div>
      <div className="right-section">
        <ArtistTable searchParams={searchParams}></ArtistTable>
      </div>
    </div>
  );
}

export default App;
