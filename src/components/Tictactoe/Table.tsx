import React, { Dispatch } from 'react';
import { IAction }from './index';
import Tr from './Tr';

interface ITable {
    onClick: () => void
    tableData: string[][]
    dispatch: Dispatch<IAction>
}
const Table = ({onClick, tableData, dispatch}:ITable) => {

    return (
        <table onClick={onClick}>
            <thead>

            </thead>
            <tbody>
                {Array(tableData.length).fill('').map((item, i) => <Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />)}
            </tbody>
        </table>
    )
}

export default Table;