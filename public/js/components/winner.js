const Winner = props => {
    return (
        <div>
            <div id="container" style={{ padding: "10px", width: "800px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 className="winner" style={{ color: "green" }}>CONGRATULATIONS</h1>

                <h2 className="winner" style={{ color: "red" }}>You reached 10 points!</h2>

                <img src="https://media1.tenor.com/images/c9c828a12a5cfb5133479d4eac74c9f6/tenor.gif?itemid=15171828" alt="" />
                <br />
                <button onClick={props.playAgain} className="btn btn-primary" style={{ width: "400px" }}>Play Again?</button>
            </div>
        </div>
    )
}
