import React, { useContext, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router';
import { useAuthDispatch, useAuthState, signOut } from '../../context';

const SignOut = () => {
    const userDetails=useAuthState();
    const dispatch=useAuthDispatch();
    const history=useHistory();
    useEffect(() => {
        try {
           signOut(dispatch);
           history.push('/signIn');
        } catch (error) {
            
        }
    }, [])
    return (
        <>
        {!!userDetails.token && <Redirect to="/"/>}
        </>
    )
}

export default SignOut
