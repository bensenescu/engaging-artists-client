import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';

import { Table } from 'antd';

const ArtistTable = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    firebase.collection('artists')
      .where("followers", ">",  1000)
      .where("followers", "<", 5000)
      .get()
      .then((res) => {
        console.log(res)
        const { docs } = res;

        if (docs.empty) console.error('No artists fit this description.')

        const engagingArtists = docs.filter((doc) => doc.engagement_rate < 0.05);

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
        console.log(engagingArtistsFormatted)

        setArtists(engagingArtistsFormatted);
      })
      .catch((err) => console.error(err));
  })

  const columns = [
    {
      title: 'Soundcloud Name',
      dataIndex: 'soundcloud_name',
      key: 'soundcloud_name',
    },
    {
      title: 'Instagram Link',
      dataIndex: 'ig_handle',
      key: 'ig_handle',
      render: (text, record) => (
        <a href={`https://www.instagram.com/${record.ig_handle}`}>{record.ig_handle}</a>
      )
    },
    {
      title: 'IG Posts',
      dataIndex: 'media_uploads',
      key: 'media_uploads',
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      key: 'followers',
    },
    {
      title: 'Engagement Rate',
      dataIndex: 'engagement_rate',
      key: 'engagement_rate',
    },
    {
      title: 'Engaged Fans',
      dataIndex: 'engaged_fans',
      key: 'engaged_fans',
    }
  ];

  return (
    <Table dataSource={artists} columns={columns} />
  )
}

export default ArtistTable;