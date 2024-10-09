
import { useState } from 'react';
import * as DiceFaces from '../utils/diceFaces'

function Dice({ rollResultProp, isRolling }:
    {
        rollResultProp: number,
        isRolling: boolean
    }
) {

    type valueTranslatorType = {
        [key: number]: JSX.Element;
    };

    const rollToJSXDict: valueTranslatorType = {
        0: DiceFaces['blank'],
        1: DiceFaces['dot'],
        2: DiceFaces['secondFace'],
        3: DiceFaces['thirdFace'],
        4: DiceFaces['fourthFace'],
        5: DiceFaces['fifthFace'],
        6: DiceFaces['sixthFace']
    };

    const [renderedFace, setRenderedFace] = useState(rollToJSXDict[0]);

    setTimeout(() => {
        setRenderedFace(rollToJSXDict[rollResultProp])
    }, 80);

    return (
        <>
            <div className={`mt-15 ${isRolling ? 'animate-roll' : ''}`}>
                {renderedFace}
            </div>
        </>
    )
}

export default Dice;