import {useState} from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@mui/material";

const Login = () => {
    
    const [email,setEmail] = useState(''); 
    const [password,setPassword] = useState('');
    
    const { login, error, isLoading } = useLogin(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email,password);
        await login(email,password);
    }

    return ( <form className='login' onSubmit={handleSubmit}>
        <h2>Log In</h2>

        <label>Email:</label>
        <input 
            type="email" 
            onChange={ e => setEmail(e.target.value)}
            value={email} 
        />

        <label>Password:</label>
        <input 
            type="password" 
            onChange={ e => setPassword(e.target.value)}
            value={password} 
        />

        <Button
            variant='outlined'
            sx={{
                marginTop: '5px',
                borderColor: '#fc3',
                color:'#fff',
                '&:hover': {
                    bgcolor: '#fc3',
                    borderColor: '#fc3',
                },
            }}
            disabled={isLoading}
            type='submit'
            >
            Log In
        </Button>
        <p>Don't have an account?<Link to='/signup' style={{textDecoration:'underline'}}>SignUp</Link></p>
        {error && <div className="error">{error}</div>}
    </form> );
}
 
export default Login;