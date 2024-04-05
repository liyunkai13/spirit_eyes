import {useLoaderData} from "react-router-dom";
export const loaderGetter = (store) => async ({params}) => {
    // 正常来讲，在这里需要从服务器获取该ward的详细数据，现在只用wardsSlice的数据来凑合

    //getState(),别忘记括号，又花了我一大段时间
    const  wards = await  store.getState().wards.value;
    console.log(wards);
    //千万不能使用===，我们这里只需要比较值是否相等，不需要比较类型，别看黄色警告
    return wards.find(ward => ward.wardId == params.wardId);
};

// 有两种方案实现用Form实现信息修改，一种是原生Form和useState，
// 另一种是使用react-router-dom的action和封装的Form
export default function EditWard() {
    const ward = useLoaderData();
    // 在渲染之前，需要先从store中获取ward的详细数据
    console.log(ward);

    //解构出指定的属性
    const {wardId, wardType} =ward;


    return (
        <div>
            <>{wardId}</>
            <div>{wardType}</div>
        </div>
        // <Form method="post" id="ward-form">
        //     <p>
        //         <span>Name</span>
        //         <input
        //             placeholder="First"
        //             aria-label="First name"
        //             type="text"
        //             name="first"
        //             defaultValue={ward.wardName}
        //         />
        //         <input
        //             placeholder="Last"
        //             aria-label="Last name"
        //             type="text"
        //             name="last"
        //             defaultValue={ward.wardName}
        //         />
        //     </p>
        //     <label>
        //         <span>Type</span>
        //         <input
        //             type="text"
        //             name="twitter"
        //             placeholder="@jack"
        //             defaultValue={ward.wardType}
        //         />
        //     </label>
        //     <label>
        //         <span>Avatar URL</span>
        //         <input
        //             placeholder="https://example.com/avatar.jpg"
        //             aria-label="Avatar URL"
        //             type="text"
        //             name="avatar"
        //             defaultValue={ward.wardCapacity}
        //         />
        //     </label>
        //     <label>
        //         <span>Notes</span>
        //         <textarea
        //             name="notes"
        //             defaultValue={ward.wardCapacity}
        //             rows={6}
        //         />
        //     </label>
        //     <p>
        //         <button type="submit">Save</button>
        //         <button type="button">Cancel</button>
        //     </p>
        // </Form>
    );
}
