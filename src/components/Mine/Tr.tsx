import React from 'react';
import Td from './Td';

interface ITr {
    items: number[]
    rowIndex: number
}
const Tr = ({ items, rowIndex }: ITr) => {

    return (
        <tr className="Tr">
            {
                items.map((item, i) => <Td key={i} item={item} rowIndex={rowIndex} cellIndex={i}/> )
            }
        </tr>
    )
}

export default Tr;