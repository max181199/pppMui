import React from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import {Hidden, Box} from '@material-ui/core';

const StyledPaperOneString = styled(Paper)`
    margin-top : max(calc( 100px + 2vh ) ,calc(50px + 8vh)) ;
    margin-bottom : 2vh;
    margin-left : 2vw;
    margin-right : 2vw;
    width : 46vw;
    min-width : 628px;
    height : min( calc(96vh - 100px) , calc( 90vh - 50px));
    display : flex;
    overflow-y  : auto;
`;

const StyledPaperZeroString = styled(Paper)`
    margin-top : max(calc( 100px + 2vh + 1vw ) , 8vh);
    margin-bottom : 2vh;
    margin-left : 2vw;
    margin-right : 2vw;
    min-width : 628px;
    width : 46vw;
    height : min( calc(96vh - 150px - 1vw) , calc( 90vh - 100px - 1vw));
    display : flex;
    overflow-y  : auto;
`;

function WorkSpaceExcel( props ){
    return(
        <Box>
            <Hidden only={'xl'}>
                {
                    <StyledPaperOneString elevation={2}>
                        {props.children}
                    </StyledPaperOneString>
                }
            </Hidden>
            <Hidden only={['lg','md','sm','xs']}>
            {
                    <StyledPaperZeroString elevation={2}>
                        {props.children}
                    </StyledPaperZeroString> 
            }
            </Hidden>
        </Box>
        
    )
}

export default WorkSpaceExcel