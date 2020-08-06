import React, { useState } from 'react';
import ExcelHeader from '../excelHeader';
import { createMuiTheme,ThemeProvider, withTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { AppBar } from '@material-ui/core';
import { Typography , Hidden } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import WorkSpaceExcel from '../excelWorkspace';
import ReportConstruction from '../reportsConstructor';
import Reports from '../reports'
import styled from 'styled-components';

const LeftPapper = withStyles({
    root:{
        width  : '45vw',
        height : '100%',
        minWidth : '608px',
    }
})( Paper )

const RightPapper = withStyles({
    root:{
        width  : '45vw',
        height : '100%',
        minWidth : '608px',
    
    }
})( Paper )

const NormalLeftToolbarPapper = withStyles({
    root:{
        width  : '46vw',
        minWidth : '628px',
        height : '6vh',
        minHeight : '50px',
        backgroundColor : grey[300],
        borderRadius : '0px',
        display : 'flex',
        position : 'absolute',
        top : 'calc( 2vh + 50px )',
        left: '2vw',
        zIndex : '3'
    }
})(Paper)

const LargeLeftToolbarPapper = withStyles({
    root:{
        width  : '46vw',
        minWidth : '628px',
        height : '6vh',
        minHeight : 'calc( 100px + 1vw )',
        backgroundColor : grey[300],
        borderRadius : '0px',
        display : 'flex',
        position : 'absolute',
        top : '2vh',
        left: '2vw',
        zIndex : '3'
    }
})(Paper)


const NormalRightToolbarPapper = withStyles({
    root:{
        width  : '46vw',
        minWidth : '628px',
        height : '6vh',
        minHeight : '50px',
        backgroundColor : grey[300],
        borderRadius : '0px',
        display : 'flex',
        position : 'absolute',
        top : 'calc( 2vh + 50px )',
        left: 'calc( max( 628px , 46vw) + 6vw)',
        zIndex : '3'
    }
})(Paper)

const LargeRightToolbarPapper = withStyles({
    root:{
        width  : '46vw',
        minWidth : '628px',
        height : '6vh',
        minHeight : 'calc( 100px + 1vw )',
        backgroundColor : grey[300],
        borderRadius : '0px',
        display : 'flex',
        position : 'absolute',
        top : '2vh',
        left: 'calc( max( 628px , 46vw) + 6vw)',
        zIndex : '3'
    }
})(Paper)



const Typography6on8  = withStyles({
    root:{
        fontSize : 'calc( 6px + 0.8vw)',
        lineHeight : '1.1',
        textAlign : 'center',
        alignSelf : 'center',
        
    }
})(Typography)

function main(){
    return (
        <Box>
            <Hidden only='xl'>
                <ExcelHeader/>
            </Hidden>
            <Box style={{display : 'flex'}}>
                <WorkSpaceExcel>
                    <LeftPapper style={{zIndex : '2'}} elevation={0}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Hidden only='xl'>
                                    <NormalLeftToolbarPapper elevation={1}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <Typography6on8 variant='h6' style={{color : 'black'}}>Конструктор отчетов</Typography6on8>
                                            </Grid>
                                        </Grid>
                                    </NormalLeftToolbarPapper>
                                </Hidden>
                                <Hidden only={['lg','md','sm','xs']}>
                                    <LargeLeftToolbarPapper elevation={1}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <Typography6on8 variant='h6' style={{color : 'black'}}>Конструктор отчетов</Typography6on8>
                                            </Grid>
                                        </Grid>
                                    </LargeLeftToolbarPapper>
                                </Hidden>         
                            </Grid>
                            <Grid item style={{overflowY : 'auto'}}>
                                <ReportConstruction/>
                            </Grid>
                        </Grid>    
                    </LeftPapper>
                </WorkSpaceExcel>
                <WorkSpaceExcel >
                    <RightPapper elevation={0}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <Hidden only='xl'>
                                    <NormalRightToolbarPapper elevation={1}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <Typography6on8 variant='h6' style={{color : 'black'}}>Готовые отчеты</Typography6on8>
                                            </Grid>
                                        </Grid>
                                    </NormalRightToolbarPapper>
                                </Hidden>
                                <Hidden only={['lg','md','sm','xs']}>
                                    <LargeRightToolbarPapper elevation={1}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <Typography6on8 variant='h6' style={{color : 'black'}}>Готовые отчеты</Typography6on8>
                                            </Grid>
                                        </Grid>
                                    </LargeRightToolbarPapper>
                                </Hidden>
                            </Grid>
                            <Grid item>
                                <Reports/>
                            </Grid>
                        </Grid>  
                    </RightPapper>
                </WorkSpaceExcel>
            </Box>
        </Box> 
    )
}

export default main