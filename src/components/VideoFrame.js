import React from 'react';
import {Text, Image, TouchableOpacity, View, Dimensions} from 'react-native';
import * as thumbnails from '../../assets/thumbnailsIndex';

const VideoFrame = ({navigation, item}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('Video', {
          video: item,
        });
      }}
      style={{
        position: 'relative',
        marginTop: 10,
        marginBottom: Dimensions.get('screen').width > 360 ? 10 : 0,
        width: '45%',
        height: 150,
      }}>
      <View
        style={{
          position: 'absolute',
          textAlignVertical: 'bottom',
          fontSize: 13,
          backgroundColor: 'black',
          opacity: 0.8,
          padding: 4,
          width: '100%',
          bottom: 0,
          zIndex: 10,
        }}>
        <Text
          style={{
            fontSize: 13,
            color: 'white',
          }}
          numberOfLines={2}>
          {item[0].replaceAllTxt('_', ' ')}
        </Text>
      </View>
      <Image
        source={thumbnails[`${item[0]}_thumbnail`]}
        style={{
          width: '100%',
          backgroundColor: 'black',
          height: 150,
        }}
      />
    </TouchableOpacity>
  );
};

export default VideoFrame;
