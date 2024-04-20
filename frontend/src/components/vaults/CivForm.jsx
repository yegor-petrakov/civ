import React, { useState, useEffect } from 'react';
import { getVaultById, getAllCivs, createCiv, deleteCiv } from '../../api/vaults';
import { getAllCodes } from '../../api/codes';

import { Link } from 'react-router-dom';

import { Input } from "../ui/input"
import { Label } from "../ui/label"


import { Button } from "../ui/button"

import { Separator } from "@/components/ui/separator"

import { Trash2 } from 'lucide-react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"



import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"


import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"



const CivForm = ({ vaultId }) => {
    const [loading, setLoading] = useState(true);
    const [vault, setVault] = useState('');
    const [codes, setCodes] = useState([]);
    const [civs, setCivs] = useState([]);
    const [leftover, setLeftover] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const handleLeftoverChange = (e) => {
        setLeftover(e);
        setIsButtonDisabled(e === '');
    };

    const handleConfirm = async () => {
        try {
            // Create the civ
            await createCiv({ code_id: leftover, vault_id: vaultId });

            // Refetch all codes and civs after creation
            await Promise.all([
                getAllCodes({ setCodes }),
                getAllCivs({ setCivs }),
            ]);
        } catch (error) {
        
        }
    }

    const handleDelete = async (id) => {
        try {
            // Delete the civ
            await deleteCiv(id);

            // Refetch all codes and civs after deletion
            await Promise.all([
                getAllCodes({ setCodes }),
                getAllCivs({ setCivs }),
            ]);
        } catch (error) {
     
        }
    }

    useEffect(() => {
        getVaultById({ id: vaultId, setLoading, setVault });
    }, [vaultId]);

    useEffect(() => {
        getAllCodes({ setCodes });
        getAllCivs({ setCivs });
    }, []);

    let content;

    if (loading) {
        content = <p>Loading...</p>;
    }

    if (vault) {
        // Filter civs based on vaultId
        const filteredCivs = civs.filter(civ => civ.vault_id === vaultId);

        // Rendering code items for each filtered record in civs
        const leftoverItems = filteredCivs.map((civ) => (
            <li key={civ.id} className='flex border items-center px-1 rounded-sm shadow-sm'>
                <Link to={`/dash/codes/${civ.code_data.id}`}>{civ.code_data.code_index}</Link>
                <Separator orientation='vertical' className="mx-1" />
                <Button
                    size='iconTiny'
                    variant='ghost'
                    onClick={() => handleDelete(civ.id)}
                >
                    <Trash2 />
                </Button>
            </li>
        ));


        content = (
            <Card className="p-4 mb-4">

                <div className="flex flex-col">
                    <Label htmlFor="civ" className="mb-2">Свободный материал</Label>
                    <div className='flex gap-2'>
                        {/* <select
                            id="civ"
                            onChange={handleLeftoverChange}
                            className='flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300'
                            value={leftover}
                        >
                            <option value="">Выбрать значение</option>
                            {Object.values(codes).map(code => (
                                <option key={code.id} value={code.id}>
                                    {code.code_index} {code.code_name}
                                </option>
                            ))}
                        </select> */}


                        <Select onValueChange={handleLeftoverChange}>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Выберите остаток" />
                            </SelectTrigger>
                            <SelectContent>
                                {codes ? Object.values(codes).map(code => (
                                    <SelectItem key={code.id} value={code.id}>
                                        {code.code_index} | {code.code_name}
                                    </SelectItem>
                                )) : '1'}
                            </SelectContent>
                        </Select>


                        <Button
                            variant='secondary'
                            onClick={handleConfirm}
                            disabled={isButtonDisabled}
                        >
                            Добавить
                        </Button>
                    </div>

                    <Separator className="my-4" />

                    <Label htmlFor="leftovers" className="mb-2">Остатки</Label>
                    <ul className='flex gap-2 flex-wrap'>
                        {leftoverItems}
                    </ul>

                </div>
            </Card>
        );
    }

    return content;
};


export default CivForm;
