import React, { useState } from 'react';
import { createCode } from '../../api/codes';
import { useNavigate } from 'react-router-dom';


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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"





const CreateCode = () => {
    const navigate = useNavigate();

    const [codeIndex, setCodeIndex] = useState('');
    const [codeName, setCodeName] = useState('');
    const [legacyCodeName, setLegacyCodeName] = useState('');
    const [stockLevel, setStockLevel] = useState('');
    const [note, setNote] = useState('');

    const handleCodeIndexChange = (e) => setCodeIndex(e.target.value);
    const handleCodeNameChange = (e) => setCodeName(e.target.value);
    const handleLegacyCodeNameChange = (e) => setLegacyCodeName(e.target.value);
    const handleStockLevelChange = (e) => setStockLevel(e);
    const handleNoteChange = (e) => setNote(e.target.value);

    const STOCK_LEVEL = {
        empty: "empty",
        low: "low",
        high: "full"
    }

    const options = Object.values(STOCK_LEVEL).map(status => {
        return (
            <SelectItem key={status} value={status}>{status}</SelectItem>
        )
    })

    const handleBack = () => navigate('/dash/codes')

    const handleConfirm = () =>
        createCode({
            code_index: codeIndex,
            code_name: codeName,
            legacy_code_name: legacyCodeName,
            stock_level: stockLevel,
            note,
            navigate
        });

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
                        Создание маркировки
                    </h1>
                </div>
            </div>

            <Card className="p-4">
                <div className='flex flex-col mb-4'>
                    <Label htmlFor="code_index" className="mb-2">Индекс</Label>
                    <Input
                        type="text"
                        id='code_index'
                        value={codeIndex}
                        onChange={handleCodeIndexChange}
                    />
                </div>

                <div className='flex flex-col mb-4'>
                    <Label htmlFor="code_name" className="mb-2">Маркировка</Label>
                    <Input
                        type="text"
                        id='code_name'
                        value={codeName}
                        onChange={handleCodeNameChange}
                    />
                </div>

                <div className='flex flex-col mb-4'>
                    <Label htmlFor="code_name" className="mb-2">Старая маркировка</Label>
                    <Input
                        type="text"
                        id='code_name'
                        value={legacyCodeName}
                        onChange={handleLegacyCodeNameChange}
                    />
                </div>

                <div className='flex flex-col mb-4'>
                    <Label htmlFor="stock_level" className="mb-2">Количество</Label>
                    <Select id='stock_level' onValueChange={handleStockLevelChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите количество" />
                        </SelectTrigger>
                        <SelectContent>
                            {options}
                        </SelectContent>
                    </Select>
                </div>

                {/* <div className='flex flex-col mb-4'>
                    <Label htmlFor="stock_level" className="mb-2">Количество</Label>
                    <select
                        className='flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300'
                        id="stock_level"
                        value={stockLevel}
                        onChange={handleStockLevelChange}
                    >
                        {options}
                    </select>
                </div> */}

                <div className='flex flex-col mb-4'>
                    <Label htmlFor="note" className="mb-2">Заметка</Label>
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
            </Card>

        </div>
    );
}

export default CreateCode;
