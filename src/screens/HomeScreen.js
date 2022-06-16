import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import * as videos from '../../assets/videosIndex';
import VideoFrame from '../components/VideoFrame';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  const isFocused = useIsFocused();
  String.prototype.replaceAllTxt = function replaceAll(search, replace) {
    return this.split(search).join(replace);
  };
  //revert back to portrait mode always
  isFocused && Orientation.lockToPortrait();
  return (
    <FlatList
      initialNumToRender={10}
      contentContainerStyle={{
        backgroundColor: '#323232',
        padding: 10,
      }}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      data={Object.entries(videos)}
      numColumns={2}
      keyExtractor={(_, index) => index}
      renderItem={({item, i}) => (
        <VideoFrame key={i} item={item} navigation={navigation} />
      )}
    />
  );
}
