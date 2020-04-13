import React, { useCallback } from 'react';
import {clickCell} from './index'

export interface ITd {
    rowIndex: number
    cellIndex: number
    dispatch: (obj:any) => void
}

const Td = ({rowIndex, cellIndex, dispatch}: ITd) => {

    const onClickTd = useCallback ( () => {
        console.log('onClickTd');
        dispatch(clickCell);
        dispatch(clickCell);

    }, [])

    return (
        <td onClick={onClickTd}>td</td>
    )
}

export default Td