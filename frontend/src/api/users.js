import React, { useEffect } from 'react'
import axios from './axios';
import { useNavigate } from 'react-router-dom'


const getAllUsers = ({ axiosPrivate, setUsers, navigate }) => {

    const fetchData = async () => {
        try {
            const response = await axiosPrivate('/users');
            setUsers(response.data);
        } catch (err) {
         
            navigate('/', { state: { from: location }, replace: true });
        }
    };

    fetchData();

}


const getUserById = ({ id, setLoading, setUser }) => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`/users/${id}`);
            setUser(response.data[0]);
            setLoading(false)
        } catch (error) {
   
        }
    };

    fetchData();

    // Cleanup function to cancel any pending requests if the component unmounts or rerenders
    return () => {
        // Implement cleanup if necessary
    };
}

const createUser = async ({ username, password, role, navigate }) => {
    try {

        const response = await axios.post(`/users`, {
            username,
            password,
            role
        });
  

        navigate('/dash/users')
    } catch (error) {
    
    }
};


const updateUser = async ({ id, username, password, role, isActive, navigate }) => {
    try {

        let isPasswordProvided = password.length !== 0

        let response

        if (isPasswordProvided) {
            response = await axios.patch(`/users/${id}`, {
                id,
                username,
                password,
                role,
                is_active: isActive
            });
        } else {
            response = await axios.patch(`/users/${id}`, {
                id,
                username,
                password,
                role,
                is_active: isActive
            });
        }

        navigate('/dash/users')
    } catch (error) {
  
    }
};


const deleteUser = async ({ id, navigate }) => {
    try {
        const response = await axios.delete(`/users/${id}`);
        navigate('/dash/users')
    } catch (error) {
      
    }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser }