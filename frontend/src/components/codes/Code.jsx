import React from 'react';
import { useNavigate } from 'react-router-dom';

import Qty from '../Qty';

import { Link } from 'react-router-dom';

import { SquarePen } from 'lucide-react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import _Tooltip from '../_Tooltip';

const Code = ({ code }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/dash/codes/${code.id}`);
    };

    // Counting occurrences of each vault name
    const vaultCounts = {};
    code.in_vaults.forEach(vault => {
        vaultCounts[vault.vault_name] = (vaultCounts[vault.vault_name] || 0) + 1;
    });

    const renderedVaults = Object.keys(vaultCounts).map(vaultName => {
        const count = vaultCounts[vaultName];
        const vault = code.in_vaults.find(v => v.vault_name === vaultName);
        const vaultId = vault ? vault.vault_id : null; // Extract vault id

        return (
            <li key={vaultName}>
                {vaultName !== 'null' ? (
                    count > 1 ? (
                        <Link to={`/dash/vaults/${vaultId}`} className='flex gap-1 bg-white border pl-1 rounded-sm shadow-sm'>
                            {vaultName}
                            <span className='flex items-center bg-blue-500 px-2 text-white text-xs rounded-r-sm'>
                                {count}
                            </span>
                        </Link>
                    ) : (
                        <Link to={`/dash/vaults/${vaultId}`} className='flex gap-1 bg-white border px-1 rounded-sm shadow-sm'>
                            {vaultName}
                        </Link>
                    )
                ) : ('')}
            </li>
        );
    });

    return (
        <TableRow className=
            {`hover:bg-slate-200 rounded ${code.stock_level === 'low'
                ? 'bg-red-300 hover:bg-red-400'
                : ''}
            ${code.stock_level === 'full' ? 'bg-emerald-300 hover:bg-emerald-400' : ''}`}

        >
            <TableCell>{code.code_index}</TableCell>
            <TableCell>
                <div className='flex items-center gap-2'>
                    {code.code_name}
                    <_Tooltip note={code.note} />
                </div>
            </TableCell>
            <TableCell>{code.legacy_code_name}</TableCell>
            <TableCell><ul className='flex gap-2'>{renderedVaults}</ul></TableCell>
            <TableCell><Qty stockLevel={code.stock_level} /></TableCell>
            <TableCell><button onClick={handleEdit}><SquarePen className='w-4 h-4 text-slate-500' /></button></TableCell>
        </TableRow>
    );
};

export default Code;
