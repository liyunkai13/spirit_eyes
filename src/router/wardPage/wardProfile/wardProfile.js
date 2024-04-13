// TODO ：子组件：基本信息管理，应急联系人管理，设备管理，
import {Form, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {updateWard} from "../../../store/wardsSlice";
export const loaderGetter = (store) => ({params}) => {
    try {
        const  wards = store.getState().wards.value;
        console.log("wards",wards);
        console.log("wardId",params.wardId);
        //千万不能使用===，我们这里只需要比较值是否相等，不需要比较类型，别看黄色警告
        const selectedWard = wards.find(ward => ward.wardId == params.wardId);
        console.log("selectedWard",selectedWard);

        return selectedWard;
    }catch (e) {
        console.error(e);
        return {};
    }



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
export default function WardProfile() {
    const ward = useLoaderData();
    const navigate = useNavigate();

    //解构出指定的属性
    const {wardName,wardGender,wardAge,emContact,notes} = ward;

    return (
        <Form method="post" id="ward-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="李华"
                    aria-label="First name"
                    type="text"
                    name="wardName"
                    defaultValue={wardName}
                />
                <input
                    placeholder="男"
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
                    placeholder="911"
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
                <button type="button" onClick={()=>{
                    //为什么按钮上没有event.preventDefault？
                    // <button type="button"> 虽然看似多余，却是防止按钮提交表单的 默认 HTML 行为。
                    // window.history.back(); //一样生效
                    navigate(-1);
                }}>Cancel</button>
            </p>
        </Form>
    );
}
