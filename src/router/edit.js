import {Form, redirect, useLoaderData} from "react-router-dom";
import {updateWard} from "../store/wardsSlice";
import {WardsService as wardsService} from "../services/Service";


export const loaderGetter = (store) => async ({params}) => {
    // 正常来讲，在这里需要从服务器获取该ward的详细数据，现在只用wardsSlice的数据来凑合

    //getState(),别忘记括号，又花了我一大段时间
    const  wards = await  store.getState().wards.value;
    //千万不能使用===，我们这里只需要比较值是否相等，不需要比较类型，别看黄色警告
    return wards.find(ward => ward.wardId == params.wardId);
};
//Todo: put和patch方法更新服务器数据未成功
export const actionGetter = (dispatch) => async ({request,params}) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log("wardId",params.wardId);
    console.log("updates",updates);
    //一般的数据更新顺序是先更新服务器，再更新本地store
    try {
        await wardsService.updateWard(params.wardId,updates);
    }catch (e) {
        console.error(e);
    }
    await dispatch(updateWard({wardId:params.wardId,newWard:updates}));

    return redirect(`/wards/${params.wardId}`);
};

// 有两种方案实现用Form实现信息修改，一种是原生Form和useState，另一种是使用react-router-dom的action和封装的Form，这里使用react-router-dom的Form
export default function EditWard() {
    const ward = useLoaderData();
    // 在渲染之前，需要先从store中获取ward的详细数据

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
