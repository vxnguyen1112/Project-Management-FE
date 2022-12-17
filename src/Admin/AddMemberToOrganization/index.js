/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import api from 'Services/apiPostfile';
import { CSVLink } from "react-csv";
import { store } from 'store';
import history from 'browserHistory';
import { toast } from 'react-project-management';
import './styles.css';

const csvData = [
  ["Username", "Password", "Email","DisplayName","FirstName","LastName"],
  ["vanketk191", "Ket@15120011", "vanketk191@gmail.com","Ket Le","Ket","Le"]
];
const AddMember = () => {
  const fileTypes = ['CSV'];
  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);
  const fileReader = new FileReader();
  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleChange = (file) => {
    setFile(file);
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const handleOnSubmit =async e => {
    e.preventDefault();
    try {
      const formdata=new  FormData();
      formdata.append('file',file);
      await  api.post(`/api/users/organizations/${store.getState().auth.user.organizationId}/members`,formdata);
      toast.success('Add member successfully');
      history.push('/admin');
    } catch (error) {
      toast.error(error);
    }
  };
  const headerKeys = Object.keys(Object.assign({}, ...array));
  return (

    <div style={{ textAlign: 'center' }}>
      <p>Please download example file add member:</p>
      <CSVLink  className="snip1457" filename='add-member-example.csv'  data={csvData} enclosingCharacter="">Download me</CSVLink>
   { file?  <table className="styled-table">
        <thead>
          <tr key="header">
            {headerKeys.map((key) => (
              <th style={{textAlign:'center'}}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>:null}
      <form className="form">
        <FileUploader
          className="drop-container"
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <p>{file ? `File name: ${file.name}` : 'No files uploaded yet'}</p>
        <button
          className="formFieldButton"
          onClick={e => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
       
      </form>
    </div>
  );
};
export default AddMember;
