import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Typography  } from '@material-ui/core';
import { connect } from 'react-redux';
import {reportDeleted,filtersChanged} from '../actions'
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import WarningIcon from '@material-ui/icons/Warning';

const LargePaperBlock = styled(Paper)`
    width : 44.6vw;
    min-width : 588px;
    border-radius : 0px;
    border : solid 0.5px lightgrey;
    padding-top : max(2vh , 10px);
    padding-bottom : max(2vh , 10px);
    padding-left : max(1vw , 5px);
    padding-right : max(1vw , 5px);
`;

const StyledIconButton = styled(IconButton)`
    font-size : max( 26px , 1.7vw);
`;

const StyledTypografy = styled(Typography)`
    font-size : max( 16px , 2px + 1vw);
    align-self: center;
    lineHeight : 1.5;
`;

const StyledTypografyWithMargin = styled(Typography)`
    font-size : max( 16px , 2px + 1vw);
    margin-left : max( 5px , 0.5vw );
    align-self: center;
    lineHeight : 1.5;
`;


const BoxIcon = styled(Box)`
    font-size : max( 26px , 1.7vw);
    margin : 0;
    padding : 0;
`;

const WarningIconStyled = styled(WarningIcon)`
    color : red;
    margin : 12px;
`;

const StyledCircularProgress = styled(CircularProgress)`
    margin-left : max( 5px , 0.5vw );
    align-self : center;
`;

function ReportElement(props){

    const _apiBase = `${window.location.protocol}//${window.location.host}/api`;
    const { index ,info , filtersChanged , reportDeleted } = props

    const transferOptions = ()=>{
        filtersChanged({
            base: `${info.params.base}${(info.params.num) ? `_${info.params.num}` : ''}${(info.params.label) ? `_${info.params.label}` : ''}`,
            nameArt: info.params.nameArt,
            note: info.params.note,
            from: info.params.from,
            to: info.params.to,
            period: info.params.period,
            profile: info.params.profile,
            compPeriod: info.params.compPeriod,
            compProfile: info.params.compProfile,
            isComparison: (info.params.isComparison == 'true') ? true : false,
            count: (+info.params.count == -1) ? '' : +info.params.count,
            sortClick: info.params.sortClick,
            sortClickI: info.params.sortClickI,
            sortRefuseTime: info.params.sortRefuseTime,
            sortRefuse: info.params.sortRefuse,
            sortRdn: info.params.sortRdn,
            ms: (info.params.ms !== 'false' ? true : false),
            fix: (info.params.fix !== 'false' ? true : false),
            isDetail: (info.params.isDetail !== 'false' ? true : false)
          })
    }

    const SaveApi = ()=>{
        return null
    }

    return(
        <LargePaperBlock  elevation={0}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                spacing={0}
            >
                <Grid item>
                    <Box>
                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="center"
                            spacing={1}
                        >
                            {
                                (info.is_ready && info.is_error) 
                                ?
                                <Grid item>
                                    <Tooltip 
                                        placement="left" 
                                        title="Произошла ошибка при построении отчета"
                                    >
                                         <BoxIcon>
                                            <WarningIconStyled fontSize='inherit'/>
                                        </BoxIcon>
                                    </Tooltip>
                                </Grid>   
                                :
                                null
                            }
                            {
                                (info.is_ready && !info.is_error) 
                                ?
                                <Grid item>
                                    <Tooltip 
                                        placement="left" 
                                        title="Сохранить"
                                    >
                                        <Link
                                            href={`${_apiBase}/downloadReport?path=${info.path}`}
                                        >
                                            <StyledIconButton onClick={()=>{SaveApi()}}>
                                                <SaveIcon fontSize='inherit'/>
                                            </StyledIconButton>
                                        </Link>
                                    </Tooltip> 
                                </Grid> 
                                :
                                null
                            }  
                            <Grid item>
                                <Tooltip 
                                        placement="left" 
                                        title="Перенести настройки"
                                >
                                    <StyledIconButton onClick={()=>{transferOptions()}}>
                                        <SwapHorizIcon fontSize='inherit'/>
                                    </StyledIconButton>
                                </Tooltip>    
                            </Grid> 
                            <Grid item>
                                <Tooltip 
                                        placement="left" 
                                        title="Удалить"
                                >
                                    <StyledIconButton onClick={()=>{reportDeleted(index)}}>
                                        <DeleteIcon fontSize='inherit'/>
                                    </StyledIconButton>
                                </Tooltip>    
                            </Grid>     
                        </Grid>    
                    </Box>
                </Grid>
                <Grid item >
                    <Box ml={ 'max( 10px , 1vw )'}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box display='flex'>
                                    <StyledTypografy  variant='h6'>База_номер_метка:</StyledTypografy>
                                    <StyledTypografyWithMargin >
                                        {(info.params.base) ? `${info.params.base}${(info.params.num) ? `_${info.params.num}` : ''}${(info.params.label) ? `_${info.params.label}` : ''}` : '-'}
                                    </StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin  variant='h6'>Название статьи:</StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin>
                                        {(info.params.nameArt) ? info.params.nameArt : '-'} 
                                    </StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin   variant='h6'>Текст примечания:</StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin >
                                        {(info.params.note) ? info.params.note : '-'}
                                    </StyledTypografyWithMargin>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display='flex'>
                                    <StyledTypografy variant='h6'>{`Тип:   `} </StyledTypografy>
                                    {
                                        (info.params.isComparison != 'false')
                                        ?
                                        <StyledTypografyWithMargin > cо сравнением, </StyledTypografyWithMargin>
                                        :
                                        <StyledTypografyWithMargin > без сравнения, </StyledTypografyWithMargin> 
                                    }
                                    {
                                        (info.params.isDetail != 'false')
                                        ?
                                        <StyledTypografyWithMargin> с детализацией </StyledTypografyWithMargin>
                                        :
                                        <StyledTypografyWithMargin> без детализации </StyledTypografyWithMargin> 
                                    }
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display='flex'>
                                    <StyledTypografy variant='h6'>{`Количество позиций:`} </StyledTypografy>
                                    {
                                        (info.params.count == -1)
                                        ?
                                        <StyledTypografyWithMargin> Все </StyledTypografyWithMargin>
                                        :
                                        <StyledTypografyWithMargin> {info.params.count} </StyledTypografyWithMargin> 
                                    }
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display='flex'>
                                    <StyledTypografy variant='h6'>{`Процент отказа:`} </StyledTypografy>
                                    <StyledTypografyWithMargin > от </StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin > {info.params.from} </StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin > до </StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin > {info.params.to} </StyledTypografyWithMargin>  
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display='flex'>
                                    <StyledTypografy variant='h6'>{`Период:`} </StyledTypografy>
                                    <StyledTypografyWithMargin > {info.params.period} </StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin variant='h6'>{`Сравн. период:`} </StyledTypografyWithMargin>
                                    {
                                        (info.params.isComparison != 'false')
                                        ?
                                        <StyledTypografyWithMargin > {info.params.compPeriod} </StyledTypografyWithMargin>
                                        :
                                        <StyledTypografyWithMargin > - </StyledTypografyWithMargin> 
                                    } 
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display='flex'>
                                    <StyledTypografy variant='h6'>{`Профиль:`} </StyledTypografy>
                                    <StyledTypografyWithMargin> {info.params.profile} </StyledTypografyWithMargin>
                                    <StyledTypografyWithMargin variant='h6'>{`Сравн. профиль:`} </StyledTypografyWithMargin>
                                    {
                                        (info.params.isComparison != 'false')
                                        ?
                                        <StyledTypografyWithMargin > {info.params.compProfile} </StyledTypografyWithMargin>
                                        :
                                        <StyledTypografyWithMargin > - </StyledTypografyWithMargin> 
                                    } 
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display='flex'>
                                    <StyledTypografy variant='h6'>{`Сортировка:`} </StyledTypografy>
                                    {
                                        (info.params.sortClick == 'DESC')
                                        ?
                                        <StyledTypografyWithMargin > По убыванию кликов </StyledTypografyWithMargin>
                                        :
                                        null
                                    }
                                    {
                                        (info.params.sortClick == 'ASC')
                                        ?
                                        <StyledTypografyWithMargin> По возрастанию кликов </StyledTypografyWithMargin>
                                        :
                                        null
                                    }
                                    {
                                        (info.params.sortClickI == 'DESC')
                                        ?
                                        <StyledTypografyWithMargin> По убыванию кликов по I </StyledTypografyWithMargin>
                                        :
                                        null
                                    }
                                    {
                                        (info.params.sortClickI == 'ASC')
                                        ?
                                        <StyledTypografyWithMargin> По возрастанию кликов по I </StyledTypografyWithMargin>
                                        :
                                        null
                                    }
                                    {
                                        (info.params.sortRefuse == 'DESC')
                                        ?
                                        <StyledTypografyWithMargin > По убыванию отказов </StyledTypografyWithMargin>
                                        :
                                        null
                                    }
                                    {
                                        (info.params.sortRefuse == 'ASC')
                                        ?
                                        <StyledTypografyWithMargin> По возрастанию отказов</StyledTypografyWithMargin>
                                        :
                                        null
                                    } 
                                    {
                                        (info.params.sortRefuseTime == 'DESC')
                                        ?
                                        <StyledTypografyWithMargin> По убыванию времени отказа </StyledTypografyWithMargin>
                                        :
                                        null
                                    }
                                    {
                                        (info.params.sortRefuseTime == 'ASC')
                                        ?
                                        <StyledTypografyWithMargin > По возрастанию времени отказа </StyledTypografyWithMargin>
                                        :
                                        null
                                    }
                                    {
                                        (info.params.sortRdn == 'DESC')
                                        ?
                                        <StyledTypografyWithMargin> По убыванию позиции в РДН </StyledTypografyWithMargin>
                                        :
                                        null
                                    } 
                                    {
                                        (info.params.sortRdn == 'ASC')
                                        ?
                                        <StyledTypografyWithMargin> По возрастанию позиции в РДН </StyledTypografyWithMargin>
                                        :
                                        null
                                    }
                                    {
                                        (info.params.ms !== 'false') 
                                        ?
                                        [
                                            <StyledTypografy key={'m1'} > , </StyledTypografy>,
                                            <StyledTypografyWithMargin key={'m2'} > м-ссылка </StyledTypografyWithMargin>
                                        ]
                                        :
                                        null
                                    }
                                    {
                                        (info.params.fix !== 'false') 
                                        ?
                                        [
                                            <StyledTypografy key={'f1'} > , </StyledTypografy>,
                                            <StyledTypografyWithMargin key={'f2'}> закреп.</StyledTypografyWithMargin>,

                                        ]
                                        :
                                        null
                                    }                
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box display='flex'>
                                    <StyledTypografy variant='h6'>{`Статус:`} </StyledTypografy>
                                    {
                                        (info.is_ready && !info.is_error)
                                        ?
                                        <StyledTypografyWithMargin> {'Готов'} </StyledTypografyWithMargin>
                                        :
                                            (info.is_ready && info.is_error) 
                                            ?
                                            <StyledTypografyWithMargin>Ошибка на сервере</StyledTypografyWithMargin> 
                                            :
                                            <StyledTypografyWithMargin> Построение отчета</StyledTypografyWithMargin> 
                                    }
                                    {
                                        (info.is_ready) 
                                        ? 
                                        null 
                                        :
                                        <StyledCircularProgress size={'max( 20px , 1vw )'}  />
                                    } 
                                </Box>
                            </Grid>
                        </Grid>    
                    </Box>
                </Grid>
            </Grid>
        </LargePaperBlock>
    )
}

export default connect( null, {filtersChanged,reportDeleted})(ReportElement)