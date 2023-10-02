import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button } from "@mui/material";

const SignUp = () => {
    const [email,setEmail] = useState(''); 
    const [password,setPassword] = useState('');

    const { signup,error,isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email,password);
    }

    return ( <form className='signup' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

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
            Sign Up
        </Button>
        {error && <div className="error">{error}</div>}
    </form> );
}
 
export default SignUp;