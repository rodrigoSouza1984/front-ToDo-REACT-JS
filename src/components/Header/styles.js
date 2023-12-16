import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 70px;
    background:#20295f;
    border-bottom: 5px solid #ee6b26;   

    display: flex;
`


export const LeftSide = styled.div`
    width: 90%;
    height: 70px;    
    //background: black;

    display: flex;
    align-items: center; 
    padding-left: 10px;

        img{
            width:75px;
            height: 40px
        }
`

export const RightSide = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    //background: green;
    

    button {
        background: none;
        border: none;
        cursor: pointer;
      }
  
      a, button {
      color: #FFF;
      font-weight: bold;
      text-decoration: none;
      margin: 0 10px;    
  
      &:hover{
        color: #EE6B26;
      }       
    }

    #notification{

      //background: blue;  
      height: 40px;          

        img{
            width: 35px;
            height: 40px;          
        }

        span {
            background: #FFF;
            color: #EE6B26;
            padding: 3px 7px;
            border-radius: 50%;
            position: relative;
            top: -42px;
            right: 11px;
          }

          &:hover {
            opacity: 0.5;
          }
    }
  
    .dividir::after{
      content: "|";
      margin: 0 10px;
      color: #FFF;
    }
  
    button {
      font-size: 16px;
    }
`