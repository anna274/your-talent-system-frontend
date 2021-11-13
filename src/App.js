import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from 'redux/actions';
import { addAxiosResponseInterceptor } from 'services';
import { Loader } from 'components/shared';
// import Modal from 'components/shared/modals/modal';
import Routes from 'routes';

class App extends React.Component {
  componentDidMount() {
    addAxiosResponseInterceptor();
    // if we have saved tokens in local storage
    if (localStorage.getItem('jwtToken')) {
      this.props.authenticateUser();
    }
  }

  render() {
    const { isAuthenticated, authenticating } = this.props;
    if (authenticating) {
      return <Loader />;
    }
    // return localStorage.getItem('jwtToken') && !isAuthenticated ? null : (
    //   <ThemeProvider theme={theme}>
    //     <Routes />
    //     {/* <Modal /> */}
    //   </ThemeProvider>
    // );
    return localStorage.getItem('jwtToken') && !isAuthenticated ? null : <Routes />
  }
}

const mapStateToProps = (state) => ({
  authenticating: state.loader.loading,
  isAuthenticated: state.authorizedUser.isAuthenticated,
});

const mapDispatchToProps = {
  authenticateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
