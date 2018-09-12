import * as React from 'react';

interface StepProps {
    move: number;
    onClick: (i: number) => void;
}

const Step: React.SFC<StepProps> = (props) => {
    const desc = props.move ?
        'Go to move #' + props.move :
        'Go to game start';

    return (
        <li>
            <button onClick={() => props.onClick(props.move)}>{desc}</button>
        </li>
    );
}

export default Step;