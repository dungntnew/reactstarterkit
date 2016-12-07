import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames'
import '../css/FilterableSelector.css';

class FilterableItem extends Component {
    static propTypes = {
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired
    }

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
  constructor(props) {
    super(props)

    const {multiple} = props
    let {selectedIds} = props

    if (!multiple) {
      const first = _.first(selectedIds)
      selectedIds = first ? [first]: []
    }

    this.state = {
      filter: '',
      selectedIds: selectedIds
    }
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string
    })),
    selectedIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    fetching: PropTypes.bool,
    multiple: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    placeHolderText: PropTypes.string,
    loadingText: PropTypes.string,
    onClose: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    const {selectedIds} = nextProps
    this.setState({
      selectedIds
    })
  }

  onFilter(value) {
    this.setState({
      filter: value
    })
  }

  onItemClick(id) {
    let {selectedIds} = this.state
    const {multiple} = this.props
    const indexOf = _.indexOf(selectedIds, id)

    if (multiple) {
      if (indexOf === -1) {
        selectedIds = [...selectedIds, id]
      } else {
        selectedIds = [...selectedIds.slice(0, indexOf),
                       ...selectedIds.slice(indexOf + 1, selectedIds.length)]
      }
    }
    else {
      selectedIds = [id]
    }

    this.setState({
      selectedIds
    })

    this.props.onChange(selectedIds)
  }

  renderItems() {
    if (this.props.fetching) {
      return (
        <div className='fetching'>
        {this.props.loadingText}
        </div>
      )
    }
    const filter = this.state.filter || ''
    const filtedItems = !_.isEmpty(filter) ?
                _.filter(this.props.items, (item) => item.label.includes(filter))
                : this.props.items

    return filtedItems.map(item => {
      const selected = _.includes(this.state.selectedIds, item.id)

      return <FilterableItem
        key={item.id}
        id={item.id}
        label={item.label}
        selected={selected}
        onClick={() => this.onItemClick(item.id)}
      />
    })
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
