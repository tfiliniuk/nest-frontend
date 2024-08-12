import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Header} from '../../components/Header';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {validateEmail} from '../../utilities/validateEmail';
import axiosInstance from '../../api/axios';

const PasswordErrorMessage = () => {
    return <p className='FieldError'>Password should have at least 8 characters</p>;
};

export const Registration = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState({
        value: '',
        isTouched: false,
    });

    const getIsFormValid = () => {
        return username && validateEmail(email) && password.value.length >= 6;
    };

    const handleSubmit = async () => {
        try {
            await axiosInstance.post('/auth/signup', {
                email,
                username,
                password: password.value,
            });
            navigate('/login');
        } catch (error) {
            console.log('errro while register', error);
        }
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
                        Registration
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
                            label='User Name'
                            variant='outlined'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label='Email'
                            variant='outlined'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label='Password'
                            variant='outlined'
                            value={password.value}
                            onChange={(e) =>
                                setPassword({
                                    value: e.target.value,
                                    isTouched: true,
                                })
                            }
                        />
                    </Box>
                    {password.isTouched && password.value.length < 6 ? <PasswordErrorMessage /> : null}
                    <Box
                        sx={{
                            pt: {xs: 4, sm: 12},
                        }}>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            onClick={handleSubmit}
                            disabled={!getIsFormValid()}>
                            Create account
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};
