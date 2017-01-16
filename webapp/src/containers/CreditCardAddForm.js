import {connect} from 'react-redux';

import CreditCard from '../components/credit-card/CreditCard'

import {asyncAddCredit} from '../flux/modules/credit';

const mapStateToProps = (state, ownProps) => {
  const {credit} = state
  const {errorMessage, saved, saving, newCredit} = credit

  const {auth} = state
  const {user} = auth
  const userId = user.id

  return {
    errorMessage: errorMessage,
    saved: saved,
    saving: saving,
    data: newCredit,
    userId: userId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {next} = ownProps
  return {
    dispatch: dispatch,
    next: next
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {userId} = stateProps

  return Object.assign({}, ownProps,
    Object.assign({}, stateProps, {
      onSubmit: (data) => {
        dispatchProps.dispatch(asyncAddCredit(userId, data)).then(()=> {
          if (dispatchProps.next) {
            dispatchProps.next()
          }
        })
      }
    })
  )
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreditCard)
