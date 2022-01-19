import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom";
import { apiService } from '../services/apiService';

export const Chat = () => {

    const [ChoferId, setChoferId] = useState()
    const [mensajes, setMensajes] = useState([])
    const search = useLocation().search;


    useEffect(() => {
        const disco = new URLSearchParams(search).get('disco');
        console.log("🚀 ~ file: Chat.js ~ line 13 ~ useEffect ~ disco", disco)
        apiService.getPrevMessages(disco)
        .then( res => {
            setMensajes( res.data.messages);
        })
        .catch( err => {
            console.log(err)
        })
    }, [])


    return (
        <div class="container">
           { mensajes.map( msg => (
                <div class="message rigth">
                <img class="user-img"  alt="" src="../assets/images/support.webp" />
                <div class="msg-detail">
                    <div class="msg-info">
                    <p>
                        {msg}
                    </p>
                    </div>
                    <div class="msg-content">
                    <span class="triangle"></span>
                    <p class="line-breaker "></p>
                    </div>
                </div>
                </div>
           ))}
        </div>
    )
}
