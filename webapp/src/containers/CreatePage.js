import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/CreatePage.css';

import EventEditForm from '../components/EventEditForm';

import {
  getCreatingEventData, 
  startCreateEvent,
  saveNewEvent,
  changeNewEventData } from '../flux/modules/resource';

class CreatePage extends Component {
    static propTypes = {
      event: PropTypes.object.isRequired,
      onChange: PropTypes.func.isRequired,
      onSave: PropTypes.func.isRequired,
    }

    render() {
      return (
        <div className='create-page'>
        <EventEditForm {...this.props}/>
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  const {isChanged, isSaving, data} = getCreatingEventData(state)

  const {auth} = state
  const {user} = auth
  const userId = user.id

  return {
    event: data,
    isChanged,
    isSaving,
    userId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps
  const {userId} = stateProps

  return Object.assign({}, stateProps,
    Object.assign({}, ownProps, {
      create: () => {
        dispatch(startCreateEvent())
      },
      onSave: (data) => {
        dispatch(saveNewEvent(userId, data))
      },
      onChange: (data) => {
        dispatch(changeNewEventData(data))
      }
  }))
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(CreatePage)
