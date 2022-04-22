import React, {useRef, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Avatar, ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";


const Chats = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    } 

    const handleMarketpageMove = async () => {
        history.push('/MarketScreenOne')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        // if(!user) {
        //     history.push('/');

        //     return;
        // }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "b6399b9a-6d00-470a-8eff-2263ba836a01",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users', 
                        formdata,
                        {headers: {"private-key": "4256cb1c-3e1a-46a5-ace7-982f84463fdb"}}
                    )  
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);

    if(!user || loading) return 'loading ...';

    return (
        <div classname="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    NFT Marketplace Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>

                <div onClick={handleMarketpageMove} className="marketplace-tab">
                    Click Here to get your NFT Collection started!
                </div>
                
                
                {/* <div className="marketplace-tab">
                    <button onClick={() => {
                        history.push("/MarketScreenOne");
                    }}
                    >
                        push
                    </button>
                </div> */}
            </div>

            <ChatEngine 
                heigth="calc(100vh - 66px)"
                projectID="b6399b9a-6d00-470a-8eff-2263ba836a01"
                userName={user.email}
                userSecret={user.uid}
            />

        </div>
    );
}

export default Chats;