const Loser = props => {
    return (
        <div>
            <div
                id='container'
                style={{
                    padding: '10px',
                    width: '800px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '2px grey solid'
                }}>
                <h1 className='loser' style={{ color: 'green' }}>
                    BETTER LUCK NEXT TIME
				</h1>

                <h2 className='loser' style={{ color: 'red' }}>
                    Go take a walk!
				</h2>

                <img
                    src='https://media.giphy.com/media/3ohhwH6yMO7ED5xc7S/giphy.gif'
                    alt=''
                />
                <br />
                <button style={{ width: "500px" }} onClick={props.playAgain} className='btn btn-primary'>
                    <h1>Try Again?</h1>
                </button>
            </div>
        </div>
    );
};
