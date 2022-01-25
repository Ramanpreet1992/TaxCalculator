import React from 'react'
import './Table.css';

const Table = (props) => {
    const int=0;

    const taxRates=props["taxRates"];
    const salary=props["salary"];
    const taxOwed=props["taxOwed"];
    const total=props["total"];
    const effectiveRate=props["effectiveRate"];
    const children=props["children"];
//****If Tax values are  does not have any value then table should not appear or tax slab should not appear****

    if(!(taxRates.length==1 || taxRates.length==0))
    {

        return (
            <div className="product-main">
                    <ul>
                    <li>
                         Yearly Salary:${(Number)(salary).toLocaleString()}
                      </li>
                    </ul>
                    <ul>
                    <label>Effective rate on the salary:{children[3]}%</label>               
                    <label>Total taxes owed on the salary:$ {(Number)(children[1]).toLocaleString()} </label>


                    </ul>
                <ul>
             <div className='card'>  
                 <table>
                     <thead>
                      <tr>
                      <th>TAX RATE</th>
                      <th>TAXABLE INCOME BRACKET</th>
                      <th>TAX OWED PER BRACKET</th>
                      </tr>
                     </thead>
                     <tbody>

    

    {taxRates.map((item,index) => {
     /**** Validation to check if max value is null. If null 
      then in tax slab above should appear****/

      if(!item.max)
      {
        item.max="above";   
      }
        
      return (
        <tr key={item.min}>
            {/***To display the numeric values comma separated and 
              to display the rate with maximum one decimal values for 
              consistency in UI ***/}

          <td>{ (item.rate*100).toFixed(1)}%</td>
          <td>
              
              { item.min.toLocaleString()} - {item.max.toLocaleString()}
          </td>
          <td>
             {Number(taxOwed[index]).toLocaleString()}
          </td>
          
          
        </tr>
      );
    })}
    </tbody>
     </table>
     </div>  
     </ul>
            </div>
        )
    }
    else{
        return( <div className="product-main"></div>);
    }
    
   
}

export default Table
