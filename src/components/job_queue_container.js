import { connect } from 'react-redux';
import JobQueue from './job_queue';
import { fetchJobs, addJob, deleteJob } from '../actions/jobs_actions';

const mapStateToProps = state => {
    return {
        jobs: state.jobs,
        errors: state.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchJobs: () => dispatch(fetchJobs()),
        addJob: url => dispatch(addJob(url)),
        deleteJob: jobId => dispatch(deleteJob(jobId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JobQueue);