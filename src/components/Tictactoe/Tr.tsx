import React, { Dispatch } from 'react';
import { IAction }from './index';
import Td from './Td';

interface ITr {
    rowIndex: number
    rowData: string[]
    dispatch: Dispatch<IAction>
}
const Tr = ({rowIndex, rowData, dispatch}:ITr) => {

    return (
        <tr>
            {rowData.fill('').map((item, i) => <Td key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={rowData[i]}/>)}
        </tr>
    )
}

export default Tr;