import React, { useContext, useCallback } from 'react';
import { TableContext, CODE, openCell } from '.';

interface ITd {
    item: number;
    rowIndex: number;
    cellIndex: number;
}

const getTdStyle = (code: CODE) => {
    switch(code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444'
            }
        case CODE.OPENED:
            return {
                background: 'white'
            }
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {
                background: 'red'
            }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'blue'
            }
        default:
            return {
                background: 'white'
            }
    }
}

const getTdText = (code: CODE) => {
    switch(code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default: 
            return '';
    }
}
const Td = ({ item, rowIndex, cellIndex }:ITd) => {

    const { dispatch } = useContext(TableContext);


    const onClickCell = useCallback(() => {
        switch(item) {
            case CODE.NORMAL:
                dispatch(openCell(rowIndex, cellIndex));
                return;
            case CODE.MINE:
                dispatch(openCell(rowIndex, cellIndex));
                return;
            default:
                return;
        }

    }, [item]);

    const onRightClick = useCallback((e) => {
        e.preventDefault();

    },[]);
    
    return(
        <td
            style={getTdStyle(item)}
            className="Td"
            onClick={onClickCell}
            onContextMenu={onRightClick}
        >
            {getTdText(item)}
        </td>
    )
}

export default Td;