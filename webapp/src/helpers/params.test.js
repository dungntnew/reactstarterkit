import {
    filterDictByDict,
    idsToFilteredDict,
} from './params'

import moment from 'moment'

const resourceDict = {
    page: {
        1: [1, 2, 3, 4, 4, 5, 6, 32, 32, 32],
        2: [3, 99, 212, 2121, 3232, 43, 2121, 211],
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
        'tsuda': [999, 323, 121, 21, 1, 2, 3, 4, 5],
        'dungntnew': [9, 1, 9, 21, 33, 4, 12, 3, 12, 3, 12, 455, 66]
    },
    status: {
        'OPEN': [1, 2, 3, 4, 5, 6, 7, 8],
        'CLOSED': [999, 12121, 3231, 2121, 444, 55, 555]
    },
    special: {
        true: [1, 2, 3, 4, 5],
        false: [6, 7, 8, 9]
    },
    trend: {
        true: [1, 4, 99],
        false: [3, 2, 5, 6, 7, 8, 9, 10],
    },
    latest: {
        true: [1, 2, 3, 4, 5],
        false: [6, 7, 8, 9, 10, 99, 1212, 21,21],
    },
    tags: {
        niku: [3, 1, 21, 43, 4],
        ramen: [1, 32, 5, 12, 4, 54],
        gohan: [31, 32, 121, 232]
    },
    cities: {
        'HO CHI MINH': [1, 3, 31, 32],
        'YOKO': [1, 23, 32, 121],
        'DANANG': [1, 23, 32, 121]
    }
}

test('filterDictByDict1', () => { 
    expect(filterDictByDict({
        special: true,
        tags: ['niku', 'ramen', 'gohan'],
        cities: ['HO CHI MINH', 'HA NOI', 'YOKO']
    }, resourceDict)).toEqual([1, 3])
})

test('filterDictByDict2', () => {
    expect(filterDictByDict({
        special: true,
        tags: ['niku'],
        cities: ['DANANG']
    }, resourceDict)).toEqual([1])
})


test('filterDictByDict3', () => {
    expect(filterDictByDict({
        special: false,
        tags: ['niku'],
        cities: ['DANANG']
    }, resourceDict)).toEqual([])
})


test('filterDictByDict4', () => {
    expect(filterDictByDict({
        page: 2,
        special: true,
        tags: ['niku', 'ramen', 'gohan'],
        cities: ['HO CHI MINH', 'HA NOI', 'YOKO']
    }, resourceDict)).toEqual([3])
})

test('filterDictByDict5', () => {
    expect(filterDictByDict({
        page: 1,
        createdBy: 'dungntnew',
        status: 'OPEN',
    }, resourceDict)).toEqual([4, 5, 6])
})


test('filterDictByDict6', () => {
    expect(filterDictByDict({
        page: 1,
        createdBy: 'dungntnew',
        status: 'CLOSED',
    }, resourceDict)).toEqual([])
})

test('filterDictByDict7', () => {
    expect(filterDictByDict({
        page: 1,
        likes: 'dungntnew',
        status: 'OPEN',
    }, resourceDict)).toEqual([1, 3, 4])
})

test('filterDictByDict8', () => {
    expect(filterDictByDict({
        page: 1,
        likes: 'dungntnew',
        status: 'OPEN',
        tags: 'ramen'
    }, resourceDict)).toEqual([1, 4])
})


test('filterDictByDict9', () => {
    expect(filterDictByDict({
        page: 1,
        status: 'OPEN',
        special: true,
    }, resourceDict)).toEqual([1, 2, 3, 4, 5])
})

test('filterDictByDict9', () => {
    expect(filterDictByDict({
        page: 1,
        status: 'OPEN',
        latest: true,
    }, resourceDict)).toEqual([1, 2, 3, 4, 5])
})

test('idsToFilteredDict1', ()=> {
    const state = {
    }

    expect(idsToFilteredDict({
        page: 1, 
        status: 'OPEN',
        latest: true,
    }, [1, 2, 3], state)).toEqual({
        page: {
            1: [1, 2, 3]
        },
        status: {
            'OPEN': [1, 2, 3],
        },
        latest: {
            true: [1, 2, 3]
        }
    })
})

test('idsToFilteredDict2', ()=> {
  const state = {
        page: {
            '1': [1]
        },
        status: {
            'OPEN': [1]
        },
        latest: {
            'true': [1]
        }
    }

    expect(idsToFilteredDict({
        page: 1, 
        status: 'OPEN',
        latest: true,
    }, [2], state)).toEqual({
        page: {
            '1': [1, 2]
        },
        status: {
            'OPEN': [1, 2]
        },
        latest: {
            'true': [1, 2]
        }
    })
})

test('idsToFilteredDict3', ()=> {
  const state = {
        page: {
            '1': [1]
        },
        status: {
            'OPEN': [1]
        },
        joiners: {
            'dungntnew': [1],
            'tsuda': [1],
        },
        'tags': {
            'niku': [1, 2, 3],
        }
    }

    expect(idsToFilteredDict({
        page: 2, 
        status: 'OPEN',
        latest: true,
        joiners: 'nghiemdaovan',
        tags: ['niku', 'sushi', 'tabehodai']
    }, [2, 3], state)).toEqual({
        page: {
            '1':[1],
            '2': [2, 3]
        },
        status: {
            'OPEN': [1, 2, 3]
        },
        joiners: {
            'dungntnew': [1],
            'tsuda': [1],
            'nghiemdaovan': [2, 3],
        },
        latest: {
            'true': [2, 3]
        },
        'tags': {
            'niku': [1, 2, 3, 2, 3],
            'sushi': [2, 3],
            'tabehodai': [2, 3]
        }
    })
})