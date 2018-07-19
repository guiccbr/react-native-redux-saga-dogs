// @flow

import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import styles from '../styles/look';
import animations from '../styles/feel';
import { Animated, Button, Text, View, ActivityIndicator } from 'react-native';

type DogSagaAppState = {
  fetching: boolean,
  dog: ?{ uri: string },
  error: ?string,
  imgLoading: boolean,
};

type DogSagaAppProps = {
  ...DogSagaAppState,
  onRequestDog: Function,
  onImgLoaded: Function,
};

class DogSagaApp extends React.Component<DogSagaAppProps> {
  spinValue: Animated.Value;

  constructor(props: DogSagaAppProps) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.spinValue, animations.logo.animProperties)
    ).start();
  }

  render() {
    const {
      fetching,
      dog,
      onRequestDog,
      onImgLoaded,
      error,
      imgLoading,
    } = this.props;

    const imgRotationStyle = {
      transform: [
        { rotate: animations.logo.animInterpolation(this.spinValue) },
      ],
    };

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Animated.Image
              onLoad={onImgLoaded}
              style={[
                imgLoading ? styles.logoHidden : styles.logo,
                imgRotationStyle,
              ]}
              source={dog || logo}
            />
            <ActivityIndicator
              style={imgLoading ? styles.activity : styles.activityHidden}
              size="small"
            />
          </View>
          <Text style={styles.headerText}>Welcome to Dog Saga</Text>
        </View>
        <View style={styles.bodyContainer}>
          {(!imgLoading && dog) || dog ? (
            <Text style={styles.bodyText}>Keep clicking for new dogs</Text>
          ) : (
            <Text style={styles.bodyText}>
              Replace the React icon with a dog!
            </Text>
          )}
          <Button
            onPress={onRequestDog}
            title={fetching ? 'Fetching...' : 'Request a Dog'}
            disabled={fetching ? true : false}
          />
          <Text style={error ? styles.error : styles.errorHidden}>
            Uh oh - something went wrong!
          </Text>
        </View>
      </View>
    );
  }
}

DogSagaApp.propTypes = {
  fetching: PropTypes.bool.isRequired,
  imgLoading: PropTypes.bool.isRequired,
  dog: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
  onRequestDog: PropTypes.func.isRequired,
  onImgLoaded: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default DogSagaApp;
export type { DogSagaAppState };
