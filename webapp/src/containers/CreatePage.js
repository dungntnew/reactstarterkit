import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/CreatePage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import EventEditForm from '../components/EventEditForm';

class CreatePage extends Component {
    static propTypes = {
      event: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      onSave: PropTypes.func.isRequired,
    }

    render() {
      return (
        <div className='create-page'>
        <PageHeader>
          <Logo color={true}/>
          <QuickSearchBar location={this.props.location} params={this.props.params}/>
          <TopNav />
        </PageHeader>
        <EventEditForm {...this.props}/>
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.newEvent.event
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (data) => {
    console.log('dispatch save event: ', data)
  },
  onChange: (data) => {
    console.log('dispatch change data: ', data)
  },
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(CreatePage)
