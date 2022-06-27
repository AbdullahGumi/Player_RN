/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import './ignoreWarnings';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VideosScreen from './src/screens/VideosScreen';
import VideoScreen from './src/screens/VideoScreen';
import {Image, TextInput, View} from 'react-native';
import CatergoriesScreen from './src/screens/CatergoriesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [search, setSearch] = useState('');
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Catergories"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4c4c4c',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Videos"
          options={{
            headerTitle: () => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('./assets/search.png')}
                  style={{width: 25, height: 25, marginRight: 15}}
                />

                <TextInput
                  style={{flex: 1}}
                  placeholder="Search videos"
                  underlineColorAndroid="transparent"
                  onChangeText={e => setSearch(e)}
                />
              </View>
            ),
          }}>
          {props => <VideosScreen {...props} search={search} />}
        </Stack.Screen>
        <Stack.Screen name="Video" component={VideoScreen} />
        <Stack.Screen name="Catergories" component={CatergoriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
