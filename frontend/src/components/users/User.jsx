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

const User = ({ user }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/dash/users/${user.id}`);
    };

    return (
        <TableRow className="hover:bg-slate-200">
            <TableCell>
                <div className='flex items-center gap-2'>
                    {user.username}
                    <div>({user.role})</div>
                </div>
            </TableCell>
            <TableCell>
                <div className='flex justify-end'>
                    <button onClick={handleEdit}><SquarePen className='w-4 h-4 text-slate-500' /></button>
                </div>
            </TableCell>
        </TableRow>

    )
};

export default User;
