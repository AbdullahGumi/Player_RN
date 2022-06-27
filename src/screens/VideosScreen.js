import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import * as videos from '../../assets/videosIndex';
import VideoFrame from '../components/VideoFrame';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';

export default function VideosScreen({
  navigation,
  search,
  route: {params: folder},
}) {
  const isFocused = useIsFocused();

  //revert back to portrait mode always
  isFocused && Orientation.lockToPortrait();
  return (
    <View style={styles.container}>
      <FlatList
        initialNumToRender={10}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.wrapper}
        data={Object.entries(videos).filter(item => {
          if (
            item[0].startsWith(folder.folder.toUpperCase()) &&
            item[0]
              .split(folder.folder.toUpperCase())[1]
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            if (item[0].includes(folder.folder.toUpperCase())) {
              return item;
            }
          }
        })}
        numColumns={2}
        keyExtractor={(_, index) => index}
        ListEmptyComponent={
          <Text style={styles.emptyComponent}>not found</Text>
        }
        renderItem={({item, index}) => (
          <VideoFrame
            key={index}
            folderName={folder}
            item={item}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#323232',
    height: '100%',
  },
  contentContainer: {
    marginHorizontal: Dimensions.get('screen').width > 360 ? 50 : 0,
    padding: 10,
  },
  wrapper: {justifyContent: 'space-between'},
  emptyComponent: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    height: '100%',
    textAlignVertical: 'center',
  },
});
