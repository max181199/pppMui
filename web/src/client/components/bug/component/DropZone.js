import React from 'react'
import styled from 'styled-components';
import { useDropzone } from "react-dropzone";

const StDiv = styled.div`
    position : fixed;
    top : ${ document.documentElement.clientHeight/2 -195}px;
    left : ${ document.documentElement.clientWidth/2 -195}px;
    background-color : rgba(240, 240, 240, 1);
    height : 390px;
    width : 390px;
    border-radius : 100%;
    outline: none;
    text-align: center;
    display: flex;
    & > p {
        align-self : center;
        color : grey;
        font-size : 24px;
    }
`;

const DropZone = ({ onDrop, accept })=>{

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
      });

    return(
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <StDiv>
            {isDragActive ? (
                <p> Отпустите изображение, чтобы загрузить его</p>
            ) : (
                <p> 
                Пожалуйста, перетащите изображение в данную область
                </p>
            )}
            </StDiv>
        </div>
    )
}

export default DropZone