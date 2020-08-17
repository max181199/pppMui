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
import { AddPhotos, DropPhotos, DropPhoto} from '../actions';
import Button from '@material-ui/core/Button';
import PreviewZone from './PreviewZone'
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SendIcon from '@material-ui/icons/Send';
import blue from '@material-ui/core/colors/blue';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    margin-left : 1.5vw;
    width : 80vw;
    height : 47vh;
    margin-top: 1vh;
    margin-bottom : 2vh;
    border : 4px solid lightgrey;
    overflow-y : auto;
    color : grey;
    text-align : center;
    font-size : 33px;
    padding : 20px;
`;

const MessagePaper = styled(Paper)`
    outline: none;
    width : 83vw;
    height : 39vh;
    overflow-y : auto;
    padding : 0;
    padding-top : 20px;
    font-size : 30px;
    display : block;
    padding-bottom : 0;
`;

const STF = styled(TextField)`
    width : 50vw;
    margin-left : 2vw;
    & .MuiInputLabel-root{
        font-size : calc( 12px + 0.8vw);
    }
    & .MuiInputBase-root{
        margin-top : calc( 12px + 0.8vw);
        font-size : calc( 12px + 0.8vw);
    }
`;

const STFTA = styled(TextField)`
    width : 80vw;
    margin-top : 3vh;
    margin-left : 1.5vw;
    font-size :  calc( 18px + 0.8vw);
    & .MuiInputLabel-root{
        font-size :  calc( 18px + 0.8vw);
        background-color : white;
        padding : 0px 15px;
        align-self : center;
    }
    & .MuiInputBase-root{
        font-size : calc( 12px + 0.8vw);
        margin-top : 5px;
    }
`;

const FlexDiv = styled.div`
    display : flex;
    align-items: center;
`;

const StIcBuMG = styled(IconButton)`
    font-size : calc( 10px + 2vw );
    padding : 10px;
    margin-left : 10vw;
    margin-right : 2vw;
`;

const StIcBu = styled(IconButton)`
    font-size : calc( 10px  + 2vw );
    padding : 10px;
    margin-left : 2vw;
    margin-right : 2vw;
`;

const StIcBuSend = styled(Button)`
    font-size : calc( 10px  + 2vw );
    padding : 10px;
    margin-left : 2vw;
    margin-right : 2vw;
    & > span{
        & > svg{
            color : ${blue[800]};
        }
    }
`;

const StCir = styled(CircularProgress)`
    margin-top : calc( 25px + 10vh);
    height : calc( 25vw) !important;
    width : calc( 25vw) !important;
    align-self : center;
`;

const StDivCir = styled.div`
    align-items: center;
    width: 80vw;
    text-align: center;
    font-size : calc( 10px  + 2vw );
    color : grey;
`;

function Bugs(props){

    const {photos , AddPhotos , DropPhotos, DropPhoto} = props
    const [ open , setOpen ] = useState(false)
    const [ form , setForm ] = useState(false)
    const [ state , setState ] = useState('base')
    const [ err, setErr ] = useState(false)
    const [ message , setMessage ] = useState({
        email : 'mx181199@gmail.com',
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

    const savePhoto = () => {
        let inp = document.getElementById('upload-photo')
        AddPhotos(inp.files)
    }


    const sendEmail = async ( images ) => {

        const data = new FormData()
        images.forEach( (element) => {
            data.append( 'photos', element , element.name ) 
        });
        data.append('email',message.email)
        data.append('text',message.text)        
        let response = await fetch('/api/mail', {
            method: 'POST',
            body: data
        });
        let result = await response.json();
        if ( result.state == 'ok' ){
            setMessage({
                email : 'mx181199@gmail.com',
                text  : ''
            })
        } 
        console.log(result.state)
        if(result.state === 'error'){
            AddPhotos(images)
        }
        return result.state
    }

    const BlockSend = ( )=>{
        setState('send')
            const MaxBlockMessageSize = 24000000;
            let NumberOfBlock = 0;
            let CurrentBlockSize = 0;
            let MassiveOfBlocks = {};

            MassiveOfBlocks[`${NumberOfBlock}`] = []
            photos.forEach( (element)=>{
                CurrentBlockSize += element.size;
                if( CurrentBlockSize <= MaxBlockMessageSize){
                    MassiveOfBlocks[`${NumberOfBlock}`].push(element)
                } else {
                    NumberOfBlock +=1;
                    CurrentBlockSize = element.size;
                    MassiveOfBlocks[`${NumberOfBlock}`] = []
                    MassiveOfBlocks[`${NumberOfBlock}`].push(element)
                }
            });
            DropPhotos();
            for (let  block in MassiveOfBlocks) {
                setErr(false)
                sendEmail(MassiveOfBlocks[block]).then( data => { if(data !== 'ok'){setErr(true)}  })
            }  
        setState('base')
    }

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
                        {   state === 'base' 
                            ?
                            <div>
                                <MessagePaper elevation={0}>
                                    <FlexDiv>
                                        <STF
                                            label={'Почта'}
                                            value={message.email}
                                            onChange={(e)=>{updateMessage({ email : e.target.value})}}
                                        />
                                        <div>
                                            <label htmlFor="upload-photo">
                                                <input
                                                    style={{ display: "none" }}
                                                    id="upload-photo"
                                                    name="upload-photo"
                                                    type="file"
                                                    accept = "image/*"
                                                    multiple = {true}
                                                    onChange={()=>{savePhoto()}}
                                                />
                                                <Tooltip
                                                    title='Загрузить изображение'
                                                >
                                                    <StIcBuMG  component="span">
                                                        <CloudUploadIcon fontSize='inherit'/>
                                                    </StIcBuMG>
                                                </Tooltip>
                                            </label>
                                        </div>
                                        <Tooltip
                                            title='Удалить все изображения'
                                        >
                                            <StIcBu onClick={()=>{DropPhotos()}}>
                                                <DeleteForeverIcon fontSize='inherit' />
                                            </StIcBu>
                                        </Tooltip>
                                        <Tooltip
                                            title='Отправить'
                                        >
                                            <StIcBuSend onClick={BlockSend}> 
                                                <SendIcon fontSize='inherit' />
                                            </StIcBuSend>
                                        </Tooltip>
                                    </FlexDiv>    
                                    <STFTA
                                        label={err ? 'Произошла ошибка, следующие изображения не были отправлены' : 'Сообщение'}
                                        error={err}
                                        id='text-input'
                                        multiline
                                        rows={size[1]*0.21/30  }
                                        variant="outlined"
                                        value={message.text}
                                        onChange={(e)=>{updateMessage({ text : e.target.value})}}
                                    />
                                </MessagePaper>
                                <Desck>
                                    <PreviewZone/>
                                </Desck>    
                            </div>
                            :
                            <StDivCir>
                                <StCir/>
                                <br/>
                                <br/>
                                <br/>
                                Пожалуйста, подождите, сообщение отправляется
                            </StDivCir>
                        }       
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
    AddPhotos,
    DropPhotos,
    DropPhoto
})(Bugs)