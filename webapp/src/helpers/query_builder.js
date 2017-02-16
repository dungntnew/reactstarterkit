
/** query list event created by userId */
export const eventCreatedBy = (userId, query={}) => {
    return Object.assign({}, query, {
        createdBy: userId
    })
}

/** query list event liked by userId */
export const eventLikedBy = (userId, query={}) => {
    return Object.assign({}, query, {
        likes: [userId]
    })
}

/** query list event that userId joined */
export const eventJoinedBy = (userId, query={}) => {
    return Object.assign({}, query, {
        joiners: [userId]
    })
}

/** query list event reviewed by userId */
export const eventReviewedBy = (userId, query={}) => {
    return Object.assign({}, query, {
        reviewer: userId
    })
}

/** pagging builder */
const DEFAULT_MAX_EVENT_PER_PAGE = 25
export const defaultPagging = (pagging) => {
    return Object.assign({}, pagging, {
        limit: DEFAULT_MAX_EVENT_PER_PAGE
    })
}

/** profile page query helper */
export const eventListForTabId = (userId, tabId) => {
    const baseQuery = {}
    let query
    const pagging = defaultPagging()

    switch(tabId) {
        case 'created': query = eventCreatedBy(userId, baseQuery); break;
        case 'liked': query = eventLikedBy(userId, baseQuery); break;
        case 'joined': query = eventJoinedBy(userId, baseQuery); break;
        case 'reviewed': query = eventReviewedBy(userId, baseQuery); break;
        default: query = eventCreatedBy(userId, baseQuery); break;
    }
    return {
        query, pagging
    }
}