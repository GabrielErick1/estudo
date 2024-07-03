
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.jsx';
import GlobalStyle from './styles/global.js';
import { Index } from './Router/Index.jsx';
import { Auth } from './services/Auth.jsx';
 

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Auth>
        <Index />
      </Auth>
    </ThemeProvider>
  );
};

export default App;
