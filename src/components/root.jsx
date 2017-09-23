import React from 'react';
import { Provider } from 'react-redux';
import JobQueueContainer from './job_queue_container';

const Root = ({ store }) => (
    <Provider store={store}>
        <JobQueueContainer />
    </Provider>
);

export default Root;