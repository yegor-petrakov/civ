import React, { useState } from 'react'
import { createUser } from '../../api/users'
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



const CreateUser = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleRoleChange = (e) => setRole(e)

    const handleBack = () => navigate('/dash/users')

    const handleConfirm = () => createUser({
        username,
        password,
        role,
        navigate
    })

    const options = Object.values(UserRoles).map(role => {
        return (
            <SelectItem key={role} value={role}>{role}</SelectItem>
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
                        Создание пользователя
                    </h1>
                </div>
            </div>
            <Card>
                <CardContent className="p-4">
                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className='flex flex-col gap-2 mb-4'>
                            <Label htmlFor="username">Имя пользователя</Label>
                            <Input
                                type="text"
                                id='username'
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>

                        <div className='flex flex-col gap-2 mb-4'>
                            <Label htmlFor="vault_name">Пароль</Label>
                            <Input
                                type="password"
                                id='vault_name'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>




                        <div className='flex flex-col mb-4'>
                            <Label htmlFor="roles" className="mb-2">Роль</Label>
                            <Select id='roles' onValueChange={handleRoleChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите роль" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options}
                                </SelectContent>
                            </Select>
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

export default CreateUser