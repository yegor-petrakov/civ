import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCodeById, deleteCode, updateCode } from '../../api/codes';

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



const EditCode = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [code, setCode] = useState(null);
    const [loading, setLoading] = useState(true);

    const [codeIndex, setCodeIndex] = useState('');
    const [codeName, setCodeName] = useState('');
    const [legacyCodeName, setLegacyCodeName] = useState('')
    const [stockLevel, setStockLevel] = useState('empty')
    const [note, setNote] = useState('');

    useEffect(() => {
        getCodeById({ id, setLoading, setCode });
    }, [id]); // Make sure to include id in the dependency array to fetch data when id changes

    useEffect(() => {
        if (code) {
            setCodeIndex(code.code_index);
            setCodeName(code.code_name);
            setLegacyCodeName(code.legacy_code_name)
            setStockLevel(code.stock_level)
            setNote(code.note ? code.note : '');
            setLoading(false);
        }
    }, [code]); // Update codeIndex and codeName when code changes

    const handleCodeIndexChange = (e) => setCodeIndex(e.target.value);
    const handleCodeNameChange = (e) => setCodeName(e.target.value);
    const handleLegacyCodeNameChange = (e) => setLegacyCodeName(e.target.value);
    const handleStockLevelChange = (e) => setStockLevel(e);
    const handleNoteChange = (e) => setNote(e.target.value);

    const handleBack = () => navigate(-1)

    const handleConfirm = async () => {
        await updateCode({
            id,
            code_index: codeIndex,
            code_name: codeName,
            legacy_code_name: legacyCodeName,
            stock_level: stockLevel,
            note,
            navigate
        });
    };

    const handleDelete = async () => {
        await deleteCode({ id, navigate });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!code) {
        return <div>Error: code not found</div>;
    }

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
                        Редактирование маркировки
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
                    <Select id='stock_level' value={stockLevel} onValueChange={handleStockLevelChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите количество" />
                        </SelectTrigger>
                        <SelectContent>
                            {options}
                        </SelectContent>
                    </Select>
                </div>

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
                        onClick={handleDelete}
                        variant='destructive'
                    >
                        Удалить
                    </Button>
                </div>
            </Card>

        </div>
    );
};

export default EditCode;
