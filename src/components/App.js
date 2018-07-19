import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import {
  Easing,
  Animated,
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

class DogSagaApp extends React.Component {
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
      transform: [{ rotate: spin }],
    };

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.imageContainer}>
            <Animated.Image onLoad={onImgLoaded} style={imgLoading ? styles.logoHidden :
              styles.logo} source={dog || logo} />
            <ActivityIndicator style={imgLoading ? styles.activity : styles.activityHidden} size="small" />
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
  error: PropTypes.string.isRequired,
};

let spinValue = new Animated.Value(0);

const animProperties = {
  toValue: 1,
  duration: 3000,
  easing: Easing.linear,
  useNativeDriver: true,
};

Animated.loop(Animated.timing(spinValue, animProperties)).start();

const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
});

const baseStyles = {
  logo: {
    height: 50,
    width: 50,
  },
  container: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  activity: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  error: {
    color: 'red',
  },
};

const styles = StyleSheet.create({
  logo: {
    ...baseStyles.logo,
  },
  logoHidden: {
    ...baseStyles.logo,
    opacity: 0,
  },
  activity: {
    ...baseStyles.activity,
  },
  activityHidden: {
    ...baseStyles.activity,
    opacity: 0,
  },
  headerContainer: {
    ...baseStyles.container,
    backgroundColor: '#222',
    height: 150,
    justifyContent: 'space-between',
    elevation: 1,
  },
  bodyContainer: {
    ...baseStyles.container,
    height: 150,
    justifyContent: 'space-between',
  },
  headerText: {
    ...baseStyles.text,
    fontSize: 20,
    color: 'white',
  },
  bodyText: {
    ...baseStyles.text,
    fontSize: 16,
  },
  error: {
    ...baseStyles.error,
  },
  errorHidden: {
    ...baseStyles.error,
    opacity: 0,
  },
  imageContainer: {},
});

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error,
    imgLoading: state.imgLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch({ type: 'API_CALL_REQUEST' }),
    onImgLoaded: () => dispatch({ type: 'IMG_LOADED' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DogSagaApp);
