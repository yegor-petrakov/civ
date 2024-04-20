import React, {useEffect} from 'react'
// import axios from 'axios'

import axios, { axiosPrivate } from './axios';

import { useNavigate } from 'react-router-dom'

const getAllCodes = ({ setCodes }) => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/codes');
            setCodes(response.data);
        } catch (error) {

        }
    };

    fetchData();

    // Cleanup function to cancel any pending requests if the component unmounts or rerenders
    return () => {
        // Implement cleanup if necessary
    };
}




const getCodeById = ({ id, setLoading, setCode }) => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`/codes/${id}`);
            setCode(response.data);
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

const createCode = async ({ code_index, code_name, legacy_code_name, stock_level, note, navigate }) => {
    try {

        const response = await axios.post(`/codes`, {
            code_index,
            code_name,
            legacy_code_name,
            stock_level,
            note
        });
   

        navigate('/dash/codes')
    } catch (error) {
     
    }
};

const deleteCode = async ({ id, navigate }) => {
    try {
        const response = await axios.delete(`/codes/${id}`);
        navigate('/dash/codes')
    } catch (error) {

    }
};

const updateCode = async ({ id, code_index, code_name, legacy_code_name, stock_level, note, navigate }) => {
    try {



        const response = await axios.patch(`/codes/${id}`, {
            id,
            code_index,
            code_name,
            legacy_code_name,
            stock_level,
            note
        });


        navigate('/dash/codes')
    } catch (error) {

    }
};


export { getAllCodes, getCodeById, createCode, deleteCode, updateCode }