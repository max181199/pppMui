import '@babel/polyfill';
import 'whatwg-fetch';
import 'sanitize.css/sanitize.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Zoom from '@material-ui/core/Zoom';


const theme = createMuiTheme({
  breakpoints: {
      values: {
      xs: 0,
      sm: 750,
      md: 1400,
      lg: 1900,
      xl: 2800,
      },  
  },
  palette: {
      primary: {
          main: blue[800],
      },
      secondary: {
          main: blue[900],
      },
  },
  overrides: {
    MuiTooltip : {
      tooltip : {
        fontSize : 'calc(6px + 0.8vw)'
      }
    },
    MuiMenu : {
      paper : {
        maxHeight: 'calc( 33vh )'
      }
    }
  },
  props: {
    MuiTooltip : {
      arrow : true,
      enterDelay : 700,
      enterNextDelay : 700,
      TransitionComponent : Zoom,
      placement : "bottom" 
    },
    MuiInputLabel : {
      shrink : true,
    },
  },
});

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme = { theme }>
          <App />
        </MuiThemeProvider>
      </StylesProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
);
