import {Form, json, Link, Outlet, useLoaderData} from "react-router-dom";
import {addWard} from "../store/wardsSlice";

export const loaderGetter = (store) => async () => {
    return await store.getState().wards.value;

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
    const wards = useLoaderData();



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
