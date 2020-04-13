import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';
import { stringify } from 'querystring';

type IInitState = {
    winner: string;
    turn: string;
    tableData: string[][]
}
const initialState:IInitState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', '',],['', '', '',],['', '', '',]]
}
export const SET_WINNER = 'SET_WINNER' as const;
export const CLICK_CELL = 'CLICK_CELL' as const;

export const setWinner = () => {
    return {
        type:SET_WINNER,
        payload: '0'
    }
}

export const clickCell = (row:number, cell:number) => {
    return {
        type: CLICK_CELL,
        row: row,
        cell: cell
    }
}

// export const clickCell = (row:number, cell:number) => {
//     return {
//         type: CLICK_CELL,
//         row: row,
//         cell: cell
//     }
// }

export type IAction = 
    ReturnType<typeof setWinner> |
    ReturnType<typeof clickCell>
;

const reducer = (state: IInitState, action: IAction) => {
    switch(action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.payload
            }
        case CLICK_CELL:
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]
            tableData[action.row][action.cell] = state.turn
            return {
                ...state,
                tableData
            }
        default:
            return state;
    }
}
const Tictactoe = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const [winner, setWinner] = useState<string>('');
    const [turn, setTurn] = useState<string>('O');
    const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

    const onClickTable = useCallback(()=> {
        dispatch({type:SET_WINNER, payload: '0'})
    },[]);

    return(
        <div className="TicTacToe">
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {state.winner} 의 승리
        </div>
    )
}

export default Tictactoe;