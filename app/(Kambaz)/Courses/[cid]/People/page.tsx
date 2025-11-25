"use client";
import PeopleTable from "./PeopleTable";
import * as client from "../../client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function People() {
    const {cid} = useParams();
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const users = await client.findUsersForCourse(cid as string);
        setUsers(users);
    };
    useEffect(() => {
        if (cid) {
            fetchUsers();
        }
    }, [cid]);
    return (
        <PeopleTable users={users} fetchUsers={fetchUsers}/>

    )


}