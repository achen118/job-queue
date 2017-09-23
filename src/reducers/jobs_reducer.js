import merge from 'lodash/merge';
import { RECEIVE_JOBS, RECEIVE_JOB } from '../actions/jobs_actions';

const defaultState = {
    allIds: [],
    byId: {}
};

const JobsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    let nextState;
    switch (action.type) {
        case RECEIVE_JOBS:
            nextState = merge({}, defaultState);
            action.jobs.forEach(job => {
                nextState.allIds.unshift(job._id);
                nextState.byId[job._id] = job;
            });
            return nextState;
        case RECEIVE_JOB:
            nextState = merge({}, state);
            nextState.byId[action.job._id] = action.job;
            if (!nextState.allIds.includes(action.job._id)) {
                nextState.allIds.unshift(action.job._id);
            }
            return nextState;
        default:
            return state;
    }
};

export default JobsReducer;