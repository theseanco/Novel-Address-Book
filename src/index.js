import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Typography from 'typography';
import moragaTheme from 'typography-theme-moraga';
moragaTheme.baseFontSize = '15px'; // was 20px.

// Inject typography styles into global stylesheet
const typography = new Typography(moragaTheme)
typography.injectStyles();

// Load the app into root div
ReactDOM.render(<App />, document.getElementById('root'));