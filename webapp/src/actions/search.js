
export const SELECT_TARGET = 'SELECT_TARGET';

export const selectTarget　= (target_id) => ({
  type: TARGET_SELECT,
  payload: {
    id: target_id
  }
})

export const DESELECT_TARGET = 'DESELECT_TARGET';
export const deselectTarget = (target_id) => ({
  type: TARGET_DESELECT,
  payload: {
    id: target_id
  }
})
