import { combineReducers } from 'redux';
import JobsReducer from './jobs_reducer';
import ErrorsReducer from './errors_reducer';

const RootReducer = combineReducers({
    jobs: JobsReducer,
    errors: ErrorsReducer
});

export default RootReducer;