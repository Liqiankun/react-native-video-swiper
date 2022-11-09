import {template} from '@babel/core';
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');
const VIEWABILITY_CONFIG = {
  viewAreaCoveragePercentThreshold: 80,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          video: require('./videos/video_0.mp4'),
        },
        {
          video: require('./videos/video_1.mp4'),
        },
        {
          video: require('./videos/video_2.mp4'),
        },
      ],
      isPause: false,
      current: 0,
    };
    this.renderItem = this.renderItem.bind(this);
    this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          horizontal={false}
          pagingEnabled={true}
          getItemLayout={(data, index) => {
            return {length: height, offset: height * index, index};
          }}
          keyExtractor={(item, index) => index.toString()}
          viewabilityConfig={VIEWABILITY_CONFIG}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={this._onViewableItemsChanged}
        />
      </View>
    );
  }

  _onViewableItemsChanged({viewableItems}) {
    if (viewableItems.length === 1) {
      this.setState({
        current: viewableItems[0].index,
        isPause: false,
      });
    }
  }

  renderItem({item, index}) {
    return (
      <View style={{width: width, height: height}}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={() => {
            this.setState({
              isPause: !this.state.isPause,
            });
          }}>
          <Video
            source={item.video}
            style={styles.container}
            repeat={true}
            paused={index === this.state.current ? this.state.isPause : true}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
        {this.state.isPause && (
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({
                isPause: !this.state.isPause,
              });
            }}>
            <Image
              style={styles.playButton}
              source={require('./image/play.png')}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRightBn: {
    width: 50,
    height: 50,
    marginTop: 20,
  },
  bottomRightImage: {
    width: 30,
    height: 30,
  },
  bottomRightText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  playButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    left: (width - 40) / 2,
    top: (height - 40) / 2,
  },
});

export default App;
