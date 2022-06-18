import React from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import * as videos from '../../assets/videosIndex';
import VideoFrame from '../components/VideoFrame';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';

export default function HomeScreen({navigation, search}) {
  const isFocused = useIsFocused();
  String.prototype.replaceAllTxt = function replaceAll(search, replace) {
    return this.split(search).join(replace);
  };
  //revert back to portrait mode always
  isFocused && Orientation.lockToPortrait();
  return (
    <View
      style={{
        backgroundColor: '#323232',
        height: '100%',
      }}>
      <FlatList
        initialNumToRender={10}
        contentContainerStyle={{
          marginHorizontal: Dimensions.get('screen').width > 360 ? 50 : 0,
          padding: 10,
        }}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={Object.entries(videos).filter(item => item[0].includes(search))}
        numColumns={2}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              textAlign: 'center',
              height: '100%',
              textAlignVertical: 'center',
            }}>
            not found
          </Text>
        }
        renderItem={({item, index}) => (
          <VideoFrame key={index} item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
