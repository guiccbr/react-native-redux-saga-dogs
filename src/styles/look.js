import { StyleSheet } from 'react-native';

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

export default styles;