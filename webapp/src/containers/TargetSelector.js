import {connect} from 'react-redux';

import '../css/TargetSelector.css';

import FilterableSelector from '../containers/FilterableSelector';

const mapStateToProps = (state, ownProps) => {
  const {target} = state
  const {fetching, items} = target;

  return {
    items: items,
    selectedItems: ownProps['selectedTargets'],
    fetching: fetching,
    placeHolderText: 'Type to filter',
    loadingText: 'loading target'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelect: (id) => {
    ownProps.onChange(id)
  },
  onDeselect: (id) => {
    ownProps.onChange(id)
  },
  onClose: () => {
    ownProps.onClose()
  }
})

const TargetSelector = connect(mapStateToProps,
                       mapDispatchToProps)(FilterableSelector)
export default TargetSelector
