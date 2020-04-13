import React, { useCallback } from 'react';
import {clickCell, changeTurn} from './index'

export interface ITd {
    rowIndex: number
    cellIndex: number
    dispatch: (obj:any) => void
    cellData: string
}

const Td = ({rowIndex, cellIndex, dispatch, cellData }: ITd) => {

    const onClickTd = useCallback ( () => {
        console.log('onClickTd');
        dispatch(clickCell(rowIndex,cellIndex));
        dispatch(changeTurn);

    }, [])

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
}

export default Td