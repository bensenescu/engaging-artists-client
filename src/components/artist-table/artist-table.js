import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';

import { Table } from 'antd';

function ArtistTable(props) {
  const [artists, setArtists] = useState([]);
  
  useEffect(() => {
    firebase.collection('artists')
      .where("followers", ">", props.searchParams.minFollowers)
      .where("followers", "<", props.searchParams.maxFollowers)
      .limit(100)
      .get()
      .then((res) => {
        if (res.empty) console.error('No artists fit this description.')

        const { docs } = res;

        const engagingArtists = []
        docs.forEach((doc) => {
          if (doc.data().engagement_rate > props.searchParams.minEngagementRate) {
            engagingArtists.push(doc.data())
          }
        })

        const engagingArtistsFormatted = formatFirebaseData(engagingArtists);

        setArtists(engagingArtistsFormatted);
      })
      .catch((err) => console.error(err));
  }, [props.searchParams])

  const formatFirebaseData = (artists) => {
    return artists.map(({
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
  }

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
    <Table dataSource={artists} columns={columns} />
  ) 
}

export default ArtistTable;