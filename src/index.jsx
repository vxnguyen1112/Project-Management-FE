import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'App';
import { registerLicense } from '@syncfusion/ej2-base';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
    dsn: "https://e61ab78479774e4487a67d3e68995ec5@o4504212444282880.ingest.sentry.io/4504212445593600",
    integrations: [new BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

// Registering Syncfusion license key
registerLicense(process.env.REACT_APP_LICENSE_KEY);

ReactDOM.render(<App />, document.getElementById('root'));
