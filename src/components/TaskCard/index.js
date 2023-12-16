import React, {useMemo} from 'react'
import * as styles from './styles'
import { format } from 'date-fns'

import typeIcons from '../../utils/typeIcons'

function TaskCard({ type, title, when , done}) {
  const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy'))
  const hour = useMemo(() => format(new Date(when), 'HH:mm'))
  
  return (
    <styles.Container done={done}>

        <styles.TopCard>
            <img src={typeIcons[type]} alt="Icone de Tarefa"/>
            <h3>{title}</h3>
        </styles.TopCard>

        <styles.BottomCard>
          <strong>{date}</strong>
          <span>{hour}</span>            
        </styles.BottomCard>

    </styles.Container>
  )

}

export default TaskCard;