import React, { useState, useEffect } from 'react'

import * as styles from './styles'
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

import { Link } from 'react-router-dom';
import api from '../../services/api'


function Header({ clickNotification }) {

  const [qtdTasksAtrasadas, set_qtdTasksAtrasadas] = useState();
  const [macaddress, setMacaddress] = useState();

  async function getStorage(){
    const isConnectedStorage =  await localStorage.getItem('taskProject/macaddress')

    if(isConnectedStorage){      
      setMacaddress(isConnectedStorage); 
      tarefasAtrasadas(isConnectedStorage);                
    }
  }

  async function tarefasAtrasadas(macaddress){
    console.log(macaddress, 'macacaca')    
    await api.get(`/task/atrasadas/${macaddress}`)
    .then(response => {          
      set_qtdTasksAtrasadas(response.data.length)
      console.log(response.data.length)        
    })
  }

  

  async function logout(){
    await localStorage.clear('taskProject/macaddress');
    window.location.reload();
  }

  useEffect(() => {  
    getStorage();     
  }, [])

  return (
    <styles.Container>

      <styles.LeftSide>
        <img src={logo} alt="Logo" />
      </styles.LeftSide>

      <styles.RightSide>
        <Link to="/">INÍCIO</Link>
        <span className="dividir" />
        <Link to="/task">NOVA TAREFA</Link>
        <span className="dividir" />
        { !macaddress ?
          <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
          :
          <button type="button" onClick={logout}>SAIR</button>
        }
        {
          qtdTasksAtrasadas &&
          <>
          <span className="dividir" />
          <button onClick={clickNotification} id="notification">
            <img src={bell} alt="Notification" />
            <span>{ qtdTasksAtrasadas }</span>
          </button>          
          </>
        }
      </styles.RightSide>

    </styles.Container>
  )

}

export default Header;