import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Typography  } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { filtersChanged, filtersReset, reportsLoaded , reportsLoading } from '../../actions'
import { getQuery } from '../../services/query-service'
import { toReportsRequestForm } from '../../services/transform'

const MediumSearchPaper = styled(Paper)`
    min-height : 60px;
    height     : 6vh;
    border-radius : 0px;
    width : 44.5vw;
    min-width : 608px;
    border-bottom : 2px solid lightgrey;
    display: flex;
`;

const StMenuItem = styled(MenuItem)`
    font-size : 16px;
`;


const MediumStyledTextField = styled(TextField)`
    width : 13vw;
    min-width : 180px;
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
    }
`;


const LargePaperBlock = styled(Paper)`
    width : 44.6vw;
    min-width : 608px;
    padding-top : calc( 1.8vw - 2px ) ;
    border-radius : 0px;
    display : flex;
`;



 
const MediumStyledToggleButton = styled(ToggleButton)`
    margin-right : 3vw;
    margin-left : 3vw;
    font-size : 10px;
    border-width : 2px;
    width : 16vw;
    min-width : 200px;
`;

const AnotherMediumStyledToggleButton = styled(ToggleButton)`
    margin-right : 2vw;
    font-size : 10px;
    border-width : 2px;
    min-width : 100px;

`;

const MediumStyledReportCountField = styled(TextField)`
    width : 20vw;
    min-width : 200px;
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
    }
    margin-left : 0.7vw;
`;


const MediumStyledPercentField = styled(TextField)`
    width : 10vw;
    min-width : 150px;
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
        &  .MuiInputAdornment-root{
            & > p{
                font-size : 16px;
                color : grey;
            }
        }
    }
    margin-right : 0.7vw;
    margin-left : 0.7vw;
`;

const StyledFormControl = styled(FormControl)`
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
    }
    width : 15vw;
    min-width : 200px;
    margin-right : 0.7vw;
    margin-left : 0.7vw;
`;

const SortStyledFormControl = styled(FormControl)`
    & .MuiInputLabel-root{
        font-size : 16px;
    }
    & .MuiInputBase-root{
        margin-top : 14px;
        font-size : 16px;
    }
    width : 20vw;
    min-width : 280px;
    margin-left : 0.7vw;
`;

const StyledButton = styled(Button)`
    background-color : ${blue[800]};
    color : white;
    font-size : calc( 6px + 0.7vw);
    margin-left : 0.7vw;
    margin-bottom : 2vh;
    padding : 0;
    width : 18vw;
    min-width : 200px;
    min-height : 40px;
    height : 2.8vw;
    &:hover {
        background-color: ${green[600]};
    };
`;

const StyledCancelButton = styled(Button)`
    background-color : ${blue[800]};
    color : white;
    font-size : calc( 6px + 0.7vw);
    margin-left : 2vw;
    margin-bottom : 2vh;
    padding : 0;
    width : 14vw;
    min-width : 150px;
    min-height : 40px;
    height : 2.8vw;
    &:hover {
        background-color: ${red[600]};
    };
`;

function Main( props ) {

    const { filters , reportsLoaded , reportsLoading , periods, filtersChanged , filtersReset } = props
    const [ status , setStatus ] = React.useState('default')
    const [ reportFilters, setReportFilters ] = React.useState({
        period: 'Текущий',
        profile: 'Все профили',
        compPeriod: 'Не выбрано',
        compProfile: 'Не выбрано',
        sort:'По убыванию кликов',
        base: '',
        nameArt: '',
        note: '',
        from: '',
        to: '' ,
        isComparison: false,
        ms: false,
        fix: false,
        isDetail: false,
        count: ''
    })
    const updateReportFilters = (obj) =>{
        setReportFilters({...reportFilters , ...obj})
    }


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

    useEffect( ()=> {
        if ( status !== 'default' ){
            setStatus('work')
            filtersChanged({
                base:  reportFilters.base ,
                nameArt: reportFilters.nameArt ,
                note: reportFilters.note ,
                from: reportFilters.from,
                to: reportFilters.to,
                period: reportFilters.period,
                profile: reportFilters.profile,
                compPeriod: reportFilters.compPeriod ,
                compProfile: reportFilters.compProfile,
                sortClick: reportFilters.sort === 'По возрастанию кликов' ? 'ASC' : reportFilters.sort === 'По убыванию кликов' ? 'DESC' : false ,
                sortClickI: reportFilters.sort=== 'По возрастанию кликов по I' ? 'ASC' : reportFilters.sort === 'По убыванию кликов по I' ? 'DESC' : false ,
                sortRefuse: reportFilters.sort === 'По возрастанию отказов' ? 'ASC' : reportFilters.sort === 'По убыванию отказов' ? 'DESC' : false ,
                sortRefuseTime: reportFilters.sort === 'По возрастанию времени отказа' ? 'ASC' : reportFilters.sort === 'По убыванию времени отказа' ? 'DESC' : false ,
                sortRdn: reportFilters.sort === 'По возрастанию позиции в РДН' ? 'ASC' : reportFilters.sort === 'По убыванию позиции в РДН' ? 'DESC' : false ,
                ms: reportFilters.ms,
                fix: reportFilters.fix,
                isDetail: reportFilters.isDetail,
                count: reportFilters.count,
            })
            props.history.replace(toURL(toFilters(reportFilters)))
        }
    },[reportFilters]);

    useEffect( ()=>{
        if ( status !== 'work') {
            if ( props.history.location.search === '' ){
                let newSort ;
                if (filters.sortClick === 'ASC')  {newSort='По возрастанию кликов'}
                if (filters.sortClick === 'DESC')  {newSort='По убыванию кликов'}
                if (filters.sortClickI === 'ASC')  {newSort='По возрастанию кликов по I'}
                if (filters.sortClickI === 'DESC')  {newSort='По убыванию кликов по I'} 
                if (filters.sortRefuse=== 'ASC')  {newSort='По возрастанию отказов'}
                if (filters.sortRefuse === 'DESC')  {newSort='По убыванию отказов'}  
                if (filters.sortRefuseTime=== 'ASC')  {newSort='По возрастанию времени отказа'}
                if (filters.sortRefuseTime=== 'DESC')  {newSort='По убыванию времени отказа'}
                if (filters.sortRdn=== 'ASC')  {newSort='По возрастанию позиции в РДН'}
                if (filters.sortRdn=== 'DESC')  {newSort='По убыванию позиции в РДН'}
                setReportFilters({
                    base: filters.base,
                    nameArt: filters.nameArt,
                    note: filters.note,
                    from: filters.from === '0' ? '' : filters.from,
                    to: filters.to === '100' ? '' : filters.to ,
                    period: filters.period,
                    profile: filters.profile,
                    isComparison: filters.isComparison,
                    compPeriod: filters.compPeriod,
                    compProfile: filters.compProfile,
                    sort : newSort,
                    ms: filters.ms,
                    fix: filters.fix,
                    isDetail: filters.isDetail,
                    count: filters.count
                })
            } else {
                let newSort ;
                if (url.get('_sortClick') === 'ASC')  {newSort='По возрастанию кликов'}
                if (url.get('_sortClick') === 'DESC')  {newSort='По убыванию кликов'}
                if (url.get('_sortClickI') === 'ASC')  {newSort='По возрастанию кликов по I'}
                if (url.get('_sortClickI') === 'DESC')  {newSort='По убыванию кликов по I'} 
                if (url.get('_sortRefuse')=== 'ASC')  {newSort='По возрастанию отказов'}
                if (url.get('_sortRefuse')=== 'DESC')  {newSort='По убыванию отказов'}  
                if (url.get('_sortRefuseTime') === 'ASC')  {newSort='По возрастанию времени отказа'}
                if (url.get('_sortRefuseTime') === 'DESC')  {newSort='По убыванию времени отказа'}
                if (url.get('_sortRdn') === 'ASC')  {newSort='По возрастанию позиции в РДН'}
                if (url.get('_sortRdn') === 'DESC')  {newSort='По убыванию позиции в РДН'}
                setReportFilters({
                    base: url.get('_base'),
                    nameArt: url.get('_nameArt'),
                    note: url.get('_note'),
                    from: url.get('_from') === '0' ? '' : url.get('_from'),
                    to: url.get('_to') === '100' ? '' : url.get('_to'),
                    period: url.get('_period'),
                    profile: url.get('_profile'),
                    isComparison: url.get('_isComparison') === 'false' ? false : true,
                    compPeriod: url.get('_compPeriod'),
                    compProfile: url.get('_compProfile'),
                    sort : newSort,
                    ms: url.get('_ms') === 'false' ? false : true,
                    fix: url.get('_fix') === 'false' ? false : true,
                    isDetail: url.get('_isDetail') === 'false' ? false : true,
                    count: url.get('_count')
                })
            }    

            setStatus('init')
        }
        if ( status === 'work') { setStatus('init')}
    },[filters])

    function ResetFilters(){
        props.history.replace('/excel')
        filtersReset()
    }


    function buildReport() {
        reportsLoaded([])
        reportsLoading()
        getQuery('/excel/' , toReportsRequestForm(filters))
        .then( () =>{
            getQuery('/testReports') /// '/reportsInfo'
            .then((data) => {
                reportsLoaded(data); /// Возможно стоит убрать JSON.parse 
            });
        })
    }


    function getSelectElement( el , num ) {
        return(
            <StMenuItem key={`${num}`} value={ `${el}` }>{el}</StMenuItem>
        )
    }
    function getMediumSelectElement( el , num ) {
        return(
            <StMenuItem key={`${num}`} value={ `${el}` }>{el}</StMenuItem>
        )
    }
    return(
            <div>
                <MediumSearchPaper elevation={0}>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        spacing={0}
                    >
                        <Grid item>
                            <MediumStyledTextField 
                                label="База_Номер_Метка"
                                value={reportFilters.base}
                                placeholder='Без фильтра'
                                onChange={(e)=>{updateReportFilters({base : e.target.value})}}
                            />
                        </Grid>
                        <Grid item>
                            <MediumStyledTextField 
                                label="Название статьи"
                                value={reportFilters.nameArt}
                                placeholder='Без фильтра'
                                onChange={(e)=>{updateReportFilters({ nameArt : e.target.value})}}
                            />
                        </Grid>
                        <Grid item>
                            <MediumStyledTextField 
                                label="Текст примечания"
                                value={reportFilters.note}
                                placeholder='Без фильтра'
                                onChange={(e)=>{updateReportFilters({ note : e.target.value})}}
                            />
                        </Grid>
                    </Grid>    
                </MediumSearchPaper>
                <LargePaperBlock elevation={0}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <MediumStyledReportCountField 
                                label="Количество позиций"
                                value={reportFilters.count}
                                type='text'
                                inputProps={{
                                    min : '0',
                                    max : '100',
                                    step : '1',
                                    type : 'text'
                                }}
                                onChange={(e)=>{updateReportFilters({count : e.target.value.replace(/[^0-9]/g,'')})}}
                                placeholder='Без ограничений'
                            />
                        </Grid>
                        <Grid item>
                            <MediumStyledToggleButton
                                value="detailing"
                                selected={reportFilters.isDetail}
                                onChange={() => {
                                updateReportFilters( {isDetail :  !reportFilters.isDetail});
                                }}
                            >
                                С детализацией по месяцам
                            </MediumStyledToggleButton>
                        </Grid>
                    </Grid>    
                </LargePaperBlock>
                <LargePaperBlock elevation={0}>
                    <Grid   
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <MediumStyledPercentField
                                label="Отказ от"
                                value={reportFilters.from}
                                type='number'
                                inputProps={{
                                    min : '0',
                                    max : '100',
                                    step : '1',
                                }}
                                onChange={(e)=>{updateReportFilters({from : e.target.value})}}
                                placeholder='0,00'
                                InputProps={{
                                    endAdornment: 
                                        <InputAdornment position="end" fontSize='inherit'>
                                            <Typography>%</Typography>
                                        </InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <MediumStyledPercentField
                                label="Отказ до"
                                value={reportFilters.to}
                                type='number'
                                inputProps={{
                                    min : '0',
                                    max : '100',
                                    step : '1',
                                }}
                                onChange={(e)=>{updateReportFilters({to : e.target.value})}}
                                placeholder='100,00'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <Typography>%</Typography>
                                    </InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>                
                </LargePaperBlock>
                <LargePaperBlock elevation={0}>
                    <Grid   
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <StyledFormControl>
                                <InputLabel>Период</InputLabel>
                                <Select
                                    value={reportFilters.period}
                                    onChange={(e)=>{updateReportFilters({period : e.target.value})}}
                                >
                                    {periods.map( (item,num) => getSelectElement(item,num))}
                                </Select>
                            </StyledFormControl>
                        </Grid>
                        <Grid item>
                            <StyledFormControl>
                                <InputLabel> Сравн. Период</InputLabel>
                                <Select
                                    value={reportFilters.compPeriod}
                                    onChange={(e)=>{
                                        if( reportFilters.compProfile === 'Не выбрано' ){ updateReportFilters({compProfile : reportFilters.profile, compPeriod : e.target.value})}
                                        else ( updateReportFilters({compPeriod : e.target.value}) )
                                    }}
                                >
                                    <StMenuItem key={'${num}?m123'} value={ `Не выбрано` }>{`Не выбрано`}</StMenuItem>
                                    {periods.map( (item,num) => getMediumSelectElement(item,num))}
                                </Select>
                            </StyledFormControl>
                        </Grid>
                    </Grid>    
                </LargePaperBlock>
                <LargePaperBlock elevation={0}>
                    <Grid   
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <StyledFormControl>
                                <InputLabel>Профили</InputLabel>
                                <Select
                                    value={reportFilters.profile}
                                    onChange={(e)=>{
                                        updateReportFilters( {profile : e.target.value})
                                    }}
                                >
                                    <StMenuItem value={'Все профили'}>Все профили</StMenuItem>
                                    <StMenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</StMenuItem>
                                    <StMenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</StMenuItem>
                                    <StMenuItem value={'Кадры'}>Кадры</StMenuItem>
                                    <StMenuItem value={'Юристы'}>Юристы</StMenuItem>
                                    <StMenuItem value={'Универсальный'}>Универсальный</StMenuItem>
                                    <StMenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</StMenuItem>
                                    <StMenuItem value={'Специалист по закупкам'}>Специалист по закупкам</StMenuItem>
                                </Select>
                            </StyledFormControl>
                        </Grid>
                        <Grid item>
                            <StyledFormControl>
                                <InputLabel> Сравн. Профили</InputLabel>
                                <Select
                                    value={reportFilters.compProfile}
                                    onChange={(e)=>{
                                        if( reportFilters.compPeriod === 'Не выбрано' ) { updateReportFilters({compPeriod : reportFilters.period,compProfile : e.target.value})}
                                        else { updateReportFilters( {compProfile : e.target.value}) }
                                    }}
                                >
                                    <StMenuItem value={ `Не выбрано` }>{`Не выбрано`}</StMenuItem>
                                    <StMenuItem value={'Все профили'}>Все профили</StMenuItem>
                                    <StMenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</StMenuItem>
                                    <StMenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</StMenuItem>
                                    <StMenuItem value={'Кадры'}>Кадры</StMenuItem>
                                    <StMenuItem value={'Юристы'}>Юристы</StMenuItem>
                                    <StMenuItem value={'Универсальный'}>Универсальный</StMenuItem>
                                    <StMenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</StMenuItem>
                                    <StMenuItem value={'Специалист по закупкам'}>Специалист по закупкам</StMenuItem>
                                </Select>
                            </StyledFormControl>
                        </Grid>
                    </Grid>    
                </LargePaperBlock>
                <LargePaperBlock elevation={0}>
                    <Grid   
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"

                    >
                        <Grid item>
                            <SortStyledFormControl>
                                <InputLabel> Сортировка </InputLabel>
                                <Select
                                    value={reportFilters.sort}
                                    onChange={(e)=>{updateReportFilters({sort : e.target.value})}}
                                >
                                    <StMenuItem value={ `По убыванию кликов` }>{`По убыванию кликов`}</StMenuItem>
                                    <StMenuItem value={'По возрастанию кликов'}>По возрастанию кликов</StMenuItem>
                                    <StMenuItem value={'По убыванию кликов по I'}>По убыванию кликов по I</StMenuItem>
                                    <StMenuItem value={'По возрастанию кликов по I'}>По возрастанию кликов по I</StMenuItem>
                                    <StMenuItem value={'По убыванию отказов'}>По убыванию отказов</StMenuItem>
                                    <StMenuItem value={'По возрастанию отказов'}>По возрастанию отказов</StMenuItem>
                                    <StMenuItem value={'По убыванию времени отказа'}>По убыванию времени отказа</StMenuItem>
                                    <StMenuItem value={'По возрастанию времени отказа'}>По возрастанию времени отказа</StMenuItem>
                                    <StMenuItem value={'По убыванию позиции в РДН'}>По убыванию позиции в РДН</StMenuItem>
                                    <StMenuItem value={'По возрастанию позиции в РДН'}>По возрастанию позиции в РДН</StMenuItem>
                                </Select>
                            </SortStyledFormControl>
                        </Grid>
                        <Grid item>
                            <AnotherMediumStyledToggleButton
                                value="ms"
                                selected={reportFilters.ms}
                                onChange={() => {
                                    updateReportFilters( {ms :  !reportFilters.ms});
                                }}
                            >
                                М-ссылка
                            </AnotherMediumStyledToggleButton>
                        </Grid>
                        <Grid item>
                            <AnotherMediumStyledToggleButton
                                value="fix"
                                selected={reportFilters.fix}
                                onChange={() => {
                                    updateReportFilters( {fix : !reportFilters.fix});
                                }}
                            >
                                Закреп.
                            </AnotherMediumStyledToggleButton>
                        </Grid>
                    </Grid>    
                </LargePaperBlock>                   
                <LargePaperBlock elevation={0}>
                    <StyledButton
                        onClick={()=>{buildReport()}}
                    >
                        Построить отчет
                    </StyledButton>
                    <StyledCancelButton
                        onClick={()=>{ResetFilters()}}
                    >
                        Отменить
                    </StyledCancelButton>
                </LargePaperBlock>  
            </div>                
    )
}

export default connect( (store)=>({ 
    filters : store.filters ,
    periods : store.periods.periods
}),{
    filtersChanged,filtersReset,reportsLoaded,reportsLoading
})(Main)