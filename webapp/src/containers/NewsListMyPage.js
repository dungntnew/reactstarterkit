import _ from 'lodash';
import React, {Component} from 'react'

import {connect} from 'react-redux';

import '../css/NewsListMyPage.css';

import { formatDateAndTimeStr} from '../helpers/event';

import {parsePaggingParams} from '../helpers/params'

import Pagination from '../components/Pagination'

import {fetchLatestNewsIfNeed} from '../flux/modules/latest_news'

// TODO: move const to consts file
const DEFAULT_MAX_NEWS_PER_PAGE = 10


class NewsListMyPage extends Component {

    parsePrams() {
      const {location} = this.props
      return parsePaggingParams(location, DEFAULT_MAX_NEWS_PER_PAGE)
    }

    componentDidMount(){
      const params = this.parsePrams()
      const {from, limit} = params
      this.props.fetchNews(limit, from)
    }

    fetchPage(page) {
      const params = this.parsePrams()
      const {limit} = params
      this.props.fetchNews(limit, page)
    }

    renderNewsItem({title, lastUpdate, text}, key) {

      return (
        <div className='ui item news-item' key={key}>
          {title} - {formatDateAndTimeStr(lastUpdate)}
          <p>
          {text}
          </p>
        </div>
      )
    }

    renderNewsList() {
      const {newsItems} = this.props
      const keys= _.keys(newsItems)

      return (
        <div className='block-content'>

          <div className="ui list">
            {
              keys.map((key, index) => {
                return this.renderNewsItem(newsItems[key], key)
              })
            }
          </div>

          {this.renderPagination()}
        </div>
      )
    }

    renderPagination() {
      const {total, current} = this.props
      return (
          <Pagination
             router={this.props.router}
             pathname={'/mypage/news'}
             location={this.props.location}
             onChanged={(i)=> this.fetchPage(i)}
             total={total}
             current={current}/>
        )
    }

    renderPageTitle() {
      return (
        <div className='news-list-title'>
           ニュース
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
        content = this.renderNewsList()
      }

      return (
        <div className='news-list-mypage'>

            {this.renderPageTitle()}
            {content}


          <div>
            <button onClick={
                ()=> {this.props.fetchNews()}}>
                refresh
            </button>
          </div>
        </div>
      )
    }
}


const mapStateToProps = (state, ownProps) => {
  const {latestNews} = state
  const {isFetching} = latestNews
  if (isFetching) {
    return {
      isFetching: true,
    }
  }
  else {
    const {errorMessage, newsItems, total, current} = latestNews
    return {
      isFetching: false,
      errorMessage: errorMessage,
      newsItems: newsItems,
      total: total,
      current: current
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchNews: (limit, from)=> {
    dispatch(fetchLatestNewsIfNeed(limit, from))
  }
})

export default connect(mapStateToProps,
                       mapDispatchToProps)(NewsListMyPage)
