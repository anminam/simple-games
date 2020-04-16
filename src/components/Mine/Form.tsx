import React, { useState, useCallback, useContext, useEffect } from 'react';
import { TableContext, startGame } from '.';

const Form = () => {

    const [row, setRow] = useState<number>(-1);
    const [cell, setCell] = useState<number>(-1);
    const [mine, setMine] = useState<number>(-1);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback( (e) => {
        setRow(e.target.value);
    }, []);
    const onChangeCell = useCallback( (e) => {
        setCell(e.target.value);
    }, []);
    const onChangeMine = useCallback( (e) => {
        setMine(e.target.value);
    }, []);
    const onClickButon = useCallback(() => {
        dispatch(startGame({row,cell,mine}));
    }, [row, cell, mine]);

    useEffect(() => {
        setRow(10)
        setCell(10)
        setMine(10)
    }, [])
    
    return (
        <div className="Form">
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
            <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
            <button type="button" onClick={onClickButon}>시작</button>
        </div>
    )
}

export default Form;