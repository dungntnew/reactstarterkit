import _ from 'lodash'
import React, {
  Component,
  PropTypes
} from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router';

import EventItem from '../../components/EventItem';

import {
  getEventByQueryDict, fetchEvents
} from '../../flux/modules/resource'

import { normalizeQueryDict, grouppedQueryParams } from '../../helpers/params'

import Pagination from '../../components/Pagination'

const Item = (props) => (
  <div className={props.className || 'item'}>
    {props.id}:
    {props.childrent || props.title}
  </div>
)

class ItemList extends Component {
  constructor(props) {
    super(props)
    this.locationHasChanged = this.locationHasChanged.bind(this)
  }

  componentDidMount() {
    const {router} = this.props
    if (router) {
      router.listen(this.locationHasChanged)
    }
    this.props.load()
  }

  componentWillUnmount() {
    const {router} = this.props
    if (router) {
      router.unregisterTransitionHook(this.locationHasChanged)
    }
  }

  locationHasChanged() {
    setTimeout(()=>{
      this.props.load()
    }, 100)
  }

  renderLoading() {
    return (
      <h4>Loading...</h4>
    )
  }

  renderEmpty() {
    return (
      <h4>Empty</h4>
    )
  }

  renderItem(item, index, className) {
    return (<Item key={index} {...item} className={className} />)
  }

  renderList(items, className = 'ui list') {
    return (<div className={className}>{items}</div>)
  }

  render() {
    const {isFetching, items, listClassName, itemClassName} = this.props
    const listRender = this.props.listRender || this.renderList
    const itemRender = this.props.itemRender || this.renderItem
    const loadingRender = this.props.loadingRender || this.renderLoading
    const emptyRender = this.props.emptyRender || this.renderEmpty

    if (isFetching) {
      return loadingRender()
    }
    if (!items || items.length === 0) {
      return emptyRender()
    }

    const renderedItems = _.keys(items).map((key, index) => {
      return itemRender(items[key], key, itemClassName)
    })

    return listRender(renderedItems, listClassName)
  }
}

const PaginatedItemList = (props) => {
  const {paginated} = props
  if (!paginated) {
    return (<ItemList {...props} />)
  }
  else {
    const {pagging} = props
    return (
      <div>
        <ItemList {...props} />
        {/* query passed to Pagination must be raw query url got from location */}
        {/* that query dict used to build new url with query included pagging params */}
        <Pagination {...pagging} onChanged={() => {}}/>
      </div>
    )
  }
}

const FetchableEventList = connect((state, ownProps) => {
  const {paginated, router, location, 
        query, pagging, sort,
        pathname} = ownProps
  
  let mergedQuery = query || {}
  if (location && location.query) {
    mergedQuery = Object.assign({}, mergedQuery, location.query)
  }
  if (pagging) {
    mergedQuery = Object.assign({}, mergedQuery, pagging)
  }
  if (sort) {
    mergedQuery = Object.assign({}, mergedQuery, sort)
  }


  let {paggingParams, 
       sortParams, 
       queryParams} = grouppedQueryParams(mergedQuery)

  
  const {currentPage} = paggingParams
  const mergedPaggingQuery = Object.assign({}, queryParams, {
    page: currentPage
  })
  const normalizedQuery = normalizeQueryDict(mergedPaggingQuery)

  const {isFetching, events} = getEventByQueryDict(state, normalizedQuery)
  /** TODO: return total page, current page from API */
  /* merge url query dict that will used for build pagging url */
  if (paginated) {
    paggingParams = {
      query: mergedQuery,
      pathname: pathname,
      currentPage: 0, 
      totalPages: 10
    }
  }

  return {
    router,
    location,
    isFetching,
    items: events,
    paginated,
    pagging: paggingParams
  }
},
  (dispatch, ownProps) => ({
    load: () => {
     
      const {location, 
            query, pagging, sort, caller} = ownProps
      let mergedQuery = query || {}
      if (location && location.query) {
        mergedQuery = Object.assign({}, mergedQuery, location.query)
      }
      if (pagging) {
        mergedQuery = Object.assign({}, mergedQuery, pagging)
      }
      if (sort) {
        mergedQuery = Object.assign({}, mergedQuery, sort)
      }

      
      let {paggingParams, 
          sortParams, 
          queryParams} = grouppedQueryParams(mergedQuery)
      

      const normalizedQuery = normalizeQueryDict(queryParams)
      {/* query passed to APIs must splited to:
            filter params, 
            order params,
            pagging params */}
      dispatch(fetchEvents({
        caller: caller || { service: 'list', ref: 'un-known' },
        pagging: paggingParams,
        query: normalizedQuery,
        sort: sortParams,
      }))
    },
    itemRender: (item, index, className) => {
      return (<EventItem key={index} {...item} />)
    },
  }))(PaginatedItemList)

export {FetchableEventList}