import React from 'react';
import blue from '@material-ui/core/colors/blue';
import Paper from '@material-ui/core/Paper';
import { Typography , Hidden } from '@material-ui/core';
import ReportConstructionLG from '../reportsConstructors/reportsConstructorLG'
import ReportConstructionMD from '../reportsConstructors/reportsConstructorMD'
import Reports from '../reports'
import ExcelHeader from '../excelHeader/excelHeader'
import styled from 'styled-components';


const WorkPaper = styled(Paper)`
    width : 100vw;
    min-width : 1360px;
`;

const XLargeLeftToolbarPapper = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : 6vh;
    min-height : max( 70px , 6vh );
    background-color : ${blue[800]};
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 10px );
    left: 2vw;
    z-index : 3;
    display : flex;
`;

const XLargeLeftWorkspace = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : calc( 96vh - max( 70px , 6vh ) );
    border : 2px solid lightgrey;
    background-color : white;
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 10px + max( 70px , 6vh ));
    left: 2vw;
    z-index : 3;
    display : block;
    overflow-y : auto;
`;

const XLargeRightToolbarPapper = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : 6vh;
    min-height : max( 70px , 6vh );
    background-color : ${blue[800]};
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 10px );
    left: calc( 6vw + max( 46vw , 628px) );
    z-index : 3;
    display : flex;
`;

const XLargeRightWorkspace = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : calc( 96vh - max( 70px , 6vh ) );
    border : 2px solid lightgrey;
    background-color : white;
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 10px + max( 70px , 6vh ));
    left: calc( 6vw + max( 46vw , 628px) );
    z-index : 3;
    display : block;
    overflow-y : auto;
`;

const MediumLeftToolbarPapper = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : 50px;
    min-height : 50px;
    background-color : ${blue[800]};
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 50px + 10px );
    left: 2vw;
    z-index : 3;
    display : flex;
`;

const MediumLeftWorkspace = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : calc( 96vh - 110px  );
    background-color : white;
    border : 2px solid lightgrey;
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 100px + 10px );
    left: 2vw;
    z-index : 3;
    display : block;
    overflow-y : auto;
`;

const LargeLeftToolbarPapper = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : 6vh;
    min-height : max( 70px , 6vh );
    background-color : ${blue[800]};
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 60px + 10px );
    left: 2vw;
    z-index : 3;
    display : flex;
`;

const LargeLeftWorkspace = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : calc( 96vh - 70px - max( 70px , 6vh ) );
    border : 2px solid lightgrey;
    background-color : white;
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 60px + 10px + max( 70px , 6vh ));
    left: 2vw;
    z-index : 3;
    display : block;
    overflow-y : auto;
`;

const MediumRightToolbarPapper = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : 50px;
    min-height : 50px;
    background-color : ${blue[800]};
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 50px + 10px );
    left: calc( 6vw + max( 46vw , 628px) );
    z-index : 3;
    display : flex;
`;

const MediumRightWorkspace = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : calc( 96vh - 110px  );
    background-color : white;
    border : 2px solid lightgrey;
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 100px + 10px );
    left: calc( 6vw + max( 46vw , 628px) );
    z-index : 3;
    display : block;
    overflow-y : auto;

`;

const LargeRightToolbarPapper = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : 6vh;
    min-height : max( 70px , 6vh );
    background-color : ${blue[800]};
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 60px + 10px );
    left: calc( 6vw + max( 46vw , 628px) );
    z-index : 3;
    display : flex;
`;

const LargeRightWorkspace = styled(Paper)`
    width  : 46vw;
    min-width : 628px;
    height : calc( 96vh - 70px - max( 70px , 6vh ) );
    border : 2px solid lightgrey;
    background-color : white;
    border-radius : 0px;
    position : absolute;
    top : calc( 2vh + 60px + 10px + max( 70px , 6vh ));
    left: calc( 6vw + max( 46vw , 628px) );
    z-index : 3;
    display : block;
    overflow-y : auto;
`;

const TypographyTitleLarge = styled(Typography)`
    font-size : calc( 6px + 1.2vw);
    line-height : 1.1;
    color : white;
    width  : 46vw;
    min-width : 628px;
    align-self : center;
    text-align : center;
`;

const TypographyTitleMedium = styled(Typography)`
    font-size : 24px;
    line-height : 1.1;
    color : white;
    width  : 46vw;
    min-width : 628px;
    align-self : center;
    text-align : center;
`;

function main(props){
    return (
        <WorkPaper>
            <Hidden only='xl'>
                <ExcelHeader/>
            </Hidden>
            <Hidden only={['lg','md','sm','xs']}>
                <XLargeLeftToolbarPapper elevation={1}>
                    <TypographyTitleLarge variant='h6'>
                        Конструктор отчетов
                    </TypographyTitleLarge>
                </XLargeLeftToolbarPapper>
                <XLargeLeftWorkspace>
                    <ReportConstructionLG history={props.history}  />
                </XLargeLeftWorkspace>
            </Hidden>
            <Hidden only={['xl','md','sm','xs']}>
                <LargeLeftToolbarPapper elevation={1}>
                    <TypographyTitleLarge variant='h6'>
                        Конструктор отчетов
                    </TypographyTitleLarge>
                </LargeLeftToolbarPapper>
                <LargeLeftWorkspace>
                    <ReportConstructionLG history={props.history} />
                </LargeLeftWorkspace>
            </Hidden>
            <Hidden only={['xl','lg']}>
                <MediumLeftToolbarPapper elevation={1}>
                    <TypographyTitleMedium variant='h6'>
                        Конструктор отчетов
                    </TypographyTitleMedium>
                </MediumLeftToolbarPapper>
                <MediumLeftWorkspace>
                    <ReportConstructionMD history={props.history}/>
                </MediumLeftWorkspace>
            </Hidden>
            <Hidden only={['lg','md','sm','xs']}>
                <XLargeRightToolbarPapper elevation={1}>
                    <TypographyTitleLarge variant='h6'>
                        Отчеты
                    </TypographyTitleLarge>
                </XLargeRightToolbarPapper>
                <XLargeRightWorkspace>
                    <Reports history={props.history} />
                </XLargeRightWorkspace>
            </Hidden>
            <Hidden only={['xl','md','sm','xs']}>
                <LargeRightToolbarPapper elevation={1}>
                    <TypographyTitleLarge variant='h6'>
                        Отчеты
                    </TypographyTitleLarge>
                </LargeRightToolbarPapper>
                <LargeRightWorkspace>
                    <Reports history={props.history} />
                </LargeRightWorkspace>
            </Hidden>
            <Hidden only={['xl','lg']}>
                <MediumRightToolbarPapper elevation={1}>
                    <TypographyTitleMedium variant='h6'>
                        Отчеты
                    </TypographyTitleMedium>
                </MediumRightToolbarPapper>
                <MediumRightWorkspace>
                    <Reports history={props.history}/>
                </MediumRightWorkspace>
            </Hidden>
        </WorkPaper>
    )
}

export default main