import React, { useCallback, useEffect, useRef, memo } from 'react';
import {clickCell, changeTurn} from './index'

export interface ITd {
    rowIndex: number
    cellIndex: number
    dispatch: (obj:any) => void
    cellData: string
}

const Td = memo(({rowIndex, cellIndex, dispatch, cellData }:ITd) => {
    console.log('td');

    const ref = useRef<any>([]);
    useEffect(() => {
        console.log([rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]])
        console.log(cellData);
        ref.current = [rowIndex, cellIndex, dispatch, cellData]

    },[rowIndex, cellIndex, dispatch, cellData])

    const onClickTd = useCallback ( () => {
        console.log('onClickTd', cellData);
        if (cellData) {
            return;
        }
        
        dispatch(clickCell(rowIndex, cellIndex));

    }, [cellData])

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
})

export default Td