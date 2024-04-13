import {NavLink, Outlet, useNavigation} from "react-router-dom";
import {selectWards} from "../store/wardsSlice";
import Footer from "../components/footer";
import AddWardModal from "../components/addWardModal";
import {useState} from "react";
import {useSelector} from "react-redux";

const Root = ()=> {
    //mapStateToProps
    const wards = useSelector(selectWards);
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = (isOpen) => {
        setOpen(isOpen);
    };

    return (
        <>
            <AddWardModal isOpen={open} parentCallback={handleCancel}/>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <button onClick={showModal} >New</button>
                </div>
                <nav>
                    <ul>
                        {wards.map((ward) => (
                            <li key={ward.wardId}>
                                <NavLink to={`/wards/${ward.wardId}`} className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                            ? "pending"
                                            : ""
                                }
                                >{ward.wardName}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div id="detail"
                 className={
                     navigation.state === "loading" ? "loading" : ""
                 }>
                <Outlet />
                <Footer/>
            </div>
        </>
    );
}

export default Root;
