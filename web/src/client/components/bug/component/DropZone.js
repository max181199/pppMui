import React from 'react'
import styled from 'styled-components';
import { useDropzone } from "react-dropzone";

const StDiv = styled.div`
    background-color : greenyellow;
`;

const DropZone = ({ onDrop, accept })=>{

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
      });

    return(
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div>
            {isDragActive ? (
                <p> Release to drop the files here</p>
            ) : (
                <p> 
                Drag 'n' drop some files here, or click to select files
                </p>
            )}
            </div>
        </div>
    )
}

export default DropZone