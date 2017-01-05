import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/BlogDetailPage.css';

import Logo from '../components/PageLogo';
import PageHeader from '../components/PageHeader';
import TopNav from '../containers/TopNav';
import QuickSearchBar from '../containers/QuickSearchBar';
import PageFooter from '../components/PageFooter';

import BlogDetailNav from '../components/BlogDetailNav';
import BlogDetail from '../components/BlogDetail';

import {fetchBlogDetailIfNeed} from '../flux/modules/selected_blog';

class BlogDetailPage extends Component {
    static propTypes = {
    }

    componentDidMount(){
        const {blogItemId} = this.props.params
        this.props.fetchBlogItem(blogItemId)
    }

    componentDidUpdate() {
    }

    renderNav() {
      return (
        <BlogDetailNav onPreLink={()=> {
          this.props.fetchPrevBlogItem()
        }}
        onNextLink={()=> {
          this.props.fetchNextBlogItem()
        }}
      />
      )
    }

    renderBlogDetail() {
      const {data} = this.props

      return (
        <div>
          {this.renderNav()}
          <BlogDetail {...data}/>
          {this.renderNav()}
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
        content = this.renderBlogDetail()
      }

      return (
        <div className='blog-detail-page'>
          <PageHeader>
            <Logo color={true}/>
            <QuickSearchBar location={this.props.location} params={this.props.params}/>
            <TopNav />
          </PageHeader>
          {content}
          <div>
          <button onClick={()=> {this.props.fetchBlogItem("blog-item-1")}}>refresh</button
          >
          </div>
          <PageFooter />
        </div>
      )
    }
};

const mapStateToProps = (state, ownProps) => {
  const {selectedBlog} = state
  const {isFetching, errorMessage, data} = selectedBlog

  return {
    isFetching: isFetching,
    errorMessage: errorMessage,
    data: data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchBlogItem: (blogItemId)=> {
    dispatch(fetchBlogDetailIfNeed(blogItemId))
  },
  fetchNextBlogItem: ()=> {
    console.log('dispatch next blog detail')
  },
  fetchPrevBlogItem: ()=> {
      console.log('dispatch prev blog detail from')
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(BlogDetailPage)
