import React, { useState, useEffect } from 'react'
import * as styles from './styles'

import api from '../../services/api.js'

import { Link, useNavigate } from 'react-router-dom';

//NOSSOS COMPONENTS
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import FilterCard from '../../components/FilterCard/index'
import TaskCard from '../../components/TaskCard/index'

function Home() {
  const navigate = useNavigate()

  const [filterActived, setFilterActived] = useState('tarefasDeHoje');
  const [tasks, setTasks] = useState([]); 
  const [macaddress, setMacaddress] = useState() 
  

  async function listAllTasks(){    
    await api.get(`/task/${filterActived}/${macaddress}`)
    .then(response => {          
      setTasks(response.data)
      console.log(response.data)        
    })    
  }
  
  

  function notification(){
    setFilterActived('atrasadas');
    console.log('aaab');
  }

  useEffect(() => {

    listAllTasks();
    
    const isConnected = localStorage.getItem('taskProject/macaddress')

    if(!isConnected){
      console.log('dd',isConnected)
      navigate("/qrcode");
    }else{
      setMacaddress(isConnected) 
    }    

  }, [filterActived])

  return (
    <styles.Container>
      
      <Header  clickNotification={notification}/>

      <styles.FilterArea>
        <button type="buttton" onClick={() => setFilterActived("filter/all")}>
          <FilterCard title="Todos"   actived={filterActived === "filter/all"}/>
        </button>

        <button type="buttton" onClick={() => setFilterActived("tarefasDeHoje")}>
          <FilterCard title="Hoje"    actived={filterActived === "tarefasDeHoje"}/>
        </button>

        <button type="buttton" onClick={() => setFilterActived("tarefasDaSemana")}>
          <FilterCard title="Semana"  actived={filterActived === "tarefasDaSemana"}/>
        </button>

        <button type="buttton" onClick={() => setFilterActived("tarefasDoMes")}>
          <FilterCard title="Mês"     actived={filterActived === "tarefasDoMes"}/>
        </button>

        <button type="buttton" onClick={() => setFilterActived("tarefasDoAno")}>
          <FilterCard title="Ano"     actived={filterActived === "tarefasDoAno"}/>
        </button>
      </styles.FilterArea> 

      <styles.TiTleBoxCards>
        <h3>{filterActived === 'atrasadas' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>  
      </styles.TiTleBoxCards>  

      <styles.Content>
        {
          tasks.map(result =>(
            <Link to={`/task/${result._id}`}>              
              <TaskCard type={result.type} title={result.title} when={result.when} done={result.done}/>
            </Link>            
          ))
        }
      </styles.Content>   

      <Footer/>
      
    </styles.Container>
  )    
}

export default Home;