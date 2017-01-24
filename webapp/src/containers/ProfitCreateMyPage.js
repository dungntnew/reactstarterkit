import _ from 'lodash';
import React, {Component} from 'react'

import {connect} from 'react-redux';

import '../css/ProfitCreateMyPage.css';


class ProfitCreateMyPage extends Component {

    componentDidMount(){
    }

    renderPageTitle() {
      return (
        <h3 className='profit-create-title'>
           売上登録
        </h3>
      )
    }

    render() {

      let content = (<div>FORM HERE</div>)

      return (
        <div>
          <div className='profit-create-mypage'>
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
                       mapDispatchToProps, mergeProps)(ProfitCreateMyPage)
