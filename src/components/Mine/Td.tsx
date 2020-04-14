import React from 'react';

interface ITd {
    item:number;
}
const Td = ({item}:ITd) => {

    return(
        <td className="Td">
            {item}
        </td>
    )
}

export default Td;