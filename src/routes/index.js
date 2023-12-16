import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from '../views(pages)/Home'
import CreateTask from '../views(pages)/CreateTask'
import QrCode from '../views(pages)/QrCode'

export default function ControleRoteamento(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/task" element={<CreateTask/>}/>
                <Route path="/task/:idtask" element={<CreateTask/>}/>
                <Route path="/qrcode" element={<QrCode/>}/>
            </Routes>
        </BrowserRouter>
    )    
}
