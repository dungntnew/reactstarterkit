import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames'
import '../css/FilterableSelector.css';

class FilterableItem extends Component {
    render() {
      const cssClasses = classNames({
        'ui orange label': this.props.selected,
        'ui grey label': !this.props.selected,
        'fiterable-list-item': true
      })

      return (
        <a
          key={this.props.id}
          className={cssClasses}
          onClick={this.props.onClick}>
        {this.props.label}
        </a>
      )
    }
}

class FilterableSelector extends Component {
  constructor() {
    super()
    this.state = {
      filter: ''
    }
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string
    })),
    selectedItems: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string
    })),
    fetching: PropTypes.bool,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    placeHolderText: PropTypes.string,
    loadingText: PropTypes.string,
    onClose: PropTypes.func,
  }

  onFilter(value) {
    this.setState({
      filter: value
    })
  }

  onItemClick(id) {
    const selected = _.findIndex(this.props.selectedItems, (e) => id === e.id) >= 0
    if (selected) {
      this.props.onDeselect(id)
    }else {
      this.props.onSelect(id)
    }
  }

  renderItems() {
    if (this.props.fetching) {
      return (
        <div className='fetching'>
        {this.props.loadingText}
        </div>
      )
    }

    return this.props.items.map(item => {
      const selected = _.findIndex(this.props.selectedItems, (e) => item.id === e.id) >= 0

      return <FilterableItem
        key={item.id}
        id={item.id}
        label={item.label}
        selected={selected}
        onClick={() => this.onItemClick(item.id)}
      />
    }

    )
  }

  render() {
    return (
      <div className='fiterable-selector'>
        <div className='ui fluid input'>
          <input
             type='text'
             placeholder={this.props.placeHolderText}
             value={this.state.filter}
             onChange={(e) => {this.onFilter(e.target.value)}}
          />
        </div>
        <ul>
          {this.renderItems()}
        </ul>
        <div>
          <button className='ui button'
                  onClick={(e) => this.props.onClose()}>Close</button>
        </div>
      </div>
    )
  }
}

export default FilterableSelector;
