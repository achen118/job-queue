import axios from 'axios';

export const fetchHTML = url => {
    return axios({
        method: 'GET',
        url: `http://${url}`
    });
};

export const fetchJobs = () => {
    return axios({
        method: 'GET',
        url: '/api/jobs',
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export const addJob = url => {
    return axios({
        method: 'POST',
        url: '/api/jobs',
        data: { url },
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export const updateJob = job => {
    return axios({
        method: 'PUT',
        url: `/api/jobs/${job._id}`,
        data: { html: job.html },
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export const deleteJob = jobId => {
    return axios({
        method: 'DELETE',
        url: `/api/jobs/${jobId}`,
        headers: {
            "Content-Type": "application/json"
        }
    });
};