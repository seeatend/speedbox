import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* ------------Material UI classes-----------*/
import { createMuiTheme } from 'material-ui/styles/';
import { createPalette } from 'material-ui/styles/';
import red from 'material-ui/colors/red';

/* ------------Custom inports----------------*/
import store from './core/store';
import Routes from './routes';
import Login from './pages/app/login/';
import AdminLayout from './pages/admin/';

injectTapEventPlugin();

const muiTheme = createMuiTheme({
  themeName: 'Grey Theme',
  palette: {
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const IndexRoutes = (
  <Switch>
    <Route key="login" exact path="/login" component={Login} />
    <Route key="seller_main" path="/" component={AdminLayout} />
  </Switch>
);

render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <Router>{IndexRoutes}</Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
