import React, { useState, useEffect } from 'react'
import * as styles from './styles'
import { useParams, useNavigate} from 'react-router-dom';
import { format } from 'date-fns'

import api from '../../services/api.js'

//NOSSOS COMPONENTS
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import TypeIcons from '../../utils/typeIcons'

function CreateTask() {
  const { idtask } = useParams();
  const navigate = useNavigate()  

  const [type, setType] = useState();
  

  //formulario de criar
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState();

  
  async function Save() {

    if(!title)
      return alert('Você precisa informar o título da tarefa');
    else if(!description)
      return alert('Você precisa informar a descrição da tarefa');
    else if(!type)
      return alert('Você precisa selecionar o tipo da tarefa');
    else if(!date)
      return alert('Você precisa informar uma data para a tarefa');
    else if(!hour)
      return alert('Você precisa informar uma hora para a tarefa');

    if (idtask) {
      console.log(macaddress,'a', type, title, description, date, hour)
      await api.put(`/task/${idtask}`, {
        macaddress,
        done,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`
      }).then(() => {
        navigate("/");
      })
    } else {
      console.log(macaddress, type, title, description, date, hour)
      await api.post('/task', {
        macaddress,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`
      }).then(() => {
        console.log('navigate')
        navigate("/");
      })
    }
  }

  async function getByIdTask() {
    console.log(idtask)
    await api.get(`/task/${idtask}`)
      .then(response => {
        setType(response.data.type)
        setDone(response.data.done)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
        setHour(format(new Date(response.data.when), 'HH:mm'))
      })
  }

  async function Remove(){
    if (idtask) {
    const res = window.confirm('Deseja realmente remover a tarefa?')

      if(res === true){
        await api.delete(`/task/${idtask}`)
        alert('Tarefa removida com sussesso!!')
        navigate("/");
      }
    }
  }

  useEffect(() => {    
    getByIdTask();

    const isConnected = localStorage.getItem('taskProject/macaddress')

    if(!isConnected){
      console.log('dd',isConnected)
      navigate("/qrcode");
    }else{
      setMacaddress(isConnected)
    } 
  }, [])

  return (
    <styles.Container>

      <Header />

      <styles.Formulario>

        <styles.TypeIcons>
          {
            TypeIcons.map((icon, index) => (
              index > 0 &&//se o index for maior que zero mostra a linha img sempre vai pular o indice 0
              <button type="button" onClick={() => setType(index)}>
                <img src={icon} alt="Tipo da Tarefa"
                  className={type && type !== index && 'inative'} />
              </button>
            ))
          }
        </styles.TypeIcons>

        <styles.Input>
          <span>Título</span>
          <input type="text" placeholder='Título da tarefa...'
            onChange={event => setTitle(event.target.value)} value={title}></input>
        </styles.Input>

        <styles.TextArea>
          <span>Descrição</span>
          <textarea rows={5} placeholder="Detalhes da tarefa..."
            onChange={event => setDescription(event.target.value)} value={description} />
        </styles.TextArea>

        <styles.Input>
          <span>Data</span>
          <input type="date" placeholder='Título da tarefa...'
            onChange={event => setDate(event.target.value)} value={date}></input>
        </styles.Input>

        <styles.Input>
          <span>Hora</span>
          <input type="time" placeholder='Título da tarefa...'
            onChange={event => setHour(event.target.value)} value={hour}></input>
        </styles.Input>

        <styles.CheckBoxE_ExcluirButton>
          <div>
            <input type="checkbox" checked={done} onChange={() => setDone(!done)} />
            <span>CONCLUÍDO</span>
          </div>
          <button type="button" onClick={Remove}>EXCLUIR</button>
        </styles.CheckBoxE_ExcluirButton>

        <styles.SaveButton>
          <button type="button" onClick={Save}>SALVAR</button>
        </styles.SaveButton>

      </styles.Formulario>

      <Footer />

    </styles.Container>
  )
}

export default CreateTask;