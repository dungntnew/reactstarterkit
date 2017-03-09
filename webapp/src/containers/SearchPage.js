import React, {Component} from 'react';
import {connect} from 'react-redux';

import '../css/TestPage.css';

import Exploder from '../containers/Exploder';

import {FetchableEventList} from '../containers/event/FetchableEventList';
import {eventListWithSearchParams} from '../helpers/query_builder';

class SearchPage extends Component {
    render() {
    const {params} = this.props
		const {query, pagging} = eventListWithSearchParams(params)
		const pathname = `/search`

      return (
        <div className='search-page'>
            <Exploder location={this.props.location} params={this.props.params}/>
            <FetchableEventList 
              router={this.props.router}
              location={this.props.location}
              query={query}
              pagging={pagging}
              paginated={true}
              pathname={pathname}
              listClassName='ui link three stackable cards block-events-content'
          />
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
