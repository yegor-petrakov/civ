// import { useState, useEffect } from "react";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import { useNavigate, useLocation } from "react-router-dom";

// const UsersList = () => {
//   const [users, setUsers] = useState();
//   const axiosPrivate = useAxiosPrivate();
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     let isMounted = true;

//     const controller = new AbortController();

//     const getUsers = async () => {
//       try {
//         const response = await axiosPrivate.get('/users', {
//           signal: controller.signal
//         });
//         console.log(response.data);
//         isMounted && setUsers(response.data);

//       } catch (err) {
//         console.error(err);
//         navigate('/', { state: { from: location }, replace: true });
//       }
//     };

//     getUsers();

//     return () => {
//       isMounted = false;
//       controller.abort();
//     };
//   }, [axiosPrivate, navigate, location]);

//   return (
//     <article>
//       <h2>Users List</h2>
//       {users?.length ? (
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>{user?.username}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No users to display</p>
//       )}
//     </article>
//   );
// };

// export default UsersList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import User from './User';

import { getAllUsers } from '../../api/users';

import { useNavigate } from 'react-router-dom'


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { ChevronLeft } from "lucide-react"





const UsersList = () => {
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()

    const [users, setUsers] = useState([]);

    const handleAddNewUser = () => navigate('/dash/users/new')

    const handleBack = () => navigate('/dash')

    useEffect(() => {
        getAllUsers({ axiosPrivate, setUsers, navigate });
    }, []);


    // useEffect(() => {
    //     let isMounted = true;

    //     const controller = new AbortController();

    //     const getUsers = async () => {
    //         try {
    //             const response = await axiosPrivate.get('/users', {
    //                 signal: controller.signal
    //             });
    //             console.log(response.data);
    //             isMounted && setUsers(response.data);

    //         } catch (err) {
    //             console.error(err);
    //             navigate('/', { state: { from: location }, replace: true });
    //         }
    //     };

    //     getUsers();

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     };
    // }, [axiosPrivate, navigate, location]);



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
                        Пользователи
                    </h1>
                </div>
                <Button
                    onClick={handleAddNewUser}
                >
                    Создать
                </Button>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Имя пользователя</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <User key={user.id} user={user} />
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

    )
}

export default UsersList