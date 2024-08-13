import {useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import {useAuth} from '../../context/AuthContext';

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};
export const Header = () => {
    // let location = useLocation();
    // console.log('loc', location);
    let navigate = useNavigate();
    const auth = useAuth();

    return (
        <AppBar
            position='static'
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
            }}>
            <Container maxWidth='lg'>
                <Toolbar
                    variant='regular'
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    })}>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            ml: '-18px',
                            px: 0,
                        }}>
                        <img
                            src={
                                'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                            }
                            style={logoStyle}
                            alt='logo of sitemark'
                            onClick={() => navigate('/')}
                        />
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <MenuItem sx={{py: '6px', px: '12px'}}>
                                <Typography variant='body2' color='text.primary'>
                                    Features
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{py: '6px', px: '12px'}}>
                                <Typography variant='body2' color='text.primary'>
                                    Testimonials
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{py: '6px', px: '12px'}}>
                                <Typography variant='body2' color='text.primary'>
                                    Highlights
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{py: '6px', px: '12px'}}>
                                <Typography variant='body2' color='text.primary'>
                                    Pricing
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{py: '6px', px: '12px'}}>
                                <Typography variant='body2' color='text.primary'>
                                    FAQ
                                </Typography>
                            </MenuItem>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            gap: 0.5,
                            alignItems: 'center',
                        }}>
                        <Button color='primary' variant='text' size='small' onClick={() => navigate('/login')}>
                            Sign in
                        </Button>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            onClick={() => navigate('/registration')}>
                            Sign up
                        </Button>
                        <Button
                            color='primary'
                            variant='contained'
                            size='small'
                            onClick={() => {
                                auth.logout();
                                navigate('/login');
                            }}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
