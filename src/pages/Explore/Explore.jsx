import './Explore.css';
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory.jsx";
import DisplayItems from "../../components/DisplayItems/DisplayItems.jsx";
import CustomerForm from "../../components/CustomerForm/CustomerForm.jsx";
import CartItems from "../../components/CartItems/CartItems.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx";

const Explore = () => {
    const {categories} = useContext(AppContext);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [taxPercent, setTaxPercent] = useState(1);
    const [username, setUsername] = useState("");

    return (
        <div className="explore-container text-light">
            <div className="left-column">
                <p className='text-dark fs-4 fst-italic' >Categories</p>
                <div className="first-row" style={{overflowY: 'auto'}}>
                    <DisplayCategory
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        categories={categories} />
                </div>
                <hr className="horizontal-line" />
                <div className="second-row" style={{overflowY: 'auto'}}>
                    <DisplayItems selectedCategory={selectedCategory} />
                </div>
            </div>
            <div className="right-column d-flex flex-column">
                <div className="customer-form-container" style={{height: '25%'}}>
                    <CustomerForm
                        customerName={customerName}
                        mobileNumber={mobileNumber}
                        username = {username}
                        setUsername = {setUsername}
                        setMobileNumber={setMobileNumber}
                        setCustomerName={setCustomerName}
                        taxPercent={taxPercent}
                        setTaxPercent={setTaxPercent}
                    />
                </div>
                <hr className="my-3 text-dark" />
                <div className="cart-items-container" style={{height: '50%', overflowY: 'auto'}}>
                    <CartItems />
                </div>
                <div className="cart-summary-container" style={{height: '33%'}}>
                    <CartSummary
                        customerName={customerName}
                        mobileNumber={mobileNumber}
                        username = {username}
                        
                        setUsername = {setUsername}
                        setMobileNumber={setMobileNumber}
                        setCustomerName={setCustomerName}
                        taxPercent={taxPercent}
                    />
                </div>
            </div>
        </div>
    )
}

export default Explore;