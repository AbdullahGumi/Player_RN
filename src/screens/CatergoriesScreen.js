import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused} from '@react-navigation/native';
import {folders} from '../../assets/folders';

export default function CategoryScreen({navigation, search}) {
  const isFocused = useIsFocused();

  //revert back to portrait mode always
  isFocused && Orientation.lockToPortrait();
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.containerStyles}
        columnWrapperStyle={styles.wrapper}
        data={folders.filter(folder => !folder.includes('thumbnails'))}
        numColumns={2}
        keyExtractor={(_, index) => index}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.push('Videos', {
                folder: item,
              });
            }}
            style={styles.button}
            key={index}>
            <Text style={styles.text}>{item.toUpperCase()}</Text>
          </TouchableOpacity>
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
  containerStyles: {
    marginHorizontal: Dimensions.get('screen').width > 360 ? 50 : 0,
    padding: 10,
  },
  wrapper: {justifyContent: 'space-between'},
  button: {
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: Dimensions.get('screen').width > 360 ? 10 : 0,
    width: '45%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {textAlign: 'center'},
});
