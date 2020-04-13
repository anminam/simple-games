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
            {
                rowData.map((item, i) => <Td key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={item}/>)
            }
        </tr>
    )
}

export default Tr;