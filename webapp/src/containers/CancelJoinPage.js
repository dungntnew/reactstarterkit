import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/CancelJoinPage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

class CancelJoinPage extends Component {

    componentDidMount(){
    }

    componentDidUpdate() {
    }

    render() {
      const content = (<div>xx </div>)

      return (
        <div className='cancel-join-page'>
          <PageHeader>
            <Logo color={true}/>
            <QuickSearchBar location={this.props.location} params={this.props.params}/>
            <TopNav />
          </PageHeader>
          {content}
          <div>
          </div>
          <PageFooter />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(CancelJoinPage)
