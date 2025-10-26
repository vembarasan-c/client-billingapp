import './ManageUsers.css';
import UserForm from "../../components/UserForm/UserForm.jsx";
import UsersList from "../../components/UsersList/UsersList.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {fetchUsers} from "../../Service/UserService.js";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true);
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Unable to fetch users");
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    const [selectedUser, setSelectedUser] = useState(null);

    const onEdit = (user) => {
        // show user in the left form for editing
        setSelectedUser(user);
        // optionally scroll to top or focus
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    
    const onUpdateUser = (updated) => {
        setUsers(prev => prev.map(u => (u.userId === updated.userId ? updated : u)));
        setSelectedUser(null);
    }

    return (
        <div className="users-container text-dark">
            <div className="left-column">
                <UserForm setUsers={setUsers} selectedUser={selectedUser} onUpdateUser={onUpdateUser} />
            </div>
            <div className="right-column">
                <UsersList users={users} setUsers={setUsers} onEdit={onEdit} />
            </div>
        </div>
    )
}

export default ManageUsers;