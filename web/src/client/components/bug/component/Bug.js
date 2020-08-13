import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import BugReportIcon from '@material-ui/icons/BugReport';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Modal from '@material-ui/core/Modal';
import DropZone from './DropZone'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { AddPhotos} from '../actions';
import PreviewZone from './PreviewZone'



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

const StPaper = styled(Paper)`
    position : absolute;
    top : ${ document.documentElement.clientHeight/2 -200}px;
    left : ${ document.documentElement.clientWidth/2 -200}px;
    background-color : rgba(245, 245, 245, 1);
    border : 4px solid #005cb2;
    height : 400px;
    width : 400px;
    border-radius : 100%;
`;

const BackPaper = styled(Paper)`
    outline: none;
    height : ${ document.documentElement.clientHeight}px;
    width : ${ document.documentElement.clientWidth}px;
    background-color : rgba(0, 0, 0, 0.2);
`;

const Base = styled(Paper)`
    background-color : white;
    margin-left : 8vw;
    margin-right : 8vw;
    margin-top : 5vh;
    margin-bottom : 5vh;
    width : 84vw;
    height : 90vh;
    outline: none;
    display: flex;
`;

const StDiv = styled.div`
    outline: none;
`;

const Desck = styled(Paper)`
    outline: none;
    margin-left : 0.5vw;
    width : 83vw;
    height : 49vh;
    margin-top: 40vh;
    margin-bottom : 1vh;
    border : 2px solid lightgrey;
    overflow-y : auto;
    color : grey;
    text-align : center;
    font-size : 33px;
    padding : 0;
`;

function Bugs(props){

    const {photos , AddPhotos} = props
    const [ open , setOpen ] = useState(false)
    const [ form , setForm ] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        AddPhotos(acceptedFiles);
        setOpen(false);  
      }, []);

    const onDropTwo = useCallback(acceptedFiles => {
        AddPhotos(acceptedFiles);
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
                    <StIconButton onClick={()=>{setForm(true);}}>
                        <StBugIcon fontSize='inherit'/>
                    </StIconButton>
                </StBadge>
            </Tooltip>
            <Modal
                open={open}
            >
                <div>
                    <BackPaper onDrop={(e)=>{e.stopPropagation();e.preventDefault();setOpen(false);}}/>
                    <StPaper >
                        <DropZone onDrop={onDrop} accept={"image/*"}/>
                    </StPaper> 
                </div>       
            </Modal>
            <Modal
                open={form}
            >
                <StDiv>
                    <ClickAwayListener onClickAway={()=>{setForm(false)}}>
                        <Base>
                            <Desck>
                                <PreviewZone/>
                            </Desck>    
                        </Base>
                    </ClickAwayListener>
                </StDiv>    
            </Modal>        
        </div>
    )
}

export default connect( (store)=>({ 
    photos : store.photos
}),{
    AddPhotos
})(Bugs)