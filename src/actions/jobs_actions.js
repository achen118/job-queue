import * as JobsAPIUtil from '../util/jobs_api_util';
import { clearErrors, receiveErrors } from './errors_actions';

export const RECEIVE_JOBS = "RECEIVE_JOBS";
export const RECEIVE_JOB = "RECEIVE_JOB";

export const receiveJobs = jobs => {
    return {
        type: RECEIVE_JOBS,
        jobs
    };
};

export const receiveJob = job => {
    return {
        type: RECEIVE_JOB,
        job
    };
};

export const fetchHTML = (url, jobId) => dispatch => {
    return JobsAPIUtil.fetchHTML(url)
        .then(res => {
            dispatch(updateJob({
                _id: jobId,
                html: res.data
            }));
        }, err => dispatch(receiveErrors(err.response.data))
    );
};

export const fetchJobs = () => dispatch => {
    return JobsAPIUtil.fetchJobs()
        .then(res => {
            dispatch(receiveJobs(res.data));
            dispatch(clearErrors());
        }, err => dispatch(receiveErrors(err.response.data))
    );
};

export const addJob = url => dispatch => {
    return JobsAPIUtil.addJob(url)
        .then(res => {
            dispatch(receiveJob(res.data));
            dispatch(fetchHTML(res.data.url, res.data._id));
            dispatch(clearErrors);
        }, err => dispatch(receiveErrors(err.response.data))
    );
};

export const updateJob = job => dispatch => {
    return JobsAPIUtil.updateJob(job)
        .then(res => {
            dispatch(receiveJob(res.data));
            dispatch(clearErrors);
        }, err => dispatch(receiveErrors(err.response.data))
    );
};

export const deleteJob = jobId => dispatch => {
    return JobsAPIUtil.deleteJob(jobId)
        .then(() => {
            dispatch(fetchJobs());
            dispatch(clearErrors);
        }, err => dispatch(receiveErrors(err.response.data))
    );
};