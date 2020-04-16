import React, { useContext, useCallback } from 'react';
import { TableContext, CODE, openCell, normalCell, flagCell, questionCell, clickMine } from '.';

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
            return code || '';
    }
}
const Td = ({ item, rowIndex, cellIndex }:ITd) => {

    const { dispatch, halted } = useContext(TableContext);


    const onClickCell = useCallback(() => {
        if (halted) {
            return;
        }
        switch(item) {
            case CODE.NORMAL:
                dispatch(openCell(rowIndex, cellIndex));
                return;
            case CODE.MINE:
                dispatch(clickMine(rowIndex, cellIndex));
                return;
            default:
                return;
        }

    }, [halted, item, rowIndex, cellIndex]);

    const onRightClick = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }

        switch(item) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch(normalCell(rowIndex,cellIndex))
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch(flagCell(rowIndex,cellIndex))
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch(questionCell(rowIndex,cellIndex))
                return;
            default:
                return;
        }

    }, [halted, item, rowIndex, cellIndex]);
    
    return (
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