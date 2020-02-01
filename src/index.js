import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Typography from 'typography';
import moragaTheme from 'typography-theme-moraga';
moragaTheme.baseFontSize = '15px'; // was 20px.

// Inject typography styles into global stylesheet
const typography = new Typography(moragaTheme)
typography.injectStyles();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
