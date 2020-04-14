import React, { useContext } from 'react';
import Td from './Td';
import { TableContext } from '.';

interface ITr {
    items: number[]
    rowIndex: number
}
const Tr = ({ items, rowIndex }: ITr) => {
    const {tableData} = useContext(TableContext);

    return (
        <tr className="Tr">
            {
                items.map((item, i) => <Td key={i} item={item} rowIndex={rowIndex} cellIndex={i}/> )
            }
        </tr>
    )
}

export default Tr;