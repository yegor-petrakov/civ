import React, { useState, useEffect } from 'react'

// React Router Dom
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { Button } from './ui/button';
import { Separator } from "@/components/ui/separator"

import { List, Boxes, UserRoundCog, LogOut, Archive, Zap, SquareArrowOutUpRight } from 'lucide-react'

import logo from '../../public/icon6.png'

import useLogout from '@/hooks/useLogout';

import useAuth from '@/hooks/useAuth';

import { Menu } from 'lucide-react';

const Navigation = () => {

    const { auth } = useAuth()

    const navigate = useNavigate();

    const logout = useLogout()

    const { pathname } = useLocation();

    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        // Determine active tab based on pathname
        if (pathname.startsWith('/dash/users')) {
            setActiveTab('users');
        } else if (pathname.startsWith('/dash/codes')) {
            setActiveTab('codes');
        } else if (pathname.startsWith('/dash/vaults')) {
            setActiveTab('vaults');
        } else if (pathname.startsWith('/dash/users')) {
            setActiveTab('users');
        } else if (pathname.startsWith('/dash/logs')) {
            setActiveTab('logs');
        } else {
            setActiveTab('');
        }
    }, [pathname]);

    const onCodesClicked = () => navigate('/dash/codes')
    const onVaultsClicked = () => navigate('/dash/vaults');
    const onUsersClicked = () => navigate('/dash/users');
    const onLogsClicked = () => navigate('/dash/logs')

    const onLogoutClicked = async () => {
        await logout()
        navigate('/')
    }

    const codesButton = (
        <div className='relative'>
            <Button variant="ghost" onClick={onCodesClicked} className="flex gap-2 items-center text-slate-800 hover:bg-slate-200">
                <List className='h-5 w-5' />
                Маркировки
            </Button>
            {activeTab === 'codes' ? (
                <div className='h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-10px]'></div>
            ) : (
                ''
            )}
        </div>
    )

    const vaultsButton = (
        <div className='relative'>
            <Button variant="ghost" onClick={onVaultsClicked} className="flex gap-2 items-center text-slate-800 hover:bg-slate-200">
                <Boxes className='h-5 w-5' />
                Хранение
            </Button>
            {activeTab === 'vaults' ? (
                <div className='h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-10px]'></div>
            ) : (
                ''
            )}
        </div>
    )

    const usersButton = (
        <div className='relative'>
            <Button variant="ghost" onClick={onUsersClicked} className="flex gap-2 items-center text-slate-800 hover:bg-slate-200">
                <UserRoundCog className='h-5 w-5' />
                Пользователи
            </Button>
            {activeTab === 'users' ? (
                <div className='h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-10px]'></div>
            ) : (
                ''
            )}
        </div>
    )

    // const logsButton = (
    //     <div className='relative'>
    //         <Button variant="ghost" onClick={onLogsClicked} className="flex gap-2 items-center text-slate-800 hover:bg-slate-200">
    //             <Archive className='h-5 w-5' />
    //             Логи
    //         </Button>
    //         {activeTab === 'logs' ? (
    //             <div className='h-0.5 w-full bg-blue-600 rounded-t-full absolute bottom-[-10px]'></div>
    //         ) : (
    //             ''
    //         )}
    //     </div>

    // )

    const cncButton = (
        <Button variant="ghost" className="flex gap-2 items-center text-slate-800">
            <Link to={'https://yegor-petrakov.github.io/'} className='flex gap-2 items-center'>
                <Zap className='h-5 w-5' />
                ЧПУ
                <SquareArrowOutUpRight strokeWidth={2.5} className='h-3 w-3' />
            </Link>
        </Button>
    )

    const logoutButton = (
        <div className='flex items-center'>
            <span className='text-sm font-semibold pr-1'>{auth.username}</span><span className='text-sm'>({auth.role})</span>
            <Button
                variant="ghost"
                onClick={onLogoutClicked}
                className="flex gap-2 items-center text-slate-800"
            >
                <LogOut className='h-5 w-5' />
            </Button>
        </div>
    )

    let navigationContent = (
        <header className='bg-slate-100'>
            <div className='flex justify-between items-center px-4 pt-2 border-b-2'>
                <div className='flex gap-2 py-2 items-center'>
                    {/* <img src={logo} alt="logo" className='w-6 h-6 mr-4' /> */}
                    {codesButton}
                    {vaultsButton}
                    {auth.role === 'admin' ? usersButton : ''}
                    {cncButton}
                </div>
                <div className='flex gap-2 py-2'>
                    {logoutButton}
                </div>
            </div>
        </header>
    )

    let isMobile = false

    if (isMobile) {
        navigationContent = (
            <header className='bg-slate-100'>
                <div className='flex justify-between items-center px-4 border-b-2'>
                    <Button variant='ghost'>
                        <Menu />
                    </Button>

                </div>
            </header>
        )
    }

    return navigationContent
}

export default Navigation