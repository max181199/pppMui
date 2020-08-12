import React, { useEffect, useState} from 'react';
import ReportElement from './reportsElement';
import { connect } from 'react-redux';
import { reportsLoaded,reportsLoading } from '../actions';
import { Typography, Box  } from '@material-ui/core';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getQuery } from '../services/query-service'

const StyledTypografy = styled(Typography)`
    font-size : max( 24px , calc( 12px + 1vw ));
    color : ${grey[500]};
    margin-top : max( 25px , 5vh );
    text-align : center;
`;
const StCircularProgress = styled(CircularProgress)`
    margin-top : calc( 15px + 5vh);
    height : calc( 50px + 1vw) !important;
    width : calc( 50px + 1vw) !important;
  `;

const StDiv = styled.div`
    text-align : center;
`;

const Reports = (props) => {

   const { reports, loadingReports, reportsLoaded, reportsLoading } = props
   const [ timer , setTimer ] = useState()

    useEffect(() => {
        reportsLoaded([])
        reportsLoading()
        getQuery( "/testReports" ).then( 
                (data)=> { if (data != 0) {reportsLoaded(JSON.parse(data))}})
    },[])

    useEffect(()=>{
        if ( loadingReports){
            clearTimeout(timer)
        } else {
            let id = setTimeout(updateReports,10000)
            setTimer(id)
        }
    },[loadingReports])

    const updateReports = ()=>{
        reportsLoading()
        getQuery( "/testReports" ).then( 
                (data)=> { if (data != 0) {reportsLoaded(JSON.parse(data))}})
    }

  return (
    <div>
        {
            reports.map((report, i) => <ReportElement history={props.history} key={i} index={i} info={report} />)
        } 
        {
            ((reports.length <= 0) && !loadingReports)
            ?
            <StyledTypografy> Отчеты отсутствуют </StyledTypografy>   
            : 
            null
        }
        {
            (loadingReports)
            ?
            <StDiv>
                <StCircularProgress/>
                <StyledTypografy> Пожалуйста, подождите, <br/> данные загружаются  </StyledTypografy> 
            </StDiv>
            : 
            null
        }    
    </div>
    )
}

export default connect( (store)=>(
    {
        reports : store.reports.reports ,
        loadingReports : store.reports.loadingReports,
    }),
    {
        reportsLoaded,reportsLoading
    })(Reports);
