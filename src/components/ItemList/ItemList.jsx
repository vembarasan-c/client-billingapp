import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import {deleteItem} from "../../Service/ItemService.js";
import toast from "react-hot-toast";
import './ItemList.css';

const ItemList = () => {
    const {itemsData, setItemsData} = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = itemsData.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })

    const removeItem = async (itemId) => {
        try {
            
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                const updatedItems = itemsData.filter(item => item.itemId !== itemId);
                setItemsData(updatedItems);
                toast.success("Item deleted");
            } else {
                toast.error("Unable to delete item");
            }
        }catch(err) {
            console.error(err);
            toast.error("Unable to delete item");
        }
    }

    return (
        <div className="category-list-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="row">
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
            <div className="row g-3">
                {filteredItems.map((item, index) => (
                    
                    console.log(item),

                    <div className="col-lg-12" key={index}>
                        <div className="card p-3 item-card">
                            <div className="d-flex align-items-center">
                                <div style={{marginRight: '15px'}}>
                                    <img src={item.imgUrl} alt={item.name} className="item-image" />
                                </div>
                                <div className="flex-grow-1 ">
                                    <h6 className="mb-0 ">{item.name}</h6>
                                    <p className="mb-0 ">
                                        Category: {item.categoryName}
                                    </p>
                                    
                                    <div  className="d-flex mt-1 gap-2 " >

                                    <span className="mb-0 px-3 py-2 text-block badge rounded-pill text-bg-warning">
                                        &#8377;{item.price}
                                    </span>
                                    <span className="mb-0 fw-bold px-3  py-2 text-block badge rounded-pill text-bg-info">
                                        &#8377;{item.priceBack}
                                    </span>
                                    </div>
                                    
                                </div>
                                <div>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ItemList;