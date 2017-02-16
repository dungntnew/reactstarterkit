
import React, {Component, PropTypes} from 'react';
import '../css/TestPage.css';

import 'react-input-range/dist/react-input-range.css';

import {fetchCategories,
        fetchCategoryDetail} from '../flux/modules/resource';

import {connect} from 'react-redux';

import {FetchableEventList} from '../containers/event/FetchableEventList';


/* Put your component to here to view */
class TestPage extends Component {
  componentDidMount() {
  }

  constructor() {
    super()
  }


  render() {
    const ok = this.props.router ? <h1>Ok</h1>: <h1>Not OK </h1>

    return (
      <div>
         <p> This is TestPage, you can quick place your component to view</p>
         <pre>
              "TestComponent"  => "YourComponent"
         </pre>
         <hr/>
         <div className='test-page-wrapper'>
        {ok}

        <FetchableEventList 
          router={this.props.router}
          location={this.props.location}
          query={{special: true}}
          pagging={{limit: 3}}
          paginated={true}
          pathname={'/test'}
          listClassName='ui link three stackable cards block-events-content'
        />

         </div>
      </div>
    )
  }
}

export default TestPage
