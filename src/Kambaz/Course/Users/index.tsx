import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../People/Table";
import * as courseClient from "../client"
import { FormControl } from "react-bootstrap";
export default function Users() {
 const [users, setUsers] = useState<any[]>([]);

const { cid } = useParams<{ cid: string }>();
const fetchUsers = async () => {
  if (!cid) return; 
  console.log("cid", cid)
  const users = await courseClient.findUsersForCourse(cid);
  console.log("users", users)
  setUsers(users);
};
 useEffect(() => {
   fetchUsers();
 }, [cid]);

   const [role, setRole] = useState("");
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
        if (!cid) return;
      const users = await courseClient.findUsersByRole(cid, role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
     const [name, setName] = useState("");
    const filterUsersByName = async (Name: string) => {
        if (!cid) return;
      setName(Name);
      if (Name && Name != "") {
        const users = await courseClient.findUsersByPartialName(cid, name);
        setUsers(users);
      } else {
        fetchUsers();
      }
    }
 return (
   <div>
     <h3>Users</h3>
           <FormControl onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
             className="float-start w-25 me-2 wd-filter-by-name" />
    <select value={role} onChange={(e) =>filterUsersByRole(e.target.value)}
              className="form-select float-start w-25 wd-select-role" >
        <option value="">All Roles</option>    <option value="STUDENT">Student</option>
        <option value="TA">Assistants</option> <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
     <PeopleTable users={users} />
   </div>
);}
