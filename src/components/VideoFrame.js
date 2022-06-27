import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as thumbnails from '../../assets/thumbnailsIndex';

const VideoFrame = ({navigation, item, folderName}) => {
  String.prototype.replaceAllTxt = function replaceAll(search, replace) {
    return this.split(search).join(replace);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('Video', {
          video: {item, folderName},
        });
      }}
      style={styles.container}>
      <View style={styles.frame}>
        <Text style={styles.text} numberOfLines={2}>
          {/* {Remove folder name} */}
          {item[0]
            .split(folderName.folder.toUpperCase())[1]
            .replaceAllTxt('_', ' ')}
        </Text>
      </View>
      <Image source={thumbnails[`${item[0]}_thumbnail`]} style={styles.image} />
    </TouchableOpacity>
  );
};

export default VideoFrame;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 10,
    marginBottom: Dimensions.get('screen').width > 360 ? 10 : 0,
    width: '45%',
    height: 150,
  },
  frame: {
    position: 'absolute',
    textAlignVertical: 'bottom',
    fontSize: 13,
    backgroundColor: 'black',
    opacity: 0.8,
    padding: 4,
    width: '100%',
    bottom: 0,
    zIndex: 10,
  },
  text: {
    fontSize: 13,
    color: 'white',
  },
  image: {
    width: '100%',
    backgroundColor: 'black',
    height: 150,
  },
});
