import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getVaultById, deleteVault, updateVault } from '../../api/vaults';

import CivForm from './CivForm'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"

import { Input } from "../ui/input"
import { Label } from "../ui/label"


import { Button } from "../ui/button"

import { Textarea } from "@/components/ui/textarea"

import { ChevronLeft } from "lucide-react"


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



// import { useSound } from 'use-sound';
// import buttonClickSound from '../../sounds/success.mp3';





const EditVault = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [vault, setVault] = useState(null);
    const [loading, setLoading] = useState(true);

    const [vaultName, setVaultName] = useState('');
    const [note, setNote] = useState('');

    // const [playButtonClick] = useSound(buttonClickSound);

    useEffect(() => {
        getVaultById({ id, setLoading, setVault });
    }, [id]);

    useEffect(() => {
        if (vault) {
            setVaultName(vault.vault_name);
            setNote(vault.note ? vault.note : '');
            setLoading(false);
        }
    }, [vault]);

    const handleVaultNameChange = (e) => setVaultName(e.target.value);
    const handleNoteChange = (e) => setNote(e.target.value);

    const handleBack = () => navigate(-1)

    const handleConfirm = async () => {
        await updateVault({
            id,
            vault_name: vaultName,
            note,
            navigate
        });
        // playButtonClick()
    };

    const handleDelete = async () => {
        await deleteVault({ id, navigate });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!vault) {
        return <div>Error: vault not found</div>;
    }

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
                        Редактирование ячейки
                    </h1>
                </div>
            </div>

            <Card className="p-4">
                <div>

                    <div className='flex flex-col mb-4'>
                        <Label htmlFor="vault_name" className="mb-2">Название</Label>
                        <Input
                            type="text"
                            id='vault_name'
                            value={vaultName}
                            onChange={handleVaultNameChange}
                        />
                    </div>

                    <CivForm vaultId={vault.id} />

                    <div className='flex flex-col mb-4'>
                        <Label htmlFor="note" className="mb-2">Заметка</Label>
                        <Textarea
                            id='note'
                            value={note}
                            onChange={handleNoteChange}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <Button
                            onClick={handleConfirm}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            Удалить
                        </Button>
                    </div>
                </div>

            </Card>

            <h2 className="text-slate-950 text-xl font-bold tracking-tight mt-6">
                История изменений
            </h2>
            <Card className="mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Пользователь</TableHead>
                            <TableHead>Операция</TableHead>
                            <TableHead>Значение</TableHead>
                            <TableHead>Время</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>


                        <TableRow className="hover:bg-slate-200">
                            <TableCell>
                                Ilya
                            </TableCell>
                            <TableCell>
                                Добавил(а)
                            </TableCell>
                            <TableCell>
                                1.1.20.04
                            </TableCell>
                            <TableCell>
                                18.04.2024 / 21:00
                            </TableCell>
                        </TableRow>

                        <TableRow className="hover:bg-slate-200">
                            <TableCell>
                                YegorPetrakov
                            </TableCell>
                            <TableCell>
                                Удалил(а)
                            </TableCell>
                            <TableCell>
                                1.1.20.05
                            </TableCell>
                            <TableCell>
                                19.04.2024 / 8:00
                            </TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
            </Card>

        </div>
    );
};

export default EditVault;
