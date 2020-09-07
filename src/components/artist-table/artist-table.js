import React from 'react';
import firebase from '../../firebase';

import { Table } from 'antd';

class ArtistTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    }
    this.updateArtists = this.updateArtists.bind(this)
  }

  updateArtists() {
    console.log(this.props.search_params.minFollowers, this.props.search_params.maxFollowers)
    firebase.collection('artists')
      .where("followers", ">", this.props.search_params.minFollowers)
      .where("followers", "<", this.props.search_params.maxFollowers)
      .limit(100)
      .get()
      .then((res) => {
        if (res.empty) console.error('No artists fit this description.')

        const { docs } = res;

        const engagingArtists = []
        docs.forEach((doc) => {
          if (doc.data().engagement_rate > this.props.search_params.minEngagementRate) {
            engagingArtists.push(doc.data())
          }
        })
        
        const engagingArtistsFormatted = engagingArtists.map(({
          avg_comments,
          avg_likes,
          engagement_rate,
          followers,
          following,
          genre,
          ig_handle,
          media_uploads,
          song_listens,
          song_name,
          soundcloud_name,
          timestamp,
        }) => {
          return {
            avg_comments,
            avg_likes,
            engagement_rate: (engagement_rate * 100).toFixed(2) + '%',
            followers,
            following,
            genre: genre?.W_?.H ?? genre,
            ig_handle: ig_handle?.W_?.H ?? ig_handle,
            media_uploads,
            song_listens,
            song_name: song_name?.W_?.H ?? song_name,
            soundcloud_name: soundcloud_name?.W_?.H ?? soundcloud_name,
            timestamp: timestamp?.W_?.H,
            engaged_fans: Math.floor(followers * engagement_rate),
          }
        });

        this.setState({artists: engagingArtistsFormatted});
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.updateArtists()
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.search_params !== prevProps.search_params) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.updateArtists();
    }
  } 

  
  render() {
    const columns = [
      {
        title: 'Soundcloud Name',
        dataIndex: 'soundcloud_name',
      },
      {
        title: 'Instagram Link',
        dataIndex: 'ig_handle',
        render: (text, record) => (
          <a href={`https://www.instagram.com/${record.ig_handle}`}>{record.ig_handle}</a>
        )
      },
      {
        title: 'IG Posts',
        dataIndex: 'media_uploads',
      },
      {
        title: 'Followers',
        dataIndex: 'followers',
        sorter: {
          compare: (a, b) => b.followers - a.followers
        },
      },
      { 
        title: 'Engagement Rate',
        dataIndex: 'engagement_rate',
        sorter: {
          compare: (a, b) => b.engagement_rate - a.engagement_rate,
        },
      },
      { 
        title: 'Engaged Fans',
        dataIndex: 'engaged_fans',
        sorter: {
          compare: (a, b) => b.engaged_fans - a.engaged_fans,
          multiple: 1,
        },
      }
    ];
  
    return (
      <Table dataSource={this.state.artists} columns={columns} />
    ) 
  }
}

export default ArtistTable;