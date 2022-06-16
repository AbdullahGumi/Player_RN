import React, {useEffect, useState, useRef} from 'react';
import Video from 'react-native-video';
import {StyleSheet, View, Platform, Dimensions} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';
export default function VideoScreen({route, navigation}) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);

  // This function is triggered when the user released the player slider.
  const onSeek = seek => {
    videoPlayer?.current.seek(seek);
  };

  // This function is triggered when the user interact with the player slider.
  const onSeeking = currentVideoTime => setCurrentTime(currentVideoTime);

  // This function is triggered when the play/pause button is pressed.
  const onPaused = newState => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  /**
   * This function is triggered when the replay button is pressed.
   * There is a minmial bug on Android devices that does not allow the player to replay the video if changing the state to PLAYING, so we have to use the 'Platform' to fix that.
   */
  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  // This function is triggered while the video is playing.
  const onProgress = data => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  /**
   * This function and the next one allow us doing something while the video is loading.
   * For example we could set a preview image while this is happening.
   */
  const onLoad = data => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  // This function is triggered when the player reaches the end of the media.
  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  // useState hook to check if the video player is on fullscreen mode

  // This function is triggered when the user press on the fullscreen button or to come back from the fullscreen mode.
  const onFullScreen = () => {
    if (!isFullScreen) {
      navigation.setOptions({headerShown: false});
      Orientation.lockToLandscape();
    } else {
      if (Platform.OS === 'ios') {
        Orientation.lockToPortrait();
      }
      Orientation.lockToPortrait();
      navigation.setOptions({headerShown: true});
    }
    setIsFullScreen(!isFullScreen);
  };
  const {video} = route.params;
  String.prototype.replaceAllTxt = function replaceAll(search, replace) {
    return this.split(search).join(replace);
  };
  useEffect(() => {
    navigation.setOptions({
      title: video[0].replaceAllTxt('_', ' '),
    });
  }, [video]);

  const videoPlayer = useRef(null);
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: isFullScreen ? 50 : 0,
        backgroundColor: 'black',
      }}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        posterResizeMode={'cover'}
        onProgress={onProgress}
        paused={paused}
        ref={ref => (videoPlayer.current = ref)}
        resizeMode={isFullScreen ? 'none' : 'cover'}
        source={video[1]}
        style={{height: isFullScreen ? '100%' : 250, width: '100%'}}
      />
      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        progress={currentTime}
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        mainColor={'black'}
        playerState={playerState}
        style={{height: isFullScreen ? '100%' : 250, width: '100%'}}
        sliderStyle={
          isFullScreen && {
            containerStyle: styles.mediaControls,
          }
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mediaControls: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  backgroundVideoFullScreen: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
});
