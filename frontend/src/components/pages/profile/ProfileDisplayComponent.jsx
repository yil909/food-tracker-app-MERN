const ProfileDisplayComponent = (props) => {
    return (
        <>
            {props.restInfoProp.map((info, index) => (
            info.userid === 1 && (
            <div key={index}>
                <h2>Restaurant Detail</h2>
                <h3>Restaurant Name: {info.restaurantname}</h3>
                <h3>Restaurant Address: {info.address}</h3>
                <h2>User Detail: </h2>
                <h3>Username: {info.username}</h3>
                <h3>Contact: {info.contact}</h3>
            </div>
            )
            ))}
        </>
    );
}

export default ProfileDisplayComponent;