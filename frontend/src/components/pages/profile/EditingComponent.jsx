import React, { useState, useEffect } from 'react';

const EditingComponent = (props) => {
    // 使用useState钩子来初始化本地状态
    const [info, setInfo] = useState([]);

    // 当props.restProp变化时，更新本地状态
    useEffect(() => {
        setInfo(props.restProp);
    }, [props.restProp]);

    // 处理输入字段更改的函数
    function inputChangeHandler(e, index, field) {
        // 创建新的info数组的副本
        const newInfo = [...info];
        // 更新特定索引和字段的值
        newInfo[index][field] = e.target.value;
        // 设置新的info状态
        setInfo(newInfo);
    }

    return (
        <>
            {info.map((item, index) => (
                item.userid === 1 && (
                    <div key={index}>
                        <h2>Restaurant Detail</h2>
                        <label htmlFor={`restaurantName-${index}`}>Restaurant Name: </label>
                        <input
                            type="text"
                            id={`restaurantName-${index}`}
                            value={item.restaurantname || ''}
                            onChange={(e) => inputChangeHandler(e, index, 'restaurantname')}
                        />

                        <label htmlFor={`restaurantAddress-${index}`}>Restaurant Address: </label>
                        <input
                            type="text"
                            id={`restaurantAddress-${index}`}
                            value={item.address || ''}
                            onChange={(e) => inputChangeHandler(e, index, 'address')}
                        />

                        <h2>User Detail: </h2>
                        <label htmlFor={`username-${index}`}>Username: </label>
                        <input
                            type="text"
                            id={`username-${index}`}
                            value={item.username || ''}
                            onChange={(e) => inputChangeHandler(e, index, 'username')}
                        />
                        <label htmlFor={`contact-${index}`}>Contact: </label>
                        <input
                            type="text"
                            id={`contact-${index}`}
                            value={item.contact || ''}
                            onChange={(e) => inputChangeHandler(e, index, 'contact')}
                        />
                    </div>
                )
            ))}
        </>
    );
}

export default EditingComponent;
