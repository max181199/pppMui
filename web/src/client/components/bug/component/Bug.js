import React, { useEffect, useCallback, useLayoutEffect } from 'react'
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
import TextField from '@material-ui/core/TextField';


const StIconButton = styled(IconButton)`
    font-size : 28px;
    padding : 5px;
    margin-left : 10px;
    margin-right : 10px;
`;

const StBugIcon = styled(BugReportIcon)`
    color : white;
   
`;

const StBadge = styled(Badge)`
    & > span{
        top : 20%;
        right : 20%;
    }    
`;

const StPaper = styled(Paper)`
    position : absolute;
    top : calc( ${ props => props.size[1]/2}px - 30vmin);
    left : calc( ${ props => props.size[0]/2}px - 30vmin);
    background-color : rgba(245, 245, 245, 1);
    border : 4px solid #005cb2;
    height : 60vmin;
    width : 60vmin;
    border-radius : 100%;
`;

const BackPaper = styled(Paper)`
    outline: none;
    height : ${ props => props.size[1]}px;
    width : ${ props => props.size[0]}px;
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
`;

const StDiv = styled.div`
    outline: none;
`;

const Desck = styled(Paper)`
    outline: none;
    margin-left : 0.5vw;
    width : 83vw;
    height : 49vh;
    margin-top: 1vh;
    margin-bottom : 1vh;
    border : 2px solid lightgrey;
    overflow-y : auto;
    color : grey;
    text-align : center;
    font-size : 33px;
    padding : 20px;
`;

const MessagePaper = styled(Paper)`
    outline: none;
    margin-left : 0.5vw;
    width : 83vw;
    height : 39vh;
    overflow-y : auto;
    padding : 20px;
    font-size : 30px;
    display : block;
`;

const STF = styled(TextField)`
    width : 50vw;
    & .MuiInputLabel-root{
        font-size : 20px;
    }
    & .MuiInputBase-root{
        margin-top : 20px;
        font-size : 20px;
    }
`;

const STFTA = styled(TextField)`
    width : 80vw;
    margin-top : 3vh;
    & .MuiInputLabel-root{
        font-size : 30px;
        background-color : white;
        padding : 0px 20px;
        align-self : center;
    }
    & .MuiInputBase-root{
        font-size : 20px;
        margin-top : 5px;
    }
`;

function Bugs(props){

    const {photos , AddPhotos} = props
    const [ open , setOpen ] = useState(false)
    const [ form , setForm ] = useState(false)
    const [ message , setMessage ] = useState({
        email : 'mx181199@gmail.com',
        theme : '',
        text  : ''
    })

    const [ size , setSize ] = useState([0,0])

    const updateMessage = ( mess )=> {
        setMessage({ ...message, ...mess})
    } 

    const onDrop = useCallback(acceptedFiles => {
        AddPhotos(acceptedFiles);
        setOpen(false);  
      }, []);

    const onDropTwo = useCallback(acceptedFiles => {
        AddPhotos(acceptedFiles);
    }, []);

    useEffect(()=>{
        if(open){
            window.addEventListener('dragenter', null);
        } else{
            window.addEventListener('dragenter', ()=> {setOpen(true);}); 
        }
    },[open])

    useLayoutEffect(() => {
        function updateSize() {
          setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);


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
                    <BackPaper size={size} onDrop={(e)=>{e.stopPropagation();e.preventDefault();setOpen(false);}}/>
                    <ClickAwayListener onClickAway={()=>{setOpen(false)}}>
                        <StPaper size={size} >
                            <DropZone size={size} onDrop={onDrop} accept={"image/*"}/>
                        </StPaper> 
                    </ClickAwayListener>    
                </div>       
            </Modal>
            <Modal
                open={form}
            >
                <StDiv>
                    <ClickAwayListener onClickAway={()=>{setForm(false)}}>
                        <Base>
                            <MessagePaper elevation={0}>
                                <STF
                                    label={'Почта'}
                                    value={message.email}
                                    onChange={(e)=>{updateMessage({ email : e.target.value})}}
                                />
                                <STFTA
                                    label={'Сообщение'}
                                    multiline
                                    variant="outlined"
                                    value={message.text}
                                    rows={7}
                                    onChange={(e)=>{updateMessage({ text : e.target.value})}}
                                />
                            </MessagePaper>
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