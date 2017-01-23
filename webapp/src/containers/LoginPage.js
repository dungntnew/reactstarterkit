import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/LoginPage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import LoginForm from '../components/auth-forms/LoginForm';

//import {} from '../flux/modules/';

class LoginPage extends Component {

    componentDidMount(){
      const {blogItemId} = this.props.params
    }

    componentDidUpdate() {
    }

    renderLoginForm() {
      return <LoginForm />
    }

    render() {
      const {isFetching, errorMessage} = this.props
      let content

      if (isFetching) {
        content = (
          <div> Loading... </div>
        )
      }
      else if (!isFetching && errorMessage) {
        content = (
          <div> System Error: {errorMessage} </div>
        )
      }
      else {
        content = this.renderLoginForm()
      }

      return (
        <div className='login-page'>
          <PageHeader>
            <Logo color={true}/>
            <QuickSearchBar location={this.props.location} params={this.props.params}/>
            <TopNav />
          </PageHeader>
          {content}
          <PageFooter />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  const {selectedBlog} = state
  const {isFetching, errorMessage, data} = selectedBlog

  return {
    isFetching: isFetching,
    errorMessage: errorMessage,
    data: data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(LoginPage)
