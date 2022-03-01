import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';
import {useDispatch} from 'react-redux';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';


Register.propTypes = {
    closeDialog :PropTypes.func,
};


function Register(props) {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar()
    const handleSubmit = async (values)=>{
        delete values['retypePassword'];
        try{
            console.log("form submit",values);
            const action = register(values)
            const resuftAction = await dispatch(action);
            unwrapResult(resuftAction);
            const{closeDialog} = props ;
            if(closeDialog){
                closeDialog();
            }
            enqueueSnackbar('Register successfully',{variant: 'success'});

        }
        catch(error){
            console.log("fail" ,error.message);
            enqueueSnackbar(error.message,{variant: 'error'});
            
        }

    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;