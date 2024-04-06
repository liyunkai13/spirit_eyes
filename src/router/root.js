import {Form, json, NavLink, Outlet, redirect, useLoaderData, useNavigation} from "react-router-dom";
import {addWard} from "../store/wardsSlice";

export const loaderGetter = (store) => async () => {
    return await store.getState().wards.value;

};

//用于初步创建一个ward对象，重定向到其edit界面
export const actionGetter = (store) => async () => {
    try {
        //TODO: 从redux获取userId
        const userId = 1;
        const wardId = store.getState().wards.value.length + 1;
        // console.log('newWard',{
        //     userId: userId,
        //     wardId: wardId,
        //     wardName: "New Ward",
        //     wardGender: "未知",
        //     wardAge: 0,
        //     emContact: "911",
        //     notes: "This is a general ward"
        // });
        await store.dispatch(addWard({
            userId: userId,
            wardId: wardId,
            wardName: "New Ward",
            wardGender: "未知",
            wardAge: 0,
            emContact: "911",
            notes: "This is a general ward"
        }));
        return redirect(`/wards/${wardId}/edit`);
    } catch (e){
        throw json({ message: "Error occurred while adding ward" }, { status: e.status });
    }
};
const Root = ()=> {
    //mapStateToProps
    const wards = useLoaderData();
    const navigation = useNavigation();


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
            </div>
        </>
    );
}

export default Root;
