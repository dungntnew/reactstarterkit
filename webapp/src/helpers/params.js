import _ from 'lodash'

export const parsePaggingParams = (query, defaultLimit = 25) => {

  let {currentPage, limit} = query

  limit = _.toInteger(limit)
  if (!_.isInteger(limit) || limit <= 0) {
    limit = defaultLimit
  }

  currentPage = _.toInteger(currentPage)
  if (!_.isInteger(currentPage) || currentPage < 0) {
    currentPage = 0
  }

  return { limit, currentPage }
}

export const parseSortParams = (query) => {
  const {orderBy, desc} = query
  return {
    orderBy, 
    desc: desc || false
  }
}

export const grouppedQueryParams = (query) => {
  const rawQuery = _.clone(query)
  const pagging = parsePaggingParams(rawQuery)
  const sort = parseSortParams(rawQuery)
  
  delete rawQuery['currentPage']
  delete rawQuery['limit']
  delete rawQuery['orderBy']
  delete rawQuery['desc']
  
  return {
    paggingParams: pagging,
    sortParams: sort,
    queryParams: rawQuery
  }
}

export const normalizeQueryDict = (query) => {
  return query;
}

/* Input:
      paramDict = {
        page: 1,
        special: true,
        createdBy: 'nghiemdaovan',
        hostedBy:['nghiemdaovan'],
        joiners: ['dungntnew'],
        likes: ['dungntnew'],
        status: 'OPEN',
        tags:['niku', 'ramen', 'gohan',...],
        cities: ['HO CHI MINH', 'HA NOI', 'YOKO']
      }
      resourceDict = {
        page: {
          1: [1, 2,3 ,4 ,4, 32, 32, 32],
          2: [99, 212, 2121, 3232, 43, 2121, 211],
          3: [9, 10, 12, 19, 32, 99, 21, 3232]
        },
        
        createdBy: {
          'nghiemdaovan': [1, 2, 3, 4],
          'dungntnew': [4, 5, 6, 7, 8]
        },
        hostedBy: {
          'nghiemdaovan': [1, 2, 3], 
          'massu': [8, 32, 12, 12],
          'kana': [1, 7, 8, 21, 2121]
        },
        joiners: {
          'tsuda': [8, 21, 12, 12], 
          'norikoshi': [9, 32, 99, 90212, 2121], 
          'shaq': [832, 921, 2912, 321], 
          'dungntnew': [999, 721, 1, 1, 2, 3, 4, 5, 6]
        },
        likes: {
          'tsuda': [999, 323, 121, 21,1 , 2, 3, 4, 5], 
          'dungntnew': [9, 1, 9, 21, 33, 4, 12, 3, 12, 3, 12, 455, 66]
        },
        status: {
          'OPEN': [1, 2, 3, 4, 5, 6, 7, 8],
          'CLOSED': [999, 12121, 3231, 2121 444, 55, 555]
        },
        special: {
          true: [1, 2, 3, 4, 5],
          false: [6, 7, 8, 9]
        },
        tags: {
          niku: [3, 1,21, 43, 4],
          ramen: [1, 32, 5, 12, 4,54],
          gohan: [31, 32, 121, 232]
        },
        cities: {
          'HO CHI MINH': [1, 3, 31, 32],
          'YOKO': [1, 23, 32, 121]
        }
      } 

      return:
      list of filtered resource ids    
*/
export const filterDictByDict = (paramDict, dataDict) => {
  const paramKeys = _.keys(paramDict)
  const dataKeys = _.keys(dataDict)
  
  // test param keys is included in data Dict
  const valid = _.reduce(_.map(paramKeys, (k) => _.includes(dataKeys, k)), (r, v) => r && v)
  if (!valid) {
    return []
  }
  
  // filter data dict by params with rules:
  // key1 && key2 && key3
  // val1 || val2 || val3

  let result = []
  _.each(paramKeys, (key, index) => {
    const params = paramDict[key]
    let values = []

    if (!_.isArray(params)) {
      values = dataDict[key][params] ? dataDict[key][params]: []
    }
    else {
      // OR filter
      values = _.flattenDeep(_.concat(_.filter(_.map(params, (param)=> dataDict[key][param]), (v)=> v)))
    }

    // AND filter
    result = index != 0 ? _.intersection(result, values): values
  })
  return result
}

export const validFilterParams = [
  ''
]

/*
  input:
  paramDict = {
        page: 1,
        special: true,
        createdBy: 'nghiemdaovan',
        hostedBy:['nghiemdaovan'],
        joiners: ['dungntnew'],
        likes: ['dungntnew'],
        status: 'OPEN',
        tags:['niku', 'ramen', 'gohan',...],
        cities: ['HO CHI MINH', 'HA NOI', 'YOKO']
  },
  ids: [1, 2, 3, 4, 5, 5, 6, 7, 8],
  state: {}
 */

export const idsToFilteredDict = (paramDict, ids, state) => {
  return _.mergeWith({}, state, _.mapValues(paramDict, (v, k) => {
    if (_.isArray(v)) {
      return _.zipObject(v, _.map(v, (x) => [...ids]))
    }
    else {
      return {[v]: [...ids]}
    }
  }), (v1, v2) => {
    return _.mergeWith({}, v1, v2, (x1, x2)=> {
      if (x1) {
        return x1.concat(x2)
      }
    })
  })
}

const ParamsHelper = {
  grouppedQueryParams,
  parsePaggingParams,
  filterDictByDict,
  idsToFilteredDict,
  normalizeQueryDict,
}

export default ParamsHelper
