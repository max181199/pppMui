import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import BugReportIcon from '@material-ui/icons/BugReport';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Modal from '@material-ui/core/Modal';
import DropZone from './DropZone'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { AddPhotos} from '../actions'


const StIconButton = styled(IconButton)`
    font-size : 28px;
    padding : 5px;
    margin-left : 10px;
    margin-right : 10px;
    border : 4px solid burlywood;
`;

const StBugIcon = styled(BugReportIcon)`
    color : white;
   
`;

const StBadge = styled(Badge)`
    & > span{
        top : 20%;
        right : 5%;
        background-color : burlywood;
    }    
`;

function Bugs(props){

    const {photos , AddPhotos} = props
    const [ open , setOpen ] = useState(false)
    


    const onDrop = useCallback(acceptedFiles => {
        AddPhotos(acceptedFiles);
        setOpen(false);  
      }, []);

    useEffect(()=>{
        if(open){
            document.ondragenter = null
        } else{
            document.ondragenter = ()=> {setOpen(true);}
        }
    },[open])

    return(
        <div>
            <Tooltip
                title='Сообщить о баге'
            >
                <StBadge 
                    badgeContent={photos.length} 
                    invisible = {photos.length <= 0}
                    max={99}
                    overlap="circle"
                >
                    <StIconButton onClick={()=>{setOpen(true);}}>
                        <StBugIcon fontSize='inherit'/>
                    </StIconButton>
                </StBadge>
            </Tooltip>
            <Modal
                open={open}
            >
                <Paper>
                    <DropZone onDrop={onDrop} accept={"image/*"}/>
                </Paper>    
            </Modal>    
        </div>
    )
}

export default connect( (store)=>({ 
    photos : store.photos
}),{
    AddPhotos
})(Bugs)