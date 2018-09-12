import * as React from 'react';
import { Board } from './Board';
import Step from './Step';

interface GameProps {

}

type BoardState = {
    squares: Array<string>;
}

interface State {
    history: Array<BoardState>;
    stepNumber: number;
    xIsNext: boolean;
}

class Game extends React.Component<GameProps, State> {
    readonly state: State = {
        history: [{
            squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true
    };

    render() {
        const current: BoardState = this.state.history[this.state.stepNumber];
        const { history } = this.state;
        const winner = calculateWinner(current.squares);
        const noMoreMoves = isBoardFull(current.squares);

        const moves = history.map((_, move) => {
            return (
                <Step key={move} move={move} onClick={() => this.jumpTo(move)}/>
            );
        });

        let status: string;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (noMoreMoves) {
            status = 'Game over. Everybody loses!';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current: BoardState = history[history.length-1];
        const squares: Array<string> = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number) {
        this.setState({
            ...this.state,
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }
}

function calculateWinner(squares: Array<string>) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function isBoardFull(squares: Array<string>) {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) return false;
    }
    return true;
}

export default Game;