import React from 'react'
import * as styles from './styles'

import filter from '../../assets/filter.png'



function FilterCard( {title, actived} ) {
  return (
    <styles.Container actived={actived}>
        <img src={filter} alt="Filtro"/>    
        <span>{title}</span>    
    </styles.Container>
  )

}

export default FilterCard;