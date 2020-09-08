import React, { useState, useEffect } from 'react';
import db from '../../firebase.tsx';
import { Table } from 'antd';
import { ISearchParams, IArtist } from '../../ts/interfaces'

import * as firebase from 'firebase/app';

interface PropTypes {
  searchParams: ISearchParams
}

function ArtistTable(props: PropTypes) {
  const [artists, setArtists] = useState<Array<IArtist>>([]);
  
  useEffect(() => {
    db.collection('artists')
      .where("followers", ">", props.searchParams.minFollowers)
      .where("followers", "<", props.searchParams.maxFollowers)
      .limit(100)
      .get()
      .then((res: firebase.firestore.DocumentData) => {
        if (res.empty) console.error('No artists fit this description.')

        const { docs } = res;

        const engagingArtists: Array<firebase.firestore.DocumentData> = []
        
        docs.forEach((doc: firebase.firestore.DocumentData) => {
          if (doc.data().engagement_rate > props.searchParams.minEngagementRate) {
            engagingArtists.push(doc.data())
          }
        })

        const engagingArtistsFormatted = formatFirebaseData(engagingArtists);

        setArtists(engagingArtistsFormatted);
      })
      .catch((err: any) => console.error(err));
  }, [props.searchParams])

  const formatFirebaseData = (artists: Array<firebase.firestore.DocumentData>) => {
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
    }): IArtist => {
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

  const columns : any = [
    {
      title: 'Soundcloud Name',
      dataIndex: 'soundcloud_name',
    },
    {
      title: 'Instagram Link',
      dataIndex: 'ig_handle',
      render: (text: string, record: any) => (
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
        compare: (a: any, b: any) => b.followers - a.followers
      },
    },
    { 
      title: 'Engagement Rate',
      dataIndex: 'engagement_rate',
      sorter: {
        compare: (a: any, b: any) => parseFloat(b.engagement_rate.slice(0, -1)) - parseFloat(a.engagement_rate.slice(0, -1)),
      },
    },
    { 
      title: 'Engaged Fans',
      dataIndex: 'engaged_fans',
      sorter: {
        compare: (a: any, b: any) => b.engaged_fans - a.engaged_fans,
        multiple: 1,
      },
    }
  ];
  
  return (
    <Table dataSource={artists} columns={columns} />
  ) 
}

export default ArtistTable;