import React, { useReducer, useEffect } from 'react';
import Table from './Table';

type IInitState = {
    winner: string;
    turn: string;
    tableData: string[][];
    recentCell: number[];
}
const initialState:IInitState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', '',],
        ['', '', '',],
        ['', '', '',]
    ],
    recentCell: [-1, -1]
}
export const SET_WINNER = 'SET_WINNER' as const;
export const CLICK_CELL = 'CLICK_CELL' as const;
export const CHANGE_TURN = 'CHANGE_TURN' as const;
export const RESET_GAME = 'RESET_GAME' as const;

export const setWinner = (payload:string) => {
    return {
        type:SET_WINNER,
        payload: payload
    }
}

export const clickCell = (row:number, cell:number) => {
    return {
        type: CLICK_CELL,
        row: row,
        cell: cell
    }
}

export const changeTurn = () => {
    return {
        type: CHANGE_TURN
    }
}

export const resetGame = () => {
    return {
        type: RESET_GAME
    }
}

export type IAction = 
    ReturnType<typeof setWinner> |
    ReturnType<typeof clickCell> |
    ReturnType<typeof changeTurn> |
    ReturnType<typeof resetGame>
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
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell]
            }
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'O' ? "X" : "O"
            }
        case RESET_GAME:
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', '',],
                    ['', '', '',],
                    ['', '', '',]
                ],
                recentCell: [-1, -1]
            } 
        default:
            return state;
    }
}
const Tictactoe = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, winner, recentCell, turn} = state;

    useEffect(() => {
        let win = false;
        const [row, cell] = recentCell;
        if (row < 0) {
            return
        }
        if (tableData[row][0] === turn&& tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn&& tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn&& tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn&& tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }

        if (win) {
            dispatch(setWinner(turn));
            dispatch(resetGame());
        } else {
            let all = true;
            tableData.forEach(row => {
                row.forEach((cell => {
                    if ( !cell ) {
                        all = false
                    }
                }))
            });

            if (all) {
                dispatch(resetGame());
            } else {
                dispatch(changeTurn())
            }
        }

    },[recentCell])

    // const onClickTable = useCallback(()=> {
    //     dispatch({type:SET_WINNER, payload: '0'})
    // },[]);

    return(
        <div className="TicTacToe">
            <Table onClick={()=>{}} tableData={tableData} dispatch={dispatch} />
            {winner} 의 승리
        </div>
    )
}

export default Tictactoe;