import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export enum CODE {
  MINE = -10,
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
  timer: string
  result: string
  halted: boolean

}
const initialState:IState = {
  tableData: [[]],
  timer: '',
  result: '',
  halted: false
}

export const START_GAME = 'START_GAME' as const;
export const CLICK_MINE = 'CLICK_MINE' as const;
export const NORMAL_CELL = 'NORMAL_CELL' as const;
export const OPEN_CELL = 'OPEN_CELL' as const;
export const FLAG_CELL = 'FLAG_CELL' as const;
export const QUESTION_CELL = 'QUESTION_CELL' as const;

export const startGame = ({row, cell, mine}: IStartMine) => {
  return {
    type: START_GAME,
    row,
    cell,
    mine
  }
}

export const clickMine = (row:number, cell:number) => {
  return {
    type: CLICK_MINE,
    row,
    cell
  }
}

export const openCell = (row:number, cell:number) => {
  return {
    type: OPEN_CELL,
    row,
    cell
  }
}
export const normalCell = (row:number, cell:number) => {
  return {
    type: NORMAL_CELL,
    row,
    cell
  }
}
export const flagCell = (row:number, cell:number) => {
  return {
    type: FLAG_CELL,
    row,
    cell
  }
}
export const questionCell = (row:number, cell:number) => {
  return {
    type: QUESTION_CELL,
    row,
    cell
  }
}

type IAction = 
  ReturnType<typeof startGame> |
  ReturnType<typeof clickMine> |
  ReturnType<typeof openCell> |
  ReturnType<typeof normalCell> |
  ReturnType<typeof flagCell> |
  ReturnType<typeof questionCell>
;

const reducer = (state:IState, action:IAction) => {

  let tableData = null;
  switch (action.type) {
    
    case START_GAME:
      const obj = {
        row: action.row,
        cell: action.cell,
        mine: action.mine,
      }
      return {
        ...state,
        halted: false,
        tableData: planMine(obj)
      }
    case OPEN_CELL:
      tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      

      let around:number[] = []

      if (tableData[action.row-1]) {
        around = around.concat(
          tableData[action.row - 1][action.cell - 1],
          tableData[action.row - 1][action.cell],
          tableData[action.row - 1][action.cell + 1],
        )
      }

      around = around.concat(
        tableData[action.row][action.cell - 1],
        tableData[action.row][action.cell + 1]
      )

      if (tableData[action.row + 1]) {
        around = around.concat(
          tableData[action.row + 1][action.cell - 1],
          tableData[action.row + 1][action.cell],
          tableData[action.row + 1][action.cell + 1],
        )
      }
      const count = around.filter(v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
      tableData[action.row][action.cell] = count;
      console.log(count);

      return {
        ...state,
        tableData
      }
    case CLICK_MINE:
      tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE
      return {
        ...state,
        tableData,
        halted: true
      }

    case NORMAL_CELL:
      tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE
      } else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData
      }
    case FLAG_CELL:
      tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE
      } else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData
      }
    case QUESTION_CELL:
      tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        tableData[action.row][action.cell] = CODE.MINE
      } else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
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
  dispatch: React.Dispatch<IAction>,
  halted: boolean
}

export const TableContext = createContext<ITableContext>({
  tableData: [[]],
  dispatch: () => {},
  halted: false
})

const Mine = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const value = useMemo( () => ({
    tableData: state.tableData,
    dispatch,
    halted: state.halted
  }), [state.halted, state.tableData])

  return(
    <TableContext.Provider value={value}>
      <div className="Mine">
        <Form />
        <div>{state.timer}</div>
        {
          state.tableData.length > 0 &&
          <Table />
        }
        {
          state.tableData.length > 0 &&
          <div>{state.halted ? "끝": "진행중.."}</div>
        }
        
      </div>
    </TableContext.Provider>
  )
}

export default Mine;