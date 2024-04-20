import React from 'react'
import axios from './axios';
import { useNavigate } from 'react-router-dom'

const getAllVaults = ({ setVaults }) => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/vaults');
            setVaults(response.data);
        } catch (error) {
 
        }
    };

    fetchData();

    // Cleanup function to cancel any pending requests if the component unmounts or rerenders
    return () => {
        // Implement cleanup if necessary
    };
}

const getVaultById = ({ id, setLoading, setVault }) => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`/vaults/${id}`);
            setVault(response.data);
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

const createVault = async ({ vault_name, note, navigate }) => {
    try {

        const response = await axios.post(`/vaults`, {
            vault_name,
            note
        });


        navigate('/dash/vaults')
    } catch (error) {
   
    }
};


const deleteVault = async ({ id, navigate }) => {
    try {
        const response = await axios.delete(`/vaults/${id}`);
        navigate('/dash/vaults')
    } catch (error) {

    }
};

const updateVault = async ({ id, vault_name, note, navigate }) => {
    try {

        const response = await axios.patch(`/vaults/${id}`, {
            id,
            vault_name,
            note
        });

        navigate('/dash/vaults')
    } catch (error) {
  
    }
};



// CIV

const getAllCivs = ({ setCivs }) => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/codesinvaults');
            setCivs(response.data);
        } catch (error) {
     
        }
    };

    fetchData();

    // Cleanup function to cancel any pending requests if the component unmounts or rerenders
    return () => {
        // Implement cleanup if necessary
    };
}


const createCiv = async ({ code_id, vault_id }) => {
    try {

        const response = await axios.post(`/codesinvaults`, {
            code_id,
            vault_id
        });
   

        // navigate('/dash/vaults')
    } catch (error) {
   
    }
};

const deleteCiv = async (id) => {
    try {
        const response = await axios.delete(`/codesinvaults/${id}`);
        // Optionally, you can check the response status and handle it accordingly
        if (response.status === 200) {
     
        } else {
        
        }
    } catch (error) {
   
    }
};


export { getAllVaults, getVaultById, createVault, deleteVault, updateVault, getAllCivs, createCiv, deleteCiv }