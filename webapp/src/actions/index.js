
export const SELECT_TARGET = 'SELECT_TARGET';

export const selectTarget　= (target_id) => ({
  type: SELECT_TARGET,
  payload: {
    id: target_id
  }
})

export const DESELECT_TARGET = 'DESELECT_TARGET';
export const deselectTarget = (target_id) => ({
  type: DESELECT_TARGET,
  payload: {
    id: target_id
  }
})

export const UPDATE_EVENT_FILTERS = 'UPDATE_EVENT_FILTERS';
export const updateEventFilters = (filters) => ({
  type: UPDATE_EVENT_FILTERS,
  payload: {
    filters: filters
  }
})
