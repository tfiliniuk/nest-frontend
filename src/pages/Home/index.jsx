import {useEffect} from 'react';
import Box from '@mui/material/Box';
import axiosInstance from '../../api/axios';
import {Header} from '../../components/Header';

export const Home = () => {
    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/');

            console.log('from home component', response.data);
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    };

    // useEffect(() => {
    //     fetchUser();
    // }, []);
    return (
        <Box sx={{bgcolor: 'background.default'}} id='test'>
            <Header />
            <div>Home</div>
        </Box>
    );
};
