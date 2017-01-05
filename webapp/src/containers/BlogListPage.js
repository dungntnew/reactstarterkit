import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/BlogListPage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import BlogItem from '../components/BlogItem';

import {fetchLatestBlogsIfNeed} from '../flux/modules/latest_blog';

const DEFAULT_MAX_BLOG_PER_PAGE = 25

class BlogListPage extends Component {
    static propTypes = {

    }

    parsePrams() {
      const {location} = this.props
      if (!location) {
        return {
          limit: DEFAULT_MAX_BLOG_PER_PAGE,
          from: 0
        }
      }
      
      const {query} = location
      let {from, limit} = query

      limit = _.toInteger(limit)
      if (!_.isInteger(limit) || limit <= 0) {
        limit = DEFAULT_MAX_BLOG_PER_PAGE
      }

      from = _.toInteger(from)
      if (!_.isInteger(from) || from < 0) {
        from = 0
      }

      return {limit, from}
    }

    componentDidMount(){
      const params = this.parsePrams()
      const {from, limit} = params
      this.props.fetchLatestBlogItems(limit, from)
    }

    componentDidUpdate() {
    }

    renderBlogList() {
      const {blogItems} = this.props
      const keys= _.keys(blogItems)

      return (
        <div className="ui items">
          {
            keys.map((key, index) => (
              <BlogItem key={key} {...blogItems[key]}/>
            ))
          }
        </div>
      )
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
        content = this.renderBlogList()
      }

      return (
        <div className='blog-list-page'>
          <PageHeader>
            <Logo color={true}/>
            <QuickSearchBar location={this.props.location} params={this.props.params}/>
            <TopNav />
          </PageHeader>
          {content}
          <div>
          <button onClick={()=> {this.props.fetchLatestBlogItems()}}>refresh</button
          >
          </div>
          <PageFooter />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  const {latestBlog} = state
  const {isFetching, errorMessage, blogItems} = latestBlog
  console.log('CURRENT STATE: ', isFetching, errorMessage, blogItems)
  return {
    isFetching: isFetching,
    errorMessage: errorMessage,
    blogItems: blogItems
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchLatestBlogItems: (limit, from)=> {
    dispatch(fetchLatestBlogsIfNeed(limit, from))
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(BlogListPage)
