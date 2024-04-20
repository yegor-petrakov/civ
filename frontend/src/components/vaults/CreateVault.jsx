import React, { useState } from 'react'
import { createVault } from '../../api/vaults'
import { useNavigate } from 'react-router-dom'

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



const CreateVault = () => {
    const navigate = useNavigate()

    const [vaultName, setVaultName] = useState('')
    const [note, setNote] = useState('')

    const handleVaultNameChange = (e) => setVaultName(e.target.value)
    const handleNoteChange = (e) => setNote(e.target.value)

    const handleBack = () => navigate('/dash/vaults')

    const handleConfirm = () => createVault({
        vault_name: vaultName,
        note,
        navigate
    })

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
                        Создание ячейки
                    </h1>
                </div>
            </div>
            <Card>
                <CardContent className="p-4">
                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className='flex flex-col gap-2 mb-4'>
                            <Label htmlFor="vault_name">Название</Label>
                            <Input
                                type="text"
                                id='vault_name'
                                value={vaultName}
                                onChange={handleVaultNameChange}
                            />
                        </div>

                        <div className='flex flex-col gap-2 mb-4'>
                            <Label htmlFor="note">Заметка</Label>
                            <Textarea
                                id='note'
                                value={note}
                                onChange={handleNoteChange}
                            />

                        </div>

                        <div>
                            <Button
                                onClick={handleConfirm}
                            >
                                Создать
                            </Button>
                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>
    );
}

export default CreateVault