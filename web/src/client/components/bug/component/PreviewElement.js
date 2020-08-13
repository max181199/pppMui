import React from 'react'
import styled from 'styled-components';



function PreviewElement(props){

    const { photo , index} = props
        let fr = new FileReader()
        fr.readAsDataURL(photo)
        fr.onload = () => {
            let img = document.getElementById(`testIMG${index}`)
            if ( img !== null){
                img.setAttribute('src', fr.result);
            }
        } 

    console.log(photo)

    return(
        <div>
            <img id={`testIMG${index}`} alt={photo.name} />
        </div>
    )

}

export default PreviewElement;