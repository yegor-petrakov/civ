import React, { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'

import { login } from '../../api/auth'
import { useNavigate } from 'react-router-dom'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const Login = () => {
    const { setAuth, persist, setPersist } = useAuth()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const togglePersist = () => {
        setPersist(prev => !prev)
    }

    useEffect(() => {
        localStorage.setItem('persist', persist)
    }, [persist])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password, setAuth, navigate });
        } catch (error) {
        
        }
    };

    return (
        <div className='flex flex-col mt-20 items-center'>
            <h1 className="text-slate-800 text-2xl font-semibold tracking-tight">
                Авторизация
            </h1>
            <p className="leading-7 mb-5 [&:not(:first-child)]:mt-6">
                Система управления образцами
            </p>
            <Card className="w-96 px-4 py-8">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col mb-4">
                        <Label htmlFor="username" className="mb-2">Имя пользователя</Label>
                        <Input onChange={handleUsernameChange} type="text" id="username" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <Label htmlFor="password" className="mb-2">Пароль</Label>
                        <Input onChange={handlePasswordChange} type="password" id="password" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="persist"
                            onCheckedChange={togglePersist}
                            checked={persist}
                        />
                        <label
                            htmlFor="persist"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Остаться в системе
                        </label>
                    </div>

                    <div className='flex justify-end mt-6'>
                        <Button className="w-full" onClick={handleLogin}>Войти</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Login