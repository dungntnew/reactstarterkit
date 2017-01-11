import _ from 'lodash'

export const parsePaggingParams = (location, defaultLimit) => {
  if (!location) {
    return {
      limit: defaultLimit,
      from: 0
    }
  }

  const {query} = location
  let {from, limit} = query

  limit = _.toInteger(limit)
  if (!_.isInteger(limit) || limit <= 0) {
    limit = defaultLimit
  }

  from = _.toInteger(from)
  if (!_.isInteger(from) || from < 0) {
    from = 0
  }

  return {limit, from}
}

const ParamsHelper = {
  parsePaggingParams,
}

export default ParamsHelper
