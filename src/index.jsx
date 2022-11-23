import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'App';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(process.env.REACT_APP_LICENSE_KEY);

ReactDOM.render(<App />, document.getElementById('root'));
