import {Form, redirect, useLoaderData} from "react-router-dom";
import {updateWard} from "../store/wardsSlice";


export const loaderGetter = (store) => async ({params}) => {
    const  wards = await  store.getState().wards.value;
    //千万不能使用===，我们这里只需要比较值是否相等，不需要比较类型，别看黄色警告
    return wards.find(ward => ward.wardId == params.wardId);
};

export const actionGetter = (dispatch) => async ({request,params}) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log("wardId",params.wardId);
    console.log("updates",updates);

    try {
        await dispatch(updateWard({wardId:params.wardId,newWard:updates}));
    } catch (e) {
        console.error(e);
    }
    return redirect(`/wards/${params.wardId}`);
};

// 有两种方案实现用Form实现信息修改，一种是原生Form和useState，另一种是使用react-router-dom的action和封装的Form，这里使用react-router-dom的Form
export default function EditWard() {
    const ward = useLoaderData();


    //解构出指定的属性
    const {wardName,wardGender,wardAge,emContact,notes} = ward;

    return (
        <Form method="post" id="ward-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="wardName"
                    defaultValue={wardName}
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="wardGender"
                    defaultValue={wardGender}
                />
            </p>
            <label>
                <span>Age</span>
                <input
                    type="text"
                    name="wardAge"
                    placeholder="18"
                    defaultValue={wardAge}
                />
            </label>
            <label>
                <span>Emergence Contact</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="emContact"
                    defaultValue={emContact}
                />
            </label>

            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button">Cancel</button>
            </p>
        </Form>
    );
}
