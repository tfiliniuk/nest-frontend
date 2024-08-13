import {useState} from 'react';
import {AxiosError} from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import {Header} from '../../components/Header';
import {useAuth} from '../../context/AuthContext';

export const Login = () => {
    const auth = useAuth();
    const [creadentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...creadentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            await auth?.login(creadentials.email, creadentials.password);
        } catch (error: any) {
            setOpen(true);
            if (error instanceof AxiosError) {
                setErrorMessage(error?.response?.data.message);
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Header />
            <Container
                id='pricing'
                sx={{
                    pt: {xs: 4, sm: 12},
                    pb: {xs: 8, sm: 16},
                    position: 'relative',
                    gap: {xs: 3, sm: 6},
                }}>
                <Box
                    sx={{
                        width: {sm: '100%'},
                        textAlign: {sm: 'center', md: 'center'},
                    }}>
                    <Typography variant='h3' gutterBottom sx={{fontFamily: 'Roboto'}}>
                        Login
                    </Typography>
                    <Box
                        component='form'
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                        noValidate
                        autoComplete='off'>
                        <TextField
                            label='Email'
                            name='email'
                            variant='outlined'
                            value={creadentials.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Password'
                            name='password'
                            variant='outlined'
                            value={creadentials.password}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box
                        sx={{
                            pt: {xs: 4, sm: 12},
                        }}>
                        <Button color='primary' variant='contained' size='small' onClick={handleSubmit}>
                            Sign in
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity='error' variant='filled' sx={{width: '100%'}}>
                    {errorMessage.toString()}
                </Alert>
            </Snackbar>
        </>
    );
};
