import React from 'react';

class JobQueue extends React.Component {
    componentDidMount() {
        this.props.fetchJobs();
    }

    constructor(props) {
        super(props);
        this.state = {
            url: "",
            displayId: ""
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResults = this.handleResults.bind(this);
        this.handleRemoval = this.handleRemoval.bind(this);
    }    

    handleUpdate(e) {
        this.setState({
            url: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addJob(this.state.url)
            .then(this.setState({
                url: ""
            })
        );
    }

    handleResults(e) {
        this.setState({
            displayId: e.target.id
        });
    }

    handleRemoval(e) {
        this.props.deleteJob(e.target.id);
    }

    render() {
        const { jobs, errors } = this.props;
        const { displayId } = this.state;
        let queue, resultBody;
        if (jobs.allIds.length > 0) {
            queue = 
                <section className="queue-container">
                    <ul className="job-ids">
                        <h4 className="column-title">Job Id</h4>
                        {
                            jobs.allIds.map((jobId, i) => (
                                <li key={ i }>
                                    { jobs.byId[jobId]._id }
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="urls">
                        <h4 className="column-title">URL</h4>
                        {
                            jobs.allIds.map((jobId, i) => (
                                <li key={ i }>
                                    { jobs.byId[jobId].url }
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="statuses">
                        <h4 className="column-title">Job Status</h4>
                        {
                            jobs.allIds.map((jobId, i) => (
                                <li key={ i }>
                                    { jobs.byId[jobId].html ? <span className="complete">Complete</span> : <span className="working">Working</span> }
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="results">
                        <h4 className="column-title">Job Results/Remove Job</h4>
                        {
                            jobs.allIds.map((jobId, i) => (
                                <li key={ i }>
                                    { 
                                        <span>
                                            <button
                                                id={ jobId }
                                                disabled={ jobs.byId[jobId].html ? false : true }
                                                onClick={ this.handleResults }
                                                className={ jobs.byId[jobId].html ? "result ready" : "result" }>
                                                    View Results
                                                </button>
                                            &nbsp;|&nbsp;
                                            <button
                                                id={ jobId }
                                                onClick={ this.handleRemoval }
                                                className="remove">
                                                Remove
                                            </button>
                                        </span>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </section>;
        } else {
            queue = <p className="queue-container">Your Job Queue is currently empty</p>;
        }
        if (displayId) {
            resultBody = jobs.byId[displayId].html;
        }
        return(
            <div>
                <header>
                    <h1 className="title">Job Queue</h1>
                </header>
                <section>
                    <header>
                        <h3>Add A Job</h3>
                    </header>
                    <article>
                        <form onSubmit={ this.handleSubmit }>
                            <input
                                type="text"
                                placeholder="Enter a URL"
                                value={ this.state.url }
                                onChange={ this.handleUpdate } />
                            <input
                                type="submit"
                                value="Submit" />
                        </form>
                    </article>
                    <article>
                        <ul>
                            { 
                                errors.map((err, i) => (
                                    <li key={ i }>
                                        { err }
                                    </li>
                                ))
                            }
                        </ul>
                    </article>
                </section>
                <div className="queue-and-display">
                    { queue }
                    <section className="result-display">
                        <h4 className="column-title">Job Results</h4>
                        <textarea
                            rows="20"
                            cols="50"
                            className="textbox"
                            value={ resultBody }>
                        </textarea>
                    </section>
                </div>
            </div>
        );
    }
}

export default JobQueue;