import {useState} from "react";
import {deleteUser} from "../../Service/UserService.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const UsersList = ({users, setUsers, onEdit}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const editUser = (id) => {
        const user = users.find(u => u.userId === id);
        console.log('editing user', user);
        if (user && typeof onEdit === 'function') {
            
            onEdit(user);
        } else {
            navigate(`/users/edit/${id}`);
        }
    }
    
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteByUserId = async (id) => {
        try {
            await deleteUser(id);
            setUsers(prevUsers => prevUsers.filter(user => user.userId !== id));
            toast.success("User deleted");
        }catch (e) {
            console.error(e);
            toast.error("Unable to deleting user");
        }
    }


    return (
        <div className="category-list-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="row pe-2">
                <div className="input-group mb-3">
                    <input type="text"
                           name="keyword"
                           id="keyword"
                           placeholder="Search by keyword"
                           className="form-control"
                           onChange={(e) => setSearchTerm(e.target.value)}
                           value={searchTerm}
                    />
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div className="row g-3 pe-2">
                {
                    filteredUsers.map((user) => (
                        <div key={user.userId} className="col-12">
                            <div className="card p-3 "  style={{  maxWidth: '100%'}}>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <h5 className="mb-1">{user.name}</h5>
                                        <p className="mb-0 ">{user.email}</p>
                                    </div>
                                    <div style={{display: 'flex', gap: '8px'}}>
                                        <button className="btn btn-sm btn-warning" onClick={() => editUser(user.userId)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteByUserId(user.userId)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UsersList;