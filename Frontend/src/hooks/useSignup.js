import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useSignup = () =>{
    const [error,setError] = useState(null);
    const [isloading,setIsLoading] = useState(null);
    const navigate = useNavigate();

    const {dispatch} = useAuthContext();

    const signup = async (email,password) =>{
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://movies-pro-1qpo.onrender.com/api/user/signup',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            //save user to local storage
            localStorage.setItem('user',JSON.stringify(json));

            //update auth context
            dispatch({type: 'LOGIN', payload: json});

            setIsLoading(false);
            navigate('/');
        }
    }
    return { signup, isloading, error };
}
