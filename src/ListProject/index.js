/* eslint-disable no-nested-ternary */
import React  from 'react';
import { useTable, useSortBy } from 'react-table';
import "./styles.css";

const  ListProject=()=> {

 const data = React.useMemo(
     () => [
       {
         col1: 'Frontend',
         col2: '27',
         col3: 'rain',
         col4:"oke"
       },
       {
         col1: 'Backend',
         col2: '30',
         col3: 'rain',
         col4:"oke"
       },
       {
         col1: 'Mobile',
         col2: '23',
         col3: 'rain',
         col4:"oke"
       },
     ],
     []
 )

 const columns = React.useMemo(
     () => [
       {
         Header: 'Name',
         accessor: 'col1', // accessor is the "key" in the data
       },
       {
         Header: 'Key',
         accessor: 'col2',
       },
       {
         Header: 'Type',
         accessor: 'col3', // accessor is the "key" in the data
       },
       {
        Header: 'list',
        accessor: 'col4', // accessor is the "key" in the data
      },
     ],
     []
 )

 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({ columns, data }, useSortBy);

 return (

     
     // eslint-disable-next-line react/jsx-filename-extension
     <div className='listproject'>
     <div className='header'>
     <img src="../../favicon.png" alt="" />
     </div>
     <div className='main'>
      <p>Project</p>
       <table className='styled-table' {...getTableProps()} >
         <thead>
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps(column.getSortByToggleProps())}
                   >
                     {column.render('Header')}
                     <span>
                       {column.isSorted
                           ? column.isSortedDesc
                               ? '🔽'
                               : '🔼'
                           : ''}
                    </span>
                   </th>
               ))}
             </tr>
         ))}
         </thead>
         <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                       >
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
     </div>
     </div>
 );
}

export default ListProject;