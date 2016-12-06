import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/TestPage.css';

import Exploder from '../containers/Exploder';

class SearchPage extends Component {
    render() {
      return (
        <div>
           <p> This is Search Page, you can quick place your component to view</p>

           <hr/>
           <div className='test-page-wrapper'>
            <Exploder location={this.props.location} params={this.props.params}/>
           </div>
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(SearchPage)
