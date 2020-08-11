import React , { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import {Box,Typography, CircularProgress} from '@material-ui/core';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import PrintIcon from '@material-ui/icons/Print';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SaveIcon from '@material-ui/icons/Save';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ToggleButton from "@material-ui/lab/ToggleButton";
import {filtersChangedTableHead} from '../actions'
import TableContent from './tableContent'
import { grey } from '@material-ui/core/colors';
import { Waypoint } from 'react-waypoint';


import { snippetsLoaded, newSnippetsLoaded,snippetsLoading} from '../actions'
import { getQuery } from '../services/query-service'
import { toSnippetsRequestForm } from '../services/transform'


const StyledTableContainer = styled(TableContainer)`
    width : 100vw;
    height : 100%
`;

const StyledHeadTableCellMark = styled(TableCell)`
    padding-top :  5px;
    padding-bottom : 5px;
    padding-left : 4px;
    padding-right : 4px;
    background : white;
    border : 1px solid lightgrey;
    border-bottom : 1px solid grey;
    min-width : 380px;
    width : 20vw;
    min-height : 60px;
    height : 5vh;
`;

const TypographyMark = styled(Typography)`
    line-height : 1;
    font-size :  calc( 8px + 1vw);
    margin : 0 ;
    margin-left : 2vw;
`;

const StyledHeadTableCellNote = styled(TableCell)`
    padding-top :  5px;
    padding-bottom : 5px;
    padding-left : 4px;
    padding-right : 4px;
    background : white;
    border : 1px solid lightgrey;
    border-bottom : 1px solid grey;
    min-width : 212.316px;
    width : 11.05vw;
    min-height : 60px;
    height : 5vh;
`;

const TypographyNote = styled(Typography)`
    line-height : 1;
    font-size :  calc( 8px + 0.6vw);
    margin : 0 ;
    margin-left : 0.5vw;
`;

const StyledHeadTableCellSort = styled(TableCell)`
    padding-top :  5px;
    padding-bottom : 5px;
    padding-left : 4px;
    padding-right : 4px;
    background : white;
    border : 1px solid lightgrey;
    border-bottom : 1px solid grey;
    min-width : 105.984px;
    width : 5.52vw;
    min-height : 60px;
    height : 5vh;
`;

const TypographySort = styled(Typography)`
    line-height : 1;
    font-size :  calc( 6px + 0.5vw);
    margin : 0 ;
    margin-left : 0.2vw;
`;

const StyledToggleButton = styled(ToggleButton)`
    padding : 0;
    min-width : 95px;
    width : 5vw;
    min-height : 24px;
    height : 1.5vh;
    margin : 0;

`;

const TypographyToggle = styled(Typography)`
    line-height : 1;
    font-size :  calc( 3px + 0.5vw);
    margin : 0 ;
`;

const StyledHeadTableCellIcon = styled(TableCell)`
    padding-top :  5px;
    padding-bottom : 5px;
    padding-left : 4px;
    padding-right : 4px;
    background : white;
    border : 1px solid lightgrey;
    border-bottom : 1px solid grey;
    min-width : 60px;
    width : 3.16vw;
    min-height : 60px;
    height : 5vh;
`;

const BoxIcon = styled(Box)`
    font-size : calc( 18px + 0.6vw);
`;

const StyledHeadTableCellSUPR = styled(TableCell)`
    padding-top :  5px;
    padding-bottom : 5px;
    padding-left : 4px;
    padding-right : 4px;
    background : white;
    border : 1px solid lightgrey;
    border-bottom : 1px solid grey;
    min-width : 360.08px;
    width : 18.9vw;
    min-height : 60px;
    height : 5vh;
`;

const TypographySUPR = styled(Typography)`
    line-height : 1;
    font-size :  calc( 8px + 0.8vw);
    margin : 0 ;
`;

  const StyledTableSortLabel = styled(TableSortLabel)`
        & .MuiSvgIcon-root{
            font-size : calc( 10px + 0.7vw);
            opacity: 1;
            color: ${ (props) => props.active ? 'black' :  grey[400]} !important;
            margin-left : 2px;
            margin-right : 2px;
        };
  `;

  const SnippetTP = styled(Typography)`
        color : #9e9e9e;
        font-size : calc( 16px + 0.8vw);
        align-self : center;
        text-align : center;
        
  `;

  const StTableCell = styled(TableCell)`
    text-align : center;
  `;

  const StCircularProgress = styled(CircularProgress)`
        margin-top : calc( 10px + 2vh);
        height : calc( 50px + 1vw) !important;
        width : calc( 50px + 1vw) !important;
  `;

  const NinjaTableCell = styled(TableCell)`
        padding : 0;
  `;

function table(props){

    const { cancel,isComparison,filters,filtersChangedTableHead,
        snippets,loadingSnippets,snippetsLoaded,newSnippetsLoaded,
        snippetsLoading, } = props

    const defaultTabFilter = {
        sortClick : 'asc',
        sortClickActive : false,
        sortClickI : 'asc',
        sortClickIActive : false,
        sortRefuse : 'asc',
        sortRefuseActive : false,
        sortRefuseTime : 'asc',
        sortRefuseTimeActive : false,
        sortRdn : 'asc',
        sortRdnActive : false,
        ms : false,
        fix : false,
    }

    const [ tableFilters , setTableFilters ] = useState(defaultTabFilter)
    const [ sync , setSync ] = useState('default')

    const updateTableFilters = ( upd ) => {
        setTableFilters( {...defaultTabFilter, ...upd })
    }
    const [ status , setStatus ] = useState('default')
    const [ snipSt , setSnipSt ] = useState('default')

    const toFilters = (obj)=>{
        return( {...filters , ...obj })
    }

    const toURL = (params)=>{
        let paramsForQuery = '';
        for (let prop in params) {
          paramsForQuery += `_${prop}=${params[prop]}&`
        }
        if (paramsForQuery.length > 0) {
          paramsForQuery = `?${paramsForQuery.slice(0, -1)}`;
        }
        return paramsForQuery
    }

    const url = new URLSearchParams(props.history.location.search);

    useEffect( ()=>{
        if(sync !== 'default' ){
           setSync('cancel')
           updateTableFilters( {sortClickActive : true, sortClick : 'desc' })
        }    
    },[cancel])

    useEffect( ()=>{
        if ( props.history.location.search === '' ){
            updateTableFilters({
                sortClick : filters.sortClick === 'DESC' ? 'desc' : 'asc',
                sortClickActive : filters.sortClick === false ? false : true,
                sortClickI : filters.sortClickI === 'DESC' ? 'desc' : 'asc',
                sortClickIActive : filters.sortClickI === false ? false : true,
                sortRefuse : filters.sortRefuse === 'DESC' ? 'desc' : 'asc',
                sortRefuseActive : filters.sortRefuse === false ? false : true,
                sortRefuseTime : filters.sortRefuseTime === 'DESC' ? 'desc' : 'asc',
                sortRefuseTimeActive : filters.sortRefuseTime === false ? false : true,
                sortRdn : filters.sortRdn === 'DESC' ? 'desc' : 'asc',
                sortRdnActive : filters.sortRdn  === false ? false : true,
                ms : filters.ms,
                fix : filters.fix,
            })
            snippetsLoaded([])
            snippetsLoading()
            getQuery( "/testSnippets/", toSnippetsRequestForm(filters,0,20)).then(  /// '<--- Snippets Init'
                (data)=> { if (data != 0) {snippetsLoaded(JSON.parse(data))}})
            setSnipSt('init')
        } else {
            updateTableFilters({
                sortClick : url.get('_sortClick') === 'DESC' ? 'desc' : 'asc',
                sortClickActive : url.get('_sortClick')  === 'false' ? false : true,
                sortClickI : url.get('_sortClickI')  === 'DESC' ? 'desc' : 'asc',
                sortClickIActive : url.get('_sortClickI') === 'false' ? false : true,
                sortRefuse : url.get('_sortRefuse') === 'DESC' ? 'desc' : 'asc',
                sortRefuseActive : url.get('_sortRefuse') === 'false' ? false : true,
                sortRefuseTime : url.get('_sortRefuseTime') === 'DESC' ? 'desc' : 'asc',
                sortRefuseTimeActive : url.get('_sortRefuseTime') === 'false' ? false : true,
                sortRdn : url.get('_sortRdn') === 'DESC' ? 'desc' : 'asc',
                sortRdnActive :  url.get('_sortRdn')  === 'false' ? false : true,
                ms : url.get('_ms') === 'false' ? false : true ,
                fix : url.get('_fix')  === 'false' ? false : true ,
            })
            snippetsLoaded([])
            snippetsLoading()
            getQuery( "/testSnippets/", toSnippetsRequestForm(filters,0,20)).then(  /// '<--- Snippets Init'
                (data)=> { if (data != 0) {snippetsLoaded(JSON.parse(data))}})
            setSnipSt('init')
        }
        setStatus('init')
        setSync('init')
    },[])

    
    useEffect( ()=>{
        if(status !== 'default' &&  status !== 'init'){
            let tmp = {
                sortClick: tableFilters.sortClickActive === false ? false : tableFilters.sortClick.toUpperCase(),
                sortClickI: tableFilters.sortClickIActive === false ? false : tableFilters.sortClickI.toUpperCase(),
                sortRefuse: tableFilters.sortRefuseActive === false ? false : tableFilters.sortRefuse.toUpperCase(),
                sortRefuseTime: tableFilters.sortRefuseTimeActive === false ? false : tableFilters.sortRefuseTime.toUpperCase(),
                sortRdn: tableFilters.sortRdnActive === false ? false : tableFilters.sortRdn.toUpperCase(),
                ms: tableFilters.ms,
                fix: tableFilters.fix,
                
            }
                if ( sync !== 'cancel'){
                    props.history.replace(toURL(toFilters(tmp)))
                } else { setSync('work')}
                filtersChangedTableHead(tmp)
        }      
        if (status === 'init') {setStatus('work')}  

    },[tableFilters])

    /** SNIPPETS BEGIN */

    /** 
     * !IMPORTANT Первичная зарузка снипетов происходит выше 
     * в useEffect(()=>{...},[]) 
     * я помечу места комментарием '<--- Snippets Init'
    */

    const [time , setTime ] = useState()
    const [offset , setOffset] = useState()

    useEffect( ()=>{
        if( snipSt !== 'init' && snipSt !== 'default'){
            snippetsLoaded([])
            snippetsLoading()
            clearTimeout(time)
            let id = setTimeout(()=>{
                getQuery( "/testSnippets/", toSnippetsRequestForm(filters,0,20)).then( 
                    (data)=> { if (data != 0) {snippetsLoaded(JSON.parse(data))}})
            },3000)
            setTime(id)
        } 
        if ( snipSt == 'init') {setSnipSt('work')}
    },[filters])

    const tableEnd = ()=>{
        if( snippets.length !== 0) {
            setOffset(offset + 20);
            snippetsLoading()
            getQuery( "/testSnippets/", toSnippetsRequestForm(filters,offset,20)).then( 
                (data)=> { if (data != 0) {newSnippetsLoaded(JSON.parse(data))}})
        }
    }
    
    /** SNIPPETS END   */

    return(
        <Box>
            <StyledTableContainer component={Paper}>
                <Table stickyHeader id={'MyTable'}  >
                    <TableHead>
                        <TableRow>
                            <StyledHeadTableCellMark key={'shtc1'} variant='head' align="left">
                                <Tooltip 
                                    placement='bottom-start'
                                    title="Фрагмент документа, возле которого прикреплено примечание"
                                >
                                    <TypographyMark 
                                        variant='h6' 
                                    >
                                        Метка
                                    </TypographyMark>
                                </Tooltip>
                            </StyledHeadTableCellMark>
                            <StyledHeadTableCellNote key={'shtc2'} variant='head' align="left">
                                <Tooltip 
                                    title="Формулировка примечания на Правой панели"
                                >
                                    <TypographyNote variant='h6'>
                                         Текст примечания 
                                    </TypographyNote>
                                </Tooltip>
                                </StyledHeadTableCellNote>
                            <StyledHeadTableCellSort key={'shtc3'} variant='head' align="left">
                                <Tooltip 
                                        title="Позиция отдельной нормы документа (для законов) или целого документа (для подзаконных актов) в «Рейтинге документов и норм»"
                                >
                                    <StyledTableSortLabel
                                            active = {tableFilters.sortRdnActive}
                                            direction={tableFilters.sortRdn}
                                            onClick={(e)=>{ 
                                                updateTableFilters({
                                                    sortRdn : tableFilters.sortRdn === 'asc' ? 'desc' : 'asc',
                                                    sortRdnActive : true,
                                                    ms : tableFilters.ms,
                                                    fix : tableFilters.fix
                                                })
                                            }}
                                    >   
                                        <TypographySort variant='h6'>
                                             Позиция в РДН 
                                        </TypographySort>
                                    </StyledTableSortLabel>     
                                </Tooltip>
                            </StyledHeadTableCellSort>
                            <StyledHeadTableCellSort key={'shtc4'} variant='head' align="left">
                                <Tooltip 
                                    title="Суммарное количество переходов в примечание за выбранный период"
                                >
                                        <StyledTableSortLabel
                                            active = {tableFilters.sortClickActive}
                                            direction={tableFilters.sortClick}
                                            onClick={(e)=>{ 
                                                updateTableFilters({
                                                    sortClick : tableFilters.sortClick === 'asc' ? 'desc' : 'asc',
                                                    sortClickActive : true,
                                                    ms : tableFilters.ms,
                                                    fix : tableFilters.fix
                                                })
                                            }}
                                        >   
                                            <TypographySort variant='h6'> Кол. кликов </TypographySort>
                                        </StyledTableSortLabel>
                                </Tooltip>
                            </StyledHeadTableCellSort>
                            <StyledHeadTableCellSort key={'shtc5'} variant='head' align="left">
                                <Tooltip 
                                    title="Количество переходов по кнопке I к фрагменту документа, к которому прикреплено примечание. Для закрепленных примечаний показатель не вычисляется"
                                >
                                    <StyledTableSortLabel
                                            active = {tableFilters.sortClickIActive}
                                            direction={tableFilters.sortClickI}
                                            onClick={(e)=>{ 
                                                updateTableFilters({
                                                    sortClickI : tableFilters.sortClickI === 'asc' ? 'desc' : 'asc',
                                                    sortClickIActive : true,
                                                    ms : tableFilters.ms,
                                                    fix : tableFilters.fix
                                                })
                                            }}
                                    >
                                        <TypographySort variant='h6'> Клики по I </TypographySort>
                                    </StyledTableSortLabel> 
                                </Tooltip>
                            </StyledHeadTableCellSort>
                            <StyledHeadTableCellSort key={'shtc6'} variant='head' align="left" >
                                <Tooltip 
                                    title="Доля переходов в примечание, которые завершились отказом. Отказ от примечания означает, что пользователь после перехода в примечание: -находился в открытой вкладке менее 15 секунд; -при этом он НЕ совершал никаких действий (т.е. только смотрел, НЕ копировал, НЕ сохранял и т.д.)"
                                >
                                    <StyledTableSortLabel
                                        active = {tableFilters.sortRefuseActive}
                                        direction={tableFilters.sortRefuse}
                                        onClick={(e)=>{ 
                                            updateTableFilters({
                                                sortRefuse : tableFilters.sortRefuse === 'asc' ? 'desc' : 'asc',
                                                sortRefuseActive : true,
                                                ms : tableFilters.ms,
                                                fix : tableFilters.fix
                                            })    
                                        }}
                                    >
                                        <TypographySort variant='h6'> Отказы %</TypographySort>
                                    </StyledTableSortLabel>        
                                </Tooltip>
                            </StyledHeadTableCellSort>
                            <StyledHeadTableCellSort  key={'shtc7'} variant='head' align="left">
                                <Tooltip 
                                    title="Среднее время, которое пользователь провел в документе при условии отказа"
                                >
                                    <StyledTableSortLabel
                                        active = {tableFilters.sortRefuseTimeActive}
                                        direction={tableFilters.sortRefuseTime}
                                        onClick={(e)=>{ 
                                            updateTableFilters({
                                                sortRefuseTime : tableFilters.sortRefuseTime === 'asc' ? 'desc' : 'asc',
                                                sortRefuseTimeActive : true,
                                                ms : tableFilters.ms,
                                                fix : tableFilters.fix
                                            })
                                        }}
                                    >
                                        <TypographySort variant='h6' > Время отказа </TypographySort>
                                    </StyledTableSortLabel>    
                                </Tooltip>
                            </StyledHeadTableCellSort>
                            <StyledHeadTableCellSort key={'shtc8'} variant='head' align="center">
                                <StyledToggleButton selected={tableFilters.ms} value='ms' onClick={()=>{ updateTableFilters({...tableFilters , ms : !tableFilters.ms})}} >
                                    <Tooltip 
                                        title="«М-ссылка» - примечание с мультиссылкой. «Закреп.» - закреплённое примечание. При клике на обозначение отображаются только соответствующие примечания. При повторном клике – фильтр снимается."
                                    >
                                        <TypographyToggle variant='h6' > М-сслыка  </TypographyToggle>
                                    </Tooltip>
                                </StyledToggleButton>
                                <StyledToggleButton selected={tableFilters.fix} value='fix' onClick={()=>{updateTableFilters({...tableFilters , fix : !tableFilters.fix})}}>
                                    <Tooltip 
                                        title="«М-ссылка» - примечание с мультиссылкой. «Закреп.» - закреплённое примечание. При клике на обозначение отображаются только соответствующие примечания. При повторном клике – фильтр снимается."
                                    >
                                        <TypographyToggle variant='h6' > Закреп.  </TypographyToggle>
                                    </Tooltip>
                                </StyledToggleButton>   
                            </StyledHeadTableCellSort>
                            <StyledHeadTableCellIcon  key={'shtc9'} variant='head' align="center">
                                <Tooltip 
                                    title=" Печать  (Сумма действий с документом при переходе в него из примечания)"
                                >
                                    <BoxIcon>
                                        <PrintIcon fontSize="inherit"/>
                                    </BoxIcon>    
                                </Tooltip>     
                            </StyledHeadTableCellIcon>
                            <StyledHeadTableCellIcon key={'shtc10'} variant='head' align="center">
                                <Tooltip 
                                    title=" Копирование  (Сумма действий с документом при переходе в него из примечания)"
                                >
                                    <BoxIcon>
                                        <FileCopyIcon fontSize='inherit' />
                                    </BoxIcon>    
                                </Tooltip>     
                            </StyledHeadTableCellIcon>
                            <StyledHeadTableCellIcon key={'shtc11'} variant='head' align="center" >
                                <Tooltip 
                                    title=" Экспорт  (Сумма действий с документом при переходе в него из примечания)"
                                >
                                    <BoxIcon>
                                        <ImportExportIcon fontSize="inherit" />
                                    </BoxIcon>       
                                </Tooltip>  
                            </StyledHeadTableCellIcon>
                            <StyledHeadTableCellIcon  key={'shtc12'} variant='head' align="center">
                                <Tooltip 
                                    title=" Сохранение  (Сумма действий с документом при переходе в него из примечания)"
                                >
                                    <BoxIcon>
                                        <SaveIcon fontSize='inherit' />
                                    </BoxIcon>      
                                </Tooltip>    
                            </StyledHeadTableCellIcon>
                            <StyledHeadTableCellIcon key={'shtc13'} variant='head' align="center">
                                <Tooltip 
                                    title=" Избранное  (Сумма действий с документом при переходе в него из примечания)"
                                >
                                    <BoxIcon>
                                        <FavoriteIcon fontSize='inherit' />
                                    </BoxIcon>
                                </Tooltip>     
                            </StyledHeadTableCellIcon>
                            <StyledHeadTableCellSUPR key={'shtc14'} variant='head' align="center">
                                <Tooltip 
                                    title="Данные по примечанию из СУПР"
                                >
                                    <TypographySUPR variant='h6'> СУПР </TypographySUPR>
                                </Tooltip>
                            </StyledHeadTableCellSUPR>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {snippets.map( (snippet,num)=><TableContent key={num} num={num} snippet={snippet} isComparison={isComparison}/>)}
                        <TableRow>
                            <NinjaTableCell colSpan={14}>               
                                <Waypoint
                                    onEnter={tableEnd}
                                />
                            </NinjaTableCell>    
                        </TableRow>
                        {
                            loadingSnippets 
                            ?
                            <TableRow>
                                <StTableCell colSpan={14}>
                                    <StCircularProgress/>
                                    <SnippetTP> Пожалуйста, подождите, <br/> данные загружаются </SnippetTP>
                                </StTableCell>
                            </TableRow>
                            :
                                snippets.length == 0 
                                ?   
                                <TableRow>
                                    <StTableCell colSpan={14}>
                                        <SnippetTP> Данные не найдены </SnippetTP>
                                    </StTableCell>
                                </TableRow>
                                :
                                null
                        }
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Box>
    )
}

export default connect( (store)=>({
    cancel : store.optional.cancel,
    isComparison : store.filters.isComparison,
    filters : store.filters,
    snippets : store.snippets.snippets,
    loadingSnippets : store.snippets.loadingSnippets,
}),{ 
    filtersChangedTableHead,
    snippetsLoaded,
    newSnippetsLoaded,
    snippetsLoading,
})(table)