import React from 'react';
import Td from './Td';

interface ITr {
    items: number[]
}
const Tr = ({items}:ITr) => {

    return(
        <tr className="Tr">
            {
                items.map((item, i) => <Td key={i} item={item} /> )
            }
        </tr>
    )
}

export default Tr;