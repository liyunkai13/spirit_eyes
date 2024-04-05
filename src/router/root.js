import {json, Link, Outlet,Form} from "react-router-dom";
import {addWard, fetchWards} from "../store/wardsSlice";
import {useSelector} from "react-redux";
import {selectWards} from "../store/wardsSlice";
export const loaderGetter = (dispatch) => async () => {
    try {
        dispatch(fetchWards());
        return json({ message: "Data fetched successfully" });
    } catch (e) {
        throw json({ message: "Error occurred while fetching data" }, { status: e.status });
    }
};
export const actionGetter = (dispatch) => async (params) => {
    try {
        dispatch(addWard());
        return json({ message: "Ward added successfully" });
    } catch (e){
        throw json({ message: "Error occurred while adding ward" }, { status: e.status });
    }
};
const Root = ()=> {
    //mapStateToProps
    const wards = useSelector(selectWards);



    return (
        <>
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
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    <ul>
                        {wards.map((ward) => (
                            <li key={ward.wardId}>
                                <Link to={`/wards/${ward.wardId}`}>{ward.wardName}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}

export default Root;
