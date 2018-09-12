import * as React from 'react';

interface SquareProps {
    value?: string;
    onClick: () => any;
}

const Square: React.SFC<SquareProps> = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;