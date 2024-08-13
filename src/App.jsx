import CssBaseline from '@mui/material/CssBaseline';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {alpha} from '@mui/material';

import getLPTheme from './themes/getLPTheme';

import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Registration} from './pages/Registration';
import {Profile} from './pages/Profile';
import {AuthProvider} from './context/AuthContext';
import {PrivateRoute} from './components/PrivateRoute';

function App() {
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
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/registration' element={<Registration />} />

                            <Route
                                path='/profile'
                                element={
                                    <PrivateRoute>
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
