import React, { useEffect , useCallback, useState} from 'react';
import { connect } from 'react-redux';
import { newPeriodsList } from '../../actions';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Header from '../header/header';
import FilterBar from '../filterBar'
import WorkSpace from '../workspace'
import Table from '../table'
import blue from '@material-ui/core/colors/blue';

function Statistics( props ) {

    const { filterIcon , test } = props;
        // console.group( 'BEGIN' )
        //     console.log('base: ' + test.base)
        //     console.log('nameArt: ' + test.nameArt)
        //     console.log('note: ' + test.note)
        //     console.log('from: ' + test.from)
        //     console.log('to: ' + test.to)
        //     console.log('profile: ' + test.profile)
        //     console.log('period: ' + test.period)
        //     console.log('isComparison: ' + test.isComparison)
        //     console.log('compProfile: ' + test.compProfile)
        //     console.log('compPeriod: ' + test.compPeriod)
        //     console.log('sortClick: ' + test.sortClick)
        //     console.log('sortClickI: ' + test.sortClickI)
        //     console.log('sortRefuse: ' + test.sortRefuse)
        //     console.log('sortRefuseTime: ' + test.sortRefuseTime)
        //     console.log('sortRdn: ' + test.sortRdn)
        //     console.log('ms: ' + test.ms)
        //     console.log('fix: ' + test.fix)
        // console.groupEnd( 'END')
    return(
            <Grid 
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start" 
            >
                <Hidden only='xl'>
                    <Grid item >
                        <Header/>         
                    </Grid>
                    <Grid item>
                    { 
                            (   filterIcon === "open" ?
                                <FilterBar/> : <div></div> )
                    }    
                    </Grid>
                </Hidden>    
                <Grid item>
                    <WorkSpace >
                    <Table/>
                    </WorkSpace>    
                </Grid>
            </Grid>
    )
}

export default connect( store =>( {filterIcon : store.optional.filterIcon, test : store.filters,}))(Statistics)