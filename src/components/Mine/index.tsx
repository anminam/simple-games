import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export enum CODE {
  MINE,
  NORMAL,
  QUESTION,
  FLAG,
  QUESTION_MINE,
  FLAG_MINE,
  CLICKED_MINE,
  OPENED,
}

export interface IStartMine {
  row: number
  cell: number
  mine: number
}

const planMine = ({row, cell, mine}: IStartMine):number[][] => {
  const candidate = Array(row * cell).fill('').map((item, i) => i)
  const shuffle = [];
  while(candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i =0; i< row; i++){
    const rowData:number[] = [];
    data.push(rowData);
    for (let j = 0; j < row; j++){
      rowData.push(CODE.NORMAL)
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
}

interface IState {
  tableData: number[][]
  timer: string,
  result: string

}
const initialState:IState = {
  tableData: [[]],
  timer: '',
  result: ''
}

export const START_GAME = 'START_GAME' as const;
export const OPEN_CELL = 'OPEN_CELL' as const;

export const startGame = ({row, cell, mine}: IStartMine) => (
  {
    type: START_GAME,
    row,
    cell,
    mine
  }
)

export const openCell = (row:number, cell:number) => {
  return {
    type: OPEN_CELL,
    row,
    cell
  }
}

type IAction = 
  ReturnType<typeof startGame> |
  ReturnType<typeof openCell>
;

const reducer = (state:IState, action:IAction) => {
  switch (action.type) {
    case START_GAME:
      const obj = {
        row: action.row,
        cell: action.cell,
        mine: action.mine,
      }
      return {
        ...state,
        tableData: planMine(obj)
      }
    case OPEN_CELL:
        const tableData = [...state.tableData];
        tableData[action.row] = [...state.tableData[action.row]];
        tableData[action.row][action.cell] = CODE.OPENED
        return {
          ...state,
          tableData
        }
    default:
      return state;
  }
}

export interface ITableContext {
  tableData: number[][]
  dispatch: React.Dispatch<IAction>
}

export const TableContext = createContext<ITableContext>({
  tableData: [[]],
  dispatch: () => {}
})

const Mine = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo( () => ({
    tableData: state.tableData,
    dispatch
  }), [state.tableData])

  return(
    <TableContext.Provider value={value}>
      <div className="Mine">
        <Form />
        <div>{state.timer}</div>
        {
          state.tableData.length > 0 &&
          <Table />
        }
        
        <div>{state.timer}</div>


      </div>
    </TableContext.Provider>
  )
}

export default Mine;