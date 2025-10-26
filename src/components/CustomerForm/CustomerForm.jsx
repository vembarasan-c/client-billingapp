import { useContext } from 'react';
import './CustomerForm.css';

import { useState } from 'react';

import {AppContext} from "../../context/AppContext.jsx";


const CustomerForm = ({customerName, mobileNumber, username, setUsername, setMobileNumber, setCustomerName, taxPercent, setTaxPercent}) => {


    const appCtx = useContext(AppContext);
    let users;
    // support several possible shapes of the context:
    // - [users, setUsers]
    // - { users, setUsers }
    // - directly the users array
    if (Array.isArray(appCtx) && appCtx.length > 0) {
      users = appCtx[0];
    } else if (appCtx && typeof appCtx === 'object' && 'users' in appCtx) {
      users = appCtx.users;
    } else {
      users = appCtx;
    }

    // const [data, setData] = useState({
    //         username: "",
    //         customername: "",
    //         mobileNumber: ""
    //     });
    
       
    //  const onChangeHandler = (e) => {
    //     const value = e.target.value;
    //     const name = e.target.name;
    //     setData((data) => ({...data, [name]: value}));
    // }

    

    return (
        <div className="p-3">
            {/* select existing user (parent should pass `users` prop: [{ id, name, mobile }] ) */}
            <div className="mb-3">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="selectUser" className="text-dark col-4">Select user: </label>
                    

                    <select name="username" id="username" className="form-control" onChange={(e) => setUsername (e.target.value)} value={users.name} required>
                                        <option value="">--SELECT USER--</option>
                                        {users.map((user, index) => (
                                            <option key={index} value={user.name}>{user.name}</option>
                                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-3">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="customerName" className=" text-dark col-4">Customer name: </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="customerName"
                        onChange={(e) => setCustomerName(e.target.value)}
                        value={customerName}
                        required
                    />
                </div>
            </div>
            <div className="mb-3">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="mobileNumber" className="text-dark col-4">Mobile number: </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        id="mobileNumber"
                        onChange={(e) => setMobileNumber(e.target.value)}
                        value={mobileNumber}
                        required
                    />
                </div>
            </div>

            {/* show all user names for reference (optional) */}
            {/* {typeof users !== 'undefined' && users && users.length > 0 && (
                <div className="mb-2">
                    <label className="text-muted small">All users:</label>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                        {users.map(u => (
                            <span key={u.id ?? u.name} className="badge bg-light text-dark border">
                                {u.name}
                            </span>
                        ))}
                    </div>
                </div>
            )} */}

            <div>
                
            </div>
            
        </div>
    )
}

export default CustomerForm;