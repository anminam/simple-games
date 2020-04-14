import React, { Dispatch, useRef, useEffect, memo } from 'react';
import { IAction }from './index';
import Td from './Td';

interface ITr {
    rowIndex: number
    rowData: string[]
    dispatch: Dispatch<IAction>
}
const Tr = memo(({rowIndex, rowData, dispatch}:ITr) => {
    console.log('tr render');

    const ref = useRef<any>([]);
    useEffect(() => {
        console.log([rowIndex === ref.current[0], rowData === ref.current[1], dispatch === ref.current[2]]);
        // console.log(cellData);
        ref.current = [rowIndex, rowData, dispatch]

    },[rowIndex, rowData, dispatch])
    return (
        <tr>
            {
                rowData.map((item, i) =><Td key={i} rowIndex={rowIndex} cellIndex={i} dispatch={dispatch} cellData={item}/>)
            }
        </tr>
    )
});

export default Tr;