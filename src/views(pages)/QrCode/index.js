import React, { useState, useEffect } from 'react'
import * as styles from './styles'
import QrCodeCreate from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

//NOSSOS COMPONENTS
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';


function QrCode() {
    const navigate = useNavigate()

    const [mac, setMac] = useState();

    async function SaveMac(){
        if(!mac){
            alert('Necessario informar o numero que aparece em seu celular')
        }else{
            await localStorage.setItem('taskProject/macaddress', mac);       
        navigate("/");
        window.location.reload(); 
        }              
    }    

    return(

        <styles.Container>

            <Header/>


            <styles.QrCodeContent>
                <h1>CAPTURE O QR_CODE PELO APP</h1>

                <styles.QrCodeArea>
                    <QrCodeCreate value='getmacaddress' size={300}/>
                </styles.QrCodeArea>

                <styles.ValidationCode>
                    <span>Digite o codigo que aparece em seu celular</span>
                    <input type="text" onChange={event => setMac(event.target.value)} value={mac}/>
                    <button  type="button" onClick={SaveMac}>SINCRONIZAR</button>                
                </styles.ValidationCode>

                <p>suas atividades serão sincronizadas com a do seu celular.</p>
            </styles.QrCodeContent>

            <Footer/>

        </styles.Container>
        
    );
}

export default QrCode;