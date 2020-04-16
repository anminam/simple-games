import React, { useContext } from 'react';
import { TableContext } from '.';
import Tr from './Tr';

const Table = () => {

    const { tableData } = useContext(TableContext);
    return (
        <div className="Table">
            <table>
                <thead></thead>
                <tbody>
                    {
                        tableData.map((item, i) => ( <Tr key={i} items={item} rowIndex={i}/> ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table;