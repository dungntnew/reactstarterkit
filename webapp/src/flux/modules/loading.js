import _ from 'lodash';

export const loadingReducer = (state={}, action)=> {
  if (_.endsWith(action.type, '_REQUEST')) {
    const resource = _.replace(action.type, '_REQUEST', '')
    return _.merge(state, {}, {
      [resource]: state[resource] ? state[resource] + 1 : 1
    })
  }
  else if (_.endsWith(action.type, '_FETCH')) {
    const resource = _.replace(action.type, '_FETCH', '')
    return _.merge(state, {}, {
      [resource]: state[resource] ? state[resource] + 1 : 1
    })
  }
  else if (_.endsWith(action.type, '_SUCCESS')) {
    const resource = _.replace(action.type, '_SUCCESS', '')
    return _.merge(state, {}, {
      [resource]: state[resource] > 0 ? state[resource] - 1 : 0
    })
  }
  else if (_.endsWith(action.type, '_RECEIVE')) {
    const resource = _.replace(action.type, '_RECEIVE', '')
    return _.merge(state, {}, {
      [resource]: state[resource] > 0 ? state[resource] - 1 : 0
    })
  }
  else if (_.endsWith(action.type, '_FAILURE')){
    const resource = _.replace(action.type, '_FAILURE', '')
    return _.merge(state, {}, {
      [resource]: state[resource] > 0 ? state[resource] - 1 : 0
    })
  }else {
    return state;
  }
}

export const isLoading = (globalState) => {
  const {loadings} = globalState
  const loadingCount = _.sum(_.values(loadings))
  return loadingCount > 0
}
