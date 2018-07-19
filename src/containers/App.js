import { connect } from 'react-redux';
import DogSagaApp from '../components/DogSagaApp';

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
