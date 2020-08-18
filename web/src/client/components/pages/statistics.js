import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import Header from '../header/header';
import FilterBar from '../filters/filterBar'
import WorkSpace from '../workspace'
import Table from '../table'
import { newPeriodsList } from '../../actions'
import { getQuery } from '../../services/query-service'


function Statistics( props ) {
    const { filterIcon  , newPeriodsList } = props;
    useEffect(()=>{
        getQuery( "/testPeriods").then(  /// /periodsList 
                (data)=> {  if (data != 0) {newPeriodsList(JSON.parse(data))}}) /// Возможно стоит убрать JSON.parse
    },[])

    return(
        <div> 
            <Hidden only='xl'>
                <Header/>         
                { 
                    filterIcon === "open" 
                    ?
                    <FilterBar history={props.history}/> 
                    : 
                    null 
                }    
            </Hidden>    
            <WorkSpace >
                <Table history={props.history} />
            </WorkSpace> 
        </div>          
    )
}

export default connect( (store) =>( 
{
    filterIcon : store.optional.filterIcon,
    periods : store.periods.periods
}
),{
    newPeriodsList
})(Statistics)