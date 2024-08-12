import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Header} from '../../components/Header';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export const Login = () => {
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
                        <TextField label='Email' variant='outlined' />
                        <TextField label='Password' variant='outlined' />
                    </Box>
                    <Box
                        sx={{
                            pt: {xs: 4, sm: 12},
                        }}>
                        <Button color='primary' variant='contained' size='small'>
                            Sign in
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};
