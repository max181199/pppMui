import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { Typography , Hidden } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import PeriodicTmp from '../tmpDate/periodic';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { filtersChanged, filtersReset } from '../actions'

const SearchPaper = styled(Paper)`
    min-height : 80px;
    height     : 8vh;
    min-height : 3.5vw;
    border-radius : 0px;
    width : 44.4vw;
    min-width : 608px;
    border-bottom : 1px solid lightgrey;
`;

const MediumSearchPaper = styled(Paper)`
    min-height : 60px;
    height     : 6vh;
    border-radius : 0px;
    width : 44.4vw;
    min-width : 608px;
    border-bottom : 1px solid lightgrey;
`;

const Simplypaper = styled(Paper)`
    border : 1px solid lightgrey;
    border-radius : 0px;
    width : 44.6vw;
    min-width : 610px;
    min-height : 100%;
`;


const StyledTextField = styled(TextField)`
    margin-left : 0.5vw;
    margin-right : 0.5vw;
    min-width : 194.391px;
    width : 13.3vw;
    label {
        font-size : calc( 1px + 1vw )
    }
    input {
        font-size : calc( 1px + 1vw );
        padding-top : calc(  1vw - 10px );
        padding-bottom : calc(  0.4vw + 0px );
    }

`;

const StyledReportCountField = styled(TextField)`
    margin-left : 0.7vw;
    min-width : 194.391px;
    width : 20vw;
    label {
        font-size : calc( 1px + 1vw )
    }
    input {
        font-size : calc( 1px + 1vw );
        padding-top : calc(  1vw - 10px );
        padding-bottom : calc(  0.4vw + 0px );
    }

`;


const MediumStyledTextField = styled(TextField)`
    margin-left : 0.5vw;
    margin-right : 0.5vw;
    width : 13.3vw;
    min-width : 180px;
    label {
        font-size : 16px
    }
    input {
        font-size : 16px;
        padding-top : 5px;
        padding-bottom : 5px;
    }
`;


const LargePaperBlock = styled(Paper)`
    width : 44.4vw;
    min-width : 608px;
    padding-top : calc( 1.8vw - 2px ) ;
    border-radius : 0px;
`;

const StyledToggleButton = styled(ToggleButton)`
    margin-right : 3vw;
    font-size : 1vw;
    border-width : 2px;
    with : 10vw;
`;


const AnotherStyledToggleButton = styled(ToggleButton)`
    margin-right : 2vw;
    font-size : 1vw;
    border-width : 2px;
`;
 
const MediumStyledToggleButton = styled(ToggleButton)`
    margin-right : 3vw;
    margin-left : 3vw;
    font-size : 12px;
    border-width : 2px;
    width : 16vw;
    min-width : 200px;
`;

const AnotherMediumStyledToggleButton = styled(ToggleButton)`
    margin-right : 2vw;
    font-size : 13px;
    border-width : 2px;
    min-width : 100px;

`;

const MediumStyledReportCountField = styled(TextField)`
    margin-left : 0.7vw;
    width : 20vw;
    min-width  : 250px;
    label {
        font-size : 16px
    }
    input {
        font-size : 16px;
        padding-top : 5px;
        padding-bottom : 5px;
    }

`;

const StyledPercentField = styled(TextField)`
    margin-left : 0.7vw;
    margin-right : 0.7vw;
    min-width : 194.391px;
    width : 15vw;
    label {
        font-size : calc( 6px + 1vw )
    }
    input {
        font-size : calc( 1px + 1vw );
        padding-top : calc(  1vw - 10px );
        padding-bottom : calc(  0.4vw + 0px );
    }

`;

const MediumStyledPercentField = styled(TextField)`
    margin-left : 0.7vw;
    margin-right : 0.7vw;
    width : 15vw;
    min-width : 200px;
    label {
        font-size : 16px
    }
    input {
        font-size : 16px;
        padding-top : 5px;
        padding-bottom : 5px;
    }
`;

const StyledInputLabel = styled(InputLabel)`
    font-size : calc( 1px + 1vw );
`;


const StyledSelect = styled(Select)`
    font-size : calc( 1px + 1vw );
    padding-top : calc(  1vw - 10px );
    padding-bottom : calc(  0.4vw + 0px );
    width : 15vw;
`;

const StyledSortSelect = styled(Select)`
    font-size : calc( 1px + 1vw );
    padding-top : calc(  1vw - 10px );
    padding-bottom : calc(  0.4vw + 0px );
    width : 23vw;
`;


const StyledFormControl = styled(FormControl)`
    margin-left : 0.7vw;
    margin-right : 0.7vw;
`;

const MediumStyledSelect = styled(Select)`
    font-size : 16px;
    padding-top : 5px;
    padding-bottom : 5px;
    width : 15vw;
    min-width : 200px;
`;

const MediumSortStyledSelect = styled(Select)`
    font-size : 16px;
    padding-top : 5px;
    padding-bottom : 5px;
    width : 20vw;
    min-width : 300px;
`;

const MediumStyledInputLabel = styled(InputLabel)`
    font-size : 16px;
`;

const StyledMenuItem = styled(MenuItem)`
    font-size : max( 16px , calc( 1px + 1vw));
`;

const MediumStyledMenuItem = styled(MenuItem)`
    font-size : 16px;
`;

const StyledButton = styled(Button)`
    background-color : ${blue[800]};
    color : white;
    font-size : max( 16px , calc( 1px + 1vw));
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
    font-size : max( 16px , calc( 1px + 1vw));
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

    const { filters , filtersChanged , filtersReset } = props
    const [ semaphore, setSemaphore ] = React.useState(false)
    const [ reportFilters, setReportFilters ] = React.useState({})
    const updateReportFilters = (obj) =>{
        setReportFilters({...reportFilters , ...obj})
    }
    const [ block , setBlock ] = React.useState(false)
    useEffect( ()=> {
        if ( block ){
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
        }
        setSemaphore(true)
    },[reportFilters]);

    useEffect( ()=>{
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
        if(!semaphore){ 
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
        }
        setSemaphore(false)
        setBlock(true)
    },[filters])

    function buildReport() {
        return null;
    }
    function getSelectElement( el , num ) {
        return(
            <StyledMenuItem key={`${num}`} value={ `${el}` }>{el}</StyledMenuItem>
        )
    }
    function getMediumSelectElement( el , num ) {
        return(
            <MediumStyledMenuItem key={`${num}`} value={ `${el}` }>{el}</MediumStyledMenuItem>
        )
    }
    return(
        <Simplypaper>
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item>
                <Hidden only={['md','sm','xs']}>
                    <SearchPaper elevation = {0}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            spacing={0}
                            style={{ height : '8vh', minHeight : '80px'}}
                        >
                            <Grid item>
                                <StyledTextField 
                                    label="База_Номер_Метка"
                                    value={reportFilters.base}
                                    placeholder='Без фильтра'
                                    onChange={(e)=>{updateReportFilters({base : e.target.value})}}
                                />
                            </Grid>
                            <Grid item>
                                <StyledTextField 
                                    label="Название статьи"
                                    value={reportFilters.nameArt}
                                    placeholder='Без фильтра'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e)=>{updateReportFilters({nameArt : e.target.value})}}
                                />
                            </Grid>
                            <Grid item>
                                <StyledTextField 
                                    label="Текст примечания"
                                    value={reportFilters.note}
                                    placeholder='Без фильтра'
                                    onChange={(e)=>{updateReportFilters({ note : e.target.value})}}
                                />
                            </Grid>
                        </Grid>    
                    </SearchPaper>
                </Hidden>
                <Hidden only={['xl','lg']}>
                    <MediumSearchPaper elevation={0}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                            spacing={0}
                            style={{ height : '6vh', minHeight : '60px'}}
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
                </Hidden>
            </Grid>
            <Grid item>
                <Hidden only={['md','sm','xs']}>
                    <LargePaperBlock elevation={0}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <StyledReportCountField 
                                    label="Количество позиций"
                                    value={reportFilters.count}
                                    type='text'
                                    inputProps={{
                                        min : '0',
                                        max : '100',
                                        step : '1',
                                        type : 'text'
                                    }}
                                    onChange={(e)=>{updateReportFilters({ count : e.target.value.replace(/[^0-9]/g,'')})}}
                                    placeholder='Без ограничений'
                                />
                            </Grid>
                            <Grid item>
                                <StyledToggleButton
                                    value="detailing"
                                    selected={reportFilters.isDetail}
                                    onChange={() => {
                                        updateReportFilters( {isDetail : !reportFilters.isDetail});
                                    }}
                                >
                                    С детализацией по месяцам
                                </StyledToggleButton>
                            </Grid>
                        </Grid>    
                    </LargePaperBlock>
                </Hidden>
                <Hidden only={['xl','lg']}>
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
                </Hidden>
            </Grid>
            <Grid item>
                <Hidden only={['md','sm','xs']}>
                    <LargePaperBlock elevation={0}>
                        <Grid   
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <StyledPercentField
                                    label="Отказ от"
                                    value={reportFilters.from}
                                    type='number'
                                    inputProps={{
                                        min : '0',
                                        max : '100',
                                        step : '1',
                                    }}
                                    onChange={(e)=>{updateReportFilters({from : e.target.value})}}
                                    placeholder='0'
                                    InputProps={{
                                        endAdornment: 
                                            <InputAdornment position="end" fontSize='inherit'>
                                                <Typography style={{fontSize : 'calc( 6px + 1vw )', color : grey[500]}}>%</Typography>
                                            </InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <StyledPercentField
                                    label="Отказ до"
                                    value={reportFilters.to}
                                    type='number'
                                    inputProps={{
                                        min : '0',
                                        max : '100',
                                        step : '1',
                                    }}
                                    onChange={(e)=>{updateReportFilters({to : e.target.value})}}
                                    placeholder='100'
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Typography style={{fontSize : 'calc( 6px + 1vw )', color : grey[500]}}>%</Typography>
                                        </InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>                
                    </LargePaperBlock>
                </Hidden>
                <Hidden only={['xl','lg']}>
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
                                    placeholder='0'
                                    InputProps={{
                                        endAdornment: 
                                            <InputAdornment position="end" fontSize='inherit'>
                                                <Typography style={{fontSize : 'calc( 6px + 1vw )', color : grey[500]}}>%</Typography>
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
                                    placeholder='0'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <Typography style={{fontSize : 'calc( 6px + 1vw )', color : grey[500]}}>%</Typography>
                                        </InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>                
                    </LargePaperBlock>
                </Hidden>
            </Grid>
            <Grid item>
                <Hidden only={['md','sm','xs']} >
                    <LargePaperBlock elevation={0}>
                        <Grid   
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <StyledFormControl>
                                    <StyledInputLabel>Период</StyledInputLabel>
                                    <StyledSelect
                                        value={reportFilters.period}
                                        onChange={(e)=>{updateReportFilters( {period : e.target.value})}}
                                        style={{ width : '15vw'}}
                                    >
                                        {PeriodicTmp.map( (item,num) => getSelectElement(item,num))}
                                    </StyledSelect>
                                </StyledFormControl>
                            </Grid>
                            <Grid item>
                                <StyledFormControl>
                                    <StyledInputLabel> Сравн. Период</StyledInputLabel>
                                    <StyledSelect
                                        value={reportFilters.compPeriod}
                                        onChange={(e)=>{
                                            if ( reportFilters.compProfile === 'Не выбрано') { updateReportFilters({compProfile : reportFilters.profile, compPeriod : e.target.value}) }
                                            else { updateReportFilters( {compPeriod : e.target.value}) }
                                        }}
                                        style={{ width : '15vw'}}
                                    >
                                        <StyledMenuItem key={'${num}?m123'} value={ `Не выбрано` }>{`Не выбрано`}</StyledMenuItem>
                                        {PeriodicTmp.map( (item,num) => getSelectElement(item,num))}
                                    </StyledSelect>
                                </StyledFormControl>
                            </Grid>
                        </Grid>    
                    </LargePaperBlock>
                </Hidden>
                <Hidden only={['xl','lg']} >
                    <LargePaperBlock elevation={0}>
                        <Grid   
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <StyledFormControl>
                                    <MediumStyledInputLabel>Период</MediumStyledInputLabel>
                                    <MediumStyledSelect
                                        value={reportFilters.period}
                                        onChange={(e)=>{updateReportFilters({period : e.target.value})}}
                                        style={{ width : '15vw'}}
                                    >
                                        {PeriodicTmp.map( (item,num) => getSelectElement(item,num))}
                                    </MediumStyledSelect>
                                </StyledFormControl>
                            </Grid>
                            <Grid item>
                                <StyledFormControl>
                                    <MediumStyledInputLabel> Сравн. Период</MediumStyledInputLabel>
                                    <MediumStyledSelect
                                        value={reportFilters.compPeriod}
                                        onChange={(e)=>{
                                            if( reportFilters.compProfile === 'Не выбрано' ){ updateReportFilters({compProfile : reportFilters.profile, compPeriod : e.target.value})}
                                            else ( updateReportFilters({compPeriod : e.target.value}) )
                                        }}
                                        style={{ width : '15vw'}}
                                    >
                                        <MediumStyledMenuItem key={'${num}?m123'} value={ `Не выбрано` }>{`Не выбрано`}</MediumStyledMenuItem>
                                        {PeriodicTmp.map( (item,num) => getMediumSelectElement(item,num))}
                                    </MediumStyledSelect>
                                </StyledFormControl>
                            </Grid>
                        </Grid>    
                    </LargePaperBlock>
                </Hidden>
            </Grid>
            <Grid item>
                <Hidden only={['md','sm','xs']} >
                    <LargePaperBlock elevation={0}>
                        <Grid   
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <StyledFormControl>
                                    <StyledInputLabel>Профили</StyledInputLabel>
                                    <StyledSelect
                                        value={reportFilters.profile}
                                        onChange={(e)=>{updateReportFilters( {profile : e.target.value})}}
                                        style={{ width : '15vw'}}
                                    >
                                        <StyledMenuItem value={'Все профили'}>Все профили</StyledMenuItem>
                                        <StyledMenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</StyledMenuItem>
                                        <StyledMenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</StyledMenuItem>
                                        <StyledMenuItem value={'Кадры'}>Кадры</StyledMenuItem>
                                        <StyledMenuItem value={'Юристы'}>Юристы</StyledMenuItem>
                                        <StyledMenuItem value={'Универсальный'}>Универсальный</StyledMenuItem>
                                        <StyledMenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</StyledMenuItem>
                                        <StyledMenuItem value={'Специалист по закупкам'}>Специалист по закупкам</StyledMenuItem>
                                    </StyledSelect>
                                </StyledFormControl>
                            </Grid>
                            <Grid item>
                                <StyledFormControl>
                                    <StyledInputLabel> Сравн. Профили</StyledInputLabel>
                                    <StyledSelect
                                        value={reportFilters.compProfile}
                                        onChange={(e)=>{
                                            if( reportFilters.compPeriod === 'Не выбрано' ) { updateReportFilters( {compPeriod : reportFilters.period,compProfile : e.target.value})}
                                            else { updateReportFilters({ compProfile : e.target.value}) }
                                        }}
                                        style={{ width : '15vw'}}
                                    >
                                        <StyledMenuItem value={ `Не выбрано` }>{`Не выбрано`}</StyledMenuItem>
                                        <StyledMenuItem value={'Все профили'}>Все профили</StyledMenuItem>
                                        <StyledMenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</StyledMenuItem>
                                        <StyledMenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</StyledMenuItem>
                                        <StyledMenuItem value={'Кадры'}>Кадры</StyledMenuItem>
                                        <StyledMenuItem value={'Юристы'}>Юристы</StyledMenuItem>
                                        <StyledMenuItem value={'Универсальный'}>Универсальный</StyledMenuItem>
                                        <StyledMenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</StyledMenuItem>
                                        <StyledMenuItem value={'Специалист по закупкам'}>Специалист по закупкам</StyledMenuItem>
                                    </StyledSelect>
                                </StyledFormControl>
                            </Grid>
                        </Grid>    
                    </LargePaperBlock>
                </Hidden>
                <Hidden only={['xl','lg']} >
                    <LargePaperBlock elevation={0}>
                        <Grid   
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <StyledFormControl>
                                    <MediumStyledInputLabel>Профили</MediumStyledInputLabel>
                                    <MediumStyledSelect
                                        value={reportFilters.profile}
                                        onChange={(e)=>{
                                            updateReportFilters( {profile : e.target.value})
                                        }}
                                        style={{ width : '15vw'}}
                                    >
                                        <MediumStyledMenuItem value={'Все профили'}>Все профили</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Кадры'}>Кадры</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Юристы'}>Юристы</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Универсальный'}>Универсальный</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Специалист по закупкам'}>Специалист по закупкам</MediumStyledMenuItem>
                                    </MediumStyledSelect>
                                </StyledFormControl>
                            </Grid>
                            <Grid item>
                                <StyledFormControl>
                                    <MediumStyledInputLabel> Сравн. Профили</MediumStyledInputLabel>
                                    <MediumStyledSelect
                                        value={reportFilters.compProfile}
                                        onChange={(e)=>{
                                            if( reportFilters.compPeriod === 'Не выбрано' ) { updateReportFilters({compPeriod : reportFilters.period,compProfile : e.target.value})}
                                            else { updateReportFilters( {compProfile : e.target.value}) }
                                        }}
                                        style={{ width : '15vw'}}
                                    >
                                        <MediumStyledMenuItem value={ `Не выбрано` }>{`Не выбрано`}</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Все профили'}>Все профили</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Бухгалтерия и кадры бюджетной организации'}>Бухгалтерия и кадры бюджетной организации</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Бухгалтерия и кадры'}>Бухгалтерия и кадры</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Кадры'}>Кадры</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Юристы'}>Юристы</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Универсальный'}>Универсальный</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Универсальный для бюджетной организации'}>Универсальный для бюджетной организации</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'Специалист по закупкам'}>Специалист по закупкам</MediumStyledMenuItem>
                                    </MediumStyledSelect>
                                </StyledFormControl>
                            </Grid>
                        </Grid>    
                    </LargePaperBlock>
                </Hidden>
            </Grid>
            <Grid item>
                <Hidden only={['md','sm','xs']}>
                    <LargePaperBlock elevation={0}>
                        <Grid   
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                        >
                            <Grid item >
                                <StyledFormControl>
                                    <StyledInputLabel> Сортировка </StyledInputLabel>
                                    <StyledSortSelect
                                        value={reportFilters.sort}
                                        onChange={(e)=>{
                                            updateReportFilters( {sort : e.target.value})
                                        }}
                                    >
                                        <StyledMenuItem value={ `По убыванию кликов` }>{`По убыванию кликов`}</StyledMenuItem>
                                        <StyledMenuItem value={'По возрастанию кликов'}>По возрастанию кликов</StyledMenuItem>
                                        <StyledMenuItem value={'По убыванию кликов по I'}>По убыванию кликов по I</StyledMenuItem>
                                        <StyledMenuItem value={'По возрастанию кликов по I'}>По возрастанию кликов по I</StyledMenuItem>
                                        <StyledMenuItem value={'По убыванию отказов'}>По убыванию отказов</StyledMenuItem>
                                        <StyledMenuItem value={'По возрастанию отказов'}>По возрастанию отказов</StyledMenuItem>
                                        <StyledMenuItem value={'По убыванию времени отказа'}>По убыванию времени отказа</StyledMenuItem>
                                        <StyledMenuItem value={'По возрастанию времени отказа'}>По возрастанию времени отказа</StyledMenuItem>
                                        <StyledMenuItem value={'По убыванию позиции в РДН'}>По убыванию позиции в РДН</StyledMenuItem>
                                        <StyledMenuItem value={'По возрастанию позиции в РДН'}>По возрастанию позиции в РДН</StyledMenuItem>
                                    </StyledSortSelect>
                                </StyledFormControl>
                            </Grid>
                            <Grid item>
                                <AnotherStyledToggleButton
                                    value="ms"
                                    selected={reportFilters.ms}
                                    onChange={() => {
                                        updateReportFilters({ms : !reportFilters.ms});
                                    }}
                                    style={{width : '8vw'}}
                                >
                                    М-ссылка
                                </AnotherStyledToggleButton>
                            </Grid>
                            <Grid item>
                                <AnotherStyledToggleButton
                                    value="fix"
                                    selected={reportFilters.fix}
                                    onChange={() => {
                                        updateReportFilters({fix : !reportFilters.fix});
                                    }}
                                    style={{width : '8vw'}}
                                >
                                    Закреп.
                                </AnotherStyledToggleButton>
                            </Grid>
                        </Grid>    
                    </LargePaperBlock>
                </Hidden>
                <Hidden only={['xl','lg']}>
                    <LargePaperBlock elevation={0}>
                        <Grid   
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"

                        >
                            <Grid item>
                                <StyledFormControl>
                                    <MediumStyledInputLabel> Сортировка </MediumStyledInputLabel>
                                    <MediumSortStyledSelect
                                        value={reportFilters.sort}
                                        onChange={(e)=>{updateReportFilters({sort : e.target.value})}}
                                        style={{ width : '15vw'}}
                                    >
                                        <MediumStyledMenuItem value={ `По убыванию кликов` }>{`По убыванию кликов`}</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По возрастанию кликов'}>По возрастанию кликов</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По убыванию кликов по I'}>По убыванию кликов по I</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По возрастанию кликов по I'}>По возрастанию кликов по I</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По убыванию отказов'}>По убыванию отказов</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По возрастанию отказов'}>По возрастанию отказов</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По убыванию времени отказа'}>По убыванию времени отказа</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По возрастанию времени отказа'}>По возрастанию времени отказа</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По убыванию позиции в РДН'}>По убыванию позиции в РДН</MediumStyledMenuItem>
                                        <MediumStyledMenuItem value={'По возрастанию позиции в РДН'}>По возрастанию позиции в РДН</MediumStyledMenuItem>
                                    </MediumSortStyledSelect>
                                </StyledFormControl>
                            </Grid>
                            <Grid item>
                                <AnotherMediumStyledToggleButton
                                    value="ms"
                                    selected={reportFilters.ms}
                                    onChange={() => {
                                        updateReportFilters( {ms :  !reportFilters.ms});
                                    }}
                                    style={{width : '8.8vw', marginRight : 0}}
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
                                    style={{width : '8.8vw', marginLeft : 0}}
                                >
                                    Закреп.
                                </AnotherMediumStyledToggleButton>
                            </Grid>
                        </Grid>    
                    </LargePaperBlock>
                </Hidden>                        
            </Grid>
            <Grid item>
                <LargePaperBlock elevation={0}>
                    <StyledButton
                        onClick={()=>{buildReport()}}
                    >
                        Построить отчет
                    </StyledButton>
                    <StyledCancelButton
                        onClick={()=>{filtersReset()}}
                    >
                        Отменить
                    </StyledCancelButton>
                </LargePaperBlock>              
            </Grid>
        </Grid>
        </Simplypaper>
    )
}

export default connect( (store)=>({ 
    filters : store.filters 
}),{
    filtersChanged,filtersReset
})(Main)