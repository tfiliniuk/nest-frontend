import CssBaseline from '@mui/material/CssBaseline';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {alpha} from '@mui/material';

import getLPTheme from './themes/getLPTheme';

import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Registration} from './pages/Registration';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/registration',
            element: <Registration />,
        },
    ]);
    const LPtheme = createTheme(getLPTheme('light'));
    return (
        <ThemeProvider theme={LPtheme}>
            <CssBaseline />
            <Box
                sx={(theme) => ({
                    width: '100%',
                    paddingTop: '30px',
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                    backgroundSize: '100% 20%',
                    backgroundRepeat: 'no-repeat',
                })}>
                <RouterProvider router={router} />
            </Box>
        </ThemeProvider>
    );
}

export default App;
