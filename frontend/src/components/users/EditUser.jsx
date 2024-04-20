import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserById, updateUser, deleteUser } from '../../api/users';

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


import { UserRoles } from '@/config/UserRoles'


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Checkbox } from "@/components/ui/checkbox"

// import { useSound } from 'use-sound';
// import buttonClickSound from '../../sounds/success.mp3';





const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isActive, setIsActive] = useState('');

    // const [playButtonClick] = useSound(buttonClickSound);

    useEffect(() => {
        getUserById({ id, setLoading, setUser });
    }, [id]);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setPassword('');
            setRole(user.role);
            setIsActive(user.is_active)
            setLoading(false);
        }
    }, [user]);

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRoleChange = (e) => setRole(e);
    const toggleIsActive = () => setIsActive(prev => !prev);

    const options = Object.values(UserRoles).map(role => {
        return (
            <SelectItem key={role} value={role}>{role}</SelectItem>
        )
    })


    const handleBack = () => navigate(-1)

    const handleConfirm = async () => {
        await updateUser({
            id,
            username,
            password,
            role,
            isActive,
            navigate
        });
    };

    const handleDelete = async () => {
        await deleteUser({ id, navigate });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error: user not found</div>;
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
                        Редактирование пользователя
                    </h1>
                </div>
            </div>

            <Card className="p-4">
                <div>

                    <div className='flex flex-col mb-4'>
                        <Label htmlFor="username" className="mb-2">Имя пользователя</Label>
                        <Input
                            type="text"
                            id='username'
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>

                    <div className='flex flex-col mb-4'>
                        <Label htmlFor="password" className="mb-2">Пароль</Label>
                        <Input
                            type="password"
                            id='password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <div className='flex flex-col mb-4'>
                        <Label htmlFor="roles" className="mb-2">Роль</Label>
                        <Select id='roles' onValueChange={handleRoleChange} value={role}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите роль" />
                            </SelectTrigger>
                            <SelectContent>
                                {options}
                            </SelectContent>
                        </Select>
                    </div>


                    <div className='flex my-8 space-x-2'>
                        <Checkbox
                            id="is_active"
                            onCheckedChange={toggleIsActive}
                            checked={isActive}
                        />
                        <Label
                            htmlFor="is_active"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <span className='pr-1'>Пользователь {username}</span> {
                                isActive 
                                    ? (<span className='text-emerald-700 bg-emerald-200 p-1 rounded-sm border'>Активирован</span>) 
                                    : (<span className='text-red-500 bg-red-200 p-1 rounded-sm border'>Деактивирован</span>) }
                        </Label>
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

export default EditUser;
