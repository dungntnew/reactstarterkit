import _ from 'lodash';
import React, {Component} from 'react'

import {connect} from 'react-redux';

import '../css/ProfitListMyPage.css';


class ProfitListMyPage extends Component {

    componentDidMount(){
    }

    renderPageTitle() {
      return (
        <h3 className='profit-list-title'>
           売上
        </h3>
      )
    }

    render() {

      let content = (<div>Data List HERE</div>)

      return (
        <div>
          <div className='profit-list-mypage'>
            {this.renderPageTitle()}
            {content}
          </div>
        </div>
      )
    }
}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch: dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, stateProps,
    Object.assign({}, ownProps, {
  }))
}

export default connect(mapStateToProps,
                       mapDispatchToProps, mergeProps)(ProfitListMyPage)
