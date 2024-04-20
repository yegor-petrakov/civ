import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { SquarePen } from 'lucide-react'

import _Tooltip from '../_Tooltip'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Vault = ({ vault }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/dash/vaults/${vault.id}`);
    };

    const groupedCodes = vault.includes.reduce((groups, code) => {
        const { code_index } = code;
        if (code_index) {
            groups[code_index] = (groups[code_index] || 0) + 1;
        }
        return groups;
    }, {});

    const renderedCodes = Object.entries(groupedCodes).map(([codeIndex, count]) => {
        const code = vault.includes.find(code => code.code_index === codeIndex);
        return (
            <li key={codeIndex}>
                {count > 1
                    ? (
                        <Link to={`/dash/codes/${code.code_id}`} className='flex bg-white gap-1 border pl-1 rounded-sm shadow-sm'>
                            {codeIndex}
                            <span className='flex items-center bg-blue-500 px-2 text-white text-xs rounded-r-sm'>
                                {count}
                            </span>
                        </Link>
                    )
                    : (
                        <Link to={`/dash/codes/${code.code_id}`} className='flex gap-1 bg-white border px-1 rounded-sm shadow-sm'>
                            {codeIndex}

                        </Link>
                    )
                }

            </li>
        );
    });

    return (
        // <li className='flex gap-1'>
        //     <div className='flex'>
        //         <span className='border px-2 py-1'>{vault.vault_name}</span>
        //         <ul>{renderedCodes}</ul>
        //     </div>
        //     <button
        //         onClick={handleEdit}
        //         className='bg-slate-400 px-1 rounded-sm text-white border'
        //     >
        //         Edit
        //     </button>
        // </li>


        <TableRow className="hover:bg-slate-200">
            <TableCell>
                <div className='flex items-center gap-2'>
                    {vault.vault_name}
                    <_Tooltip note={vault.note} />
                </div>
            </TableCell>
            <TableCell>
                <ul className='flex gap-2 flex-wrap'>{renderedCodes}</ul>
            </TableCell>
            <TableCell><button onClick={handleEdit}><SquarePen className='w-4 h-4 text-slate-500' /></button></TableCell>
        </TableRow>


    );
};

export default Vault;
