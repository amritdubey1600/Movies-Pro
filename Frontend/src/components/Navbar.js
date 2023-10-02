import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import CustomButton from './CustomButton';
import styled from 'styled-components';
import {Button, Stack,Typography} from '@mui/material';

const StyledLink = styled(Link)`
    margin-right: 5px;
    font-size: 1.25rem;
    &:hover {
        color: #fc3;
    }
`;


const Navbar =  ()=>{

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick =()=>{
        logout();
    }

    return(<header>
        <div className="navbar">
        <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={2} // Add spacing between children
        >
            <Link to="/">
                <Typography variant="h4" sx={{color:'#fc3'}}>Movies Pro</Typography>
            </Link>
            <nav>
                {user && (
                <div>
                    <StyledLink to="/bookings">
                        Your Bookings
                    </StyledLink>

                    <Button
                        variant='outlined'
                        sx={{
                            margin: '4px',
                            borderColor: '#fc3',
                            color:'#fff',
                            top:'-2px',
                            '&:hover': {
                            bgcolor: '#fc3',
                            borderColor: '#fc3',
                            },
                        }}
                        onClick={handleClick}
                    >
                        Log Out
                    </Button> 
                </div>
                )}
                {!user && (
                <div>
                    <CustomButton content={<Link to='/signup'>Sign Up</Link>} />
                    <CustomButton content={<Link to='/login'>Log In</Link>} />
                </div>
                )}
            </nav>
        </Stack>
        </div>
    </header>);
}

export default Navbar;