import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Vault from './Vault';

import { getAllVaults } from '../../api/vaults';

import { useNavigate } from 'react-router-dom'


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { ChevronLeft } from "lucide-react"





const VaultsList = () => {
    const navigate = useNavigate()

    const [vaults, setVaults] = useState([]);

    const handleAddNewVault = () => navigate('/dash/vaults/new')

    const handleBack = () => navigate('/dash')

    useEffect(() => {
        getAllVaults({ setVaults });
    }, []);

    return (
        <div>
            <div className='mb-2 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <Button
                        onClick={handleBack} 
                        variant="ghost" 
                        size="icon"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <h1 className="text-slate-950 text-2xl font-bold tracking-tight">
                        Ячейки
                    </h1>
                </div>
                <Button
                    onClick={handleAddNewVault}
                >
                    Создать
                </Button>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Название</TableHead>
                                <TableHead>Содержит</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vaults.map(vault => (
                                <Vault key={vault.id} vault={vault} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

    )
}

export default VaultsList