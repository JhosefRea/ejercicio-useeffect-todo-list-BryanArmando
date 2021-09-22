import React, {useEffect, useState} from "react";
import {Button} from "antd"
import "../styles/UserInfo.css"
const UserInfo = () => {
    const [userId, setUserId] = useState(1);
    const [ userData, setUserData ] = useState( null );

    useEffect(() => {
        const getUser = async() => {
            const data = await fetch( `https://jsonplaceholder.typicode.com/users/${ userId }` );
            const jsonUser = await data.json();
            setUserData( jsonUser );
        };
        getUser();
    }, [ userId ]);


    if (!userData) {
        return "Cargando datos...";
    }


    const PrevUser = () => {
        setUserId( userId - 1 );
    };

    const NextUser = () => {
        setUserId( userId + 1 );
    };
    return (
        <div>
            {userId > 1 &&
            <Button type="primary" onClick={PrevUser}> Anterior </Button>
            }

            {userId < 10 &&
            <Button type="primary" onClick={NextUser}> Siguiente </Button>
            }

            <div>
                <h1> Información del usuario</h1>
            </div>
            <div>
                <ul>
                    <li>
                        <strong>Nombre:</strong> { userData.name }
                    </li>
                    <li>
                        <div>
                            <strong>Username:</strong>  {userData.username}
                        </div>
                    </li>
                    <li>
                        <div>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${userData.email}`}>{userData.email}</a>
                        </div>
                    </li>
                    <li>
                        <div>
                            <strong>Dirección:</strong> {userData.address.street}, {userData.address.suite},{" "}
                            {userData.address.city}, {userData.address.zipcode}
                        </div>
                    </li>
                    <li>
                        <div>
                            <strong>Teléfono:</strong> {userData.phone}
                        </div>
                    </li>
                    <li>
                        <div>
                            <strong>Website:</strong> <a href={userData.website}>{userData.website}</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserInfo;