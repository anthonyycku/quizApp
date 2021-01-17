class App extends React.Component {
    state = {
        points: 0
    };

    playAgain = () => {
        this.setState({ points: 0 });
    };

    gameOver = () => {
        this.setState({ points: -1 });
    };

    incrementPoints = () => {
        const { points } = this.state;
        this.setState({ points: points + 1 });
    };

    decrementPoints = () => {
        const { points } = this.state;
        this.setState({ points: points - 1 });
    };

    render() {
        const { points } = this.state;

        if (points > -1 && points < 10) {
            return (
                <Game
                    incrementPoints={this.incrementPoints}
                    decrementPoints={this.decrementPoints}
                    points={this.state.points}
                    gameOver={this.gameOver}
                    playAgain={this.playAgain}
                />
            );
        } else if (points > 4) {
            return <Winner playAgain={this.playAgain} />;
        } else {
            return <Loser playAgain={this.playAgain} />;
        }
    } //End of render
} //End of class

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
