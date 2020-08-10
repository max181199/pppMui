import React, { useEffect} from 'react';
import ReportElement from './reportsElement';
import { connect } from 'react-redux';
import { reportsLoaded } from '../actions';
import Rep from '../tmpDate/reports'
import { Typography, Grid, Box  } from '@material-ui/core';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import CircularProgress from '@material-ui/core/CircularProgress';

const StyledTypografy = styled(Typography)`
    font-size : max( 24px , calc( 12px + 1vw ));
    color : ${grey[500]};
    margin-top : max( 20px , 4vh );
`;


const Reports = (props) => {

   const { reports, loadingReports, reportsLoaded } = props

  useEffect(  
    () => {
        reportsLoaded(Rep)
    },[])

  return (
    ((reports.length <= 0) && !loadingReports)
    ? 
    <Box>
        <StyledTypografy> Отчеты отсутствуют </StyledTypografy>
        {
            loadingReports 
            ?
            <CircularProgress/>
            :
            null
        }
    </Box>        
    :
    reports.map((report, i) => <ReportElement history={props.history} key={i} index={i} info={report} />
  ))       
}

export default connect( (store)=>(
    {
        reports : store.reports.reports ,
        loadingReports : store.reports.loadingReports,
    }),
    {
        reportsLoaded
    })(Reports);
