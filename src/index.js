import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';

import {firebase} from './Service/employeeService'
import {FirebaseContext} from './context/firebase'

ReactDOM.render(
  <>
   <FirebaseContext.Provider value={{firebase}}>
      <App />
   </FirebaseContext.Provider>
    </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
