import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.jsx';
import GlobalStyle from './styles/global.js';
import { Index } from './Router/Index.jsx';
import { Auth } from './services/Auth.jsx';
  import { PrimeReactProvider } from 'primereact/api';

const App = () => {
  return (
  <PrimeReactProvider> 
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Auth>
        <Index />
      </Auth>
    </ThemeProvider>
    </PrimeReactProvider>
  );
};

export default App;
