import React from 'react';
import './Table.css';

function Table({countries}) {
  return (
    <div className="Table">
  
{countries.map(({country,cases})=>(
<tr>
 <td >{country}</td>
  <td>{numeral(cases).format("0,0a")}</td>
 
</tr>
))}

</div>
  );
}

export default Table;
