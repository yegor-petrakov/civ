import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Code from './Code';

import { getAllCodes } from '../../api/codes';

import { useNavigate } from 'react-router-dom'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"

import { Button } from "../ui/button"

import { ChevronLeft } from "lucide-react"




const CodesList = () => {
    const navigate = useNavigate()

    const [codes, setCodes] = useState([]);

    const handleAddNewCode = () => navigate('/dash/codes/new')

    const handleBack = () => navigate('/dash')

    useEffect(() => {
        getAllCodes({ setCodes });
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
                    <div className='flex gap-2 items-center'>
                        <h1 className="text-slate-950 text-2xl font-bold tracking-tight">
                            Маркировки
                        </h1>
                        <span className='font-normal'>({codes.length})</span>
                    </div>
                </div>
                <Button
                    onClick={handleAddNewCode}
                >
                    Создать
                </Button>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Индекс</TableHead>
                                <TableHead>Название</TableHead>
                                <TableHead>Старая маркировка</TableHead>
                                <TableHead>Остатки</TableHead>
                                <TableHead>Количество</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {codes.map(code => (
                                <Code key={code.id} code={code} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

    )
}

export default CodesList