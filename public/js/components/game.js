class Game extends React.Component {
    state = {
        quizBox: [],
        quiz: {
            displayAnswer: 'none',
            selection: []
        },
        page: 'game',
        addPoint: 0,
        gameStart: false
    };

    randomSelect = () => {
        const { selection } = this.state.quiz
        for (let i = selection.length - 1; i >= 0; i--) {
            let randomIndex = Math.floor(Math.random() * selection.length);
            let temp = selection[i];
            selection[i] = selection[randomIndex];
            selection[randomIndex] = temp;
        }
        this.setState({
            selection: selection
        })
    }
    setPage = goto => {
        this.setState({
            page: goto
        });
        if (goto === "game") {
            this.setState({
                gameStart: false,
                quizBox: [],
                quiz: {
                    displayAnswer: "none",
                    selection: []
                }
            })
        }
        this.props.playAgain();
    };
    addPointAnimation = (point) => {
        this.setState({
            addPoint: point
        })
        setTimeout(() => {
            this.setState({
                addPoint: 0
            })
        }, 1000)
    }

    findQuestion = () => {
        this.setState({ gameStart: true })
        axios.get('/quiz').then(res => {
            const randQuiz = Math.floor(Math.random() * res.data.length);
            const { quizBox } = this.state;
            if (quizBox.length) {
                if (quizBox.indexOf(res.data[randQuiz]._id) === -1) {
                    this.setState({
                        quiz: res.data[randQuiz]
                    });
                    quizBox.push(res.data[randQuiz]._id);
                    this.randomSelect();
                } else {
                    this.findQuestion(event);
                }
            } else {
                this.setState({
                    quiz: res.data[randQuiz]
                });
                quizBox.push(res.data[randQuiz]._id);
            }
        });
        this.hideAnswer();

    };

    handleCheckAnswer = event => {
        const { answer } = this.state.quiz;
        if (answer === event.target.innerText) {
            this.props.incrementPoints();
            this.addPointAnimation(1);
            this.findQuestion();
        } else {
            this.props.decrementPoints();
            this.addPointAnimation(-1);
            this.findQuestion();
        }
    };

    displayAnswer = () => {
        if (this.state.quiz.answer) {
            this.setState({
                displayAnswer: 'block'
            });

            setTimeout(() => {
                this.props.gameOver();
            }, 2000);
        }
    };

    hideAnswer = () => {
        this.setState({
            displayAnswer: 'none'
        });
    };

    render = () => {
        const { page, addPoint, gameStart, quiz } = this.state;
        if (page === "game") {
            return (
                <div id="megaContainer">
                    <div id="container">
                        <h1 className="title" style={{ color: "blue" }}><strong>Welcome to the inQUIZitor</strong> </h1>
                        <div className="row rules">
                            <h5>Rules:</h5>
                            <h6 style={{ color: "green" }}>+1 for correct answer</h6>
                            <h6 style={{ color: "red" }}>-1 for wrong answer</h6>
                            <h6 style={{ color: "purple" }}><strong>Reach 10 points to win!</strong></h6>
                        </div>
                        <br />
                        <br />
                        <div className="pointDiv">
                            <h1 className="currentPoints">
                                <span >Points: </span>
                                {this.props.points}
                            </h1>
                            {addPoint > 0 ?
                                AddPoint("green", "+1")
                                :
                                null
                            }
                            {addPoint < 0 ?
                                AddPoint("red", "-1")
                                :
                                null
                            }
                        </div>

                        <h2 style={{ textAlign: "center" }}>
                            {this.state.quiz.question ? (
                                <div>{this.state.quiz.question}</div>
                            ) : (
                                    <p>Are you ready to be inQUIZitive?</p>
                                )}
                        </h2>
                        <div className="options">
                            {this.state.quiz.selection.map((el, id) => (
                                <button className="btn btn-dark" key={id} onClick={this.handleCheckAnswer}>
                                    {el}
                                </button>
                            ))}
                        </div>
                        {gameStart ?
                            null
                            :
                            <button onClick={this.findQuestion} className="btn btn-outline-danger"><h2>Get inQUIZitive</h2></button>
                        }
                        {/* <button onClick={this.displayAnswer}>Reveal Answer</button>
                        <div style={{ display: this.state.displayAnswer }}>
                            {this.state.displayAnswer ? (
                                <h5>{this.state.quiz.answer}</h5>
                            ) : null}
                        </div> */}
                        <br />
                        <br />
                        <div style={{ width: "100%" }}>
                            <button onClick={() => this.setPage("create")} className="btn btn-success">Create</button>
                            <button onClick={() => this.setPage("edit")} className="btn btn-warning">Edit</button>
                        </div>
                    </div >
                    <div className="sidePanel"></div>
                </div>
            );
        } else if (page === "create") {
            return <Create setPage={this.setPage} />
        } else if (page === "edit") {
            return <Edit entry={quiz} setPage={this.setPage} />
        }
    };
}

function AddPoint(color, point) {
    return (
        <h1 style={{ color: color }} className="points">
            {point}
        </h1>
    )
}
