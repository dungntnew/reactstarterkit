import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import '../css/TargetSelector.css';

import FilterableSelector from '../containers/FilterableSelector';

/* TODO: binding value and dispatch functions */
// fetch store
const store = {
};


const itemList = [{
  id: 0,
  label: 'example-1',
},
{
  id: 1,
  label: 'example-2',
},{
  id: 2,
  label: 'example-3',
},{
  id: 3,
  label: 'example-4',
}]


const selectedItemList = [
{
  id: 1,
  label: 'example-2',
},{
  id: 2,
  label: 'example-3',
}]


const mapStateToProps = (state, ownProps) => ({
  items: itemList,
  selectedItems: ownProps['selectedTargets'],
  fetching: false,
  placeHolderText: 'Type to filter',
  loadingText: 'loading target'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelect: (id) => {
    console.log('on select id: ', id)
  },
  onDeselect: (id) => {
    console.log('on de-select id: ', id)
  },
  onClose: () => {
    console.log('on finish select target')
  }
})

const TargetSelector = connect(mapStateToProps,
                       mapDispatchToProps)(FilterableSelector)
export default TargetSelector
