class Edit extends React.Component {
    state = {
        question: this.props.entry.question,
        answer: this.props.entry.answer,
        selection: [],
        selection1: this.props.entry.selection[0],
        selection2: this.props.entry.selection[1],
        selection3: this.props.entry.selection[2],
        selection4: this.props.entry.selection[3],
    };
    showAlert = () => {
        this.setState({ alert: true });
        setTimeout(() => {
            this.setState({ alert: false });
        }, 1000);
    };
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        let newSelection = [];
        for (let i = 1; i <= 4; i++) {
            newSelection.push(this.state['selection' + i]);
        }
        this.setState({
            selection: newSelection
        });
        setTimeout(() => {
            console.log(this.state.selection);
            console.log(this.state.question);
            console.log(this.state.answer);
        }, 50)

        setTimeout(() => {
            axios.put('/quiz/' + this.props.entry._id, this.state).then(response => { })
        }, 100)
    }
    deleteItem = () => {
        axios.delete("/quiz/" + this.props.entry._id).then(response => { })
    }
    render() {
        const { selection, question, answer, } = this.props.entry;
        return (
            <div id='container'>
                <h2>Edit this question</h2>
                <div style={{ width: "100%" }}>
                    <form id="createForm" onSubmit={this.handleSubmit}>
                        <div className='row'>
                            <div className='col-sm-7'>
                                <label htmlFor='question' className='form-label'>
                                    <strong>Question</strong>{' '}
                                </label>
                                <input
                                    required
                                    id='question'
                                    className='form-control'
                                    type='text'
                                    onChange={this.handleChange}
                                    defaultValue={question}
                                />
                            </div>
                            <div className='col-sm-5'>
                                <label htmlFor='answer' className='form-label'>
                                    <strong>Answer</strong>{' '}
                                </label>
                                <input
                                    required
                                    id='answer'
                                    className='form-control'
                                    type='text'
                                    onChange={this.handleChange}
                                    defaultValue={answer}
                                />
                            </div>
                        </div>
                        <br />
                        <div className='col-sm-5'>
                            <label className='form-label' htmlFor='selection1'>
                                Option 1
						</label>
                            <input
                                required
                                id='selection1'
                                className='form-control'
                                type='text'
                                onChange={this.handleChange}
                                defaultValue={selection[0]}
                            />
                            <label className='form-label' htmlFor='selection2'>
                                Option 2
						</label>
                            <input
                                required
                                id='selection2'
                                className='form-control'
                                type='text'
                                onChange={this.handleChange}
                                defaultValue={selection[1]}
                            />
                            <label className='form-label' htmlFor='selection3'>
                                Option 3
						</label>
                            <input
                                required
                                id='selection3'
                                className='form-control'
                                type='text'
                                onChange={this.handleChange}
                                defaultValue={selection[2]}
                            />
                            <label className='form-label' htmlFor='selection4'>
                                Option 4
						</label>
                            <input
                                required
                                id='selection4'
                                className='form-control'
                                type='text'
                                onChange={this.handleChange}
                                defaultValue={selection[3]}
                            />
                        </div>
                        <br />
                        <div className="row">
                            <div
                                className='col-sm-5'
                                style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    onClick={() => this.props.setPage('game')}
                                    className='btn btn-secondary'>
                                    Back
						</button>
                                <input
                                    onClick={this.showAlert}
                                    className='btn btn-success'
                                    type='submit'
                                    value='Edit'
                                />
                            </div>
                            <br />
                            {this.state.alert ? (
                                <div className='col-sm-6 grow growOut' style={{ color: 'lime' }}>
                                    <h1>Successfully edited</h1>
                                </div>
                            ) : null}
                        </div>
                        <button disabled onClick={this.deleteItem} className="btn btn-danger">Delete</button>
                    </form>
                </div>
            </div>
        );
    }
}
