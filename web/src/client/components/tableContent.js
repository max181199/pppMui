import React , { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import {Box,Grid,Typography} from '@material-ui/core';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import IconButton from '@material-ui/core/IconButton';
import Chart from './chart'
import LinkOffIcon from '@material-ui/icons/LinkOff';
import LinkIcon from '@material-ui/icons/Link';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';


const StyledTableRow  = styled(TableRow)`
    &:nth-of-type(odd) {
        background-color : #eeeeee ;
    }
`;

const Typography9on6 = styled(Typography)`
    font-size : calc( 9px + 0.6vw);
    line-height : 1.1;
    text-align : left;
    align-self : center;
`;

const Typography9on6Center = styled(Typography)`
    font-size : calc( 9px + 0.6vw);
    line-height : 1.1;
    text-align : center;
    align-self : center;
`;

const Typography8on6 = styled(Typography)`
    font-size : calc( 8px + 0.6vw);
    line-height : 1.1;
    align-self : center;
`;

const Typography8on6Red = styled(Typography)`
    font-size : calc( 8px + 0.6vw);
    line-height : 1.1;
    align-self : center;
    color : #e53935;
`;

const Typography8on6Green = styled(Typography)`
    font-size : calc( 8px + 0.6vw);
    line-height : 1.1;
    align-self : center;
    color : #43a047;
`;



const Typography8on6Grey = styled(Typography)`
    font-size : calc( 8px + 0.6vw);
    line-height : 1.1;
    align-self : center;
    color : #9F9F9F ;
`;



const StyledTableCell = styled(TableCell)`
    border : 1px solid lightgrey;
    vertical-align : top ;
`;

const BoxFlex10 = styled(Box)`
    display : flex;
    margin-top : 10px;
`;

const BoxFlex = styled(Box)`
    display : flex;
`;

const BoxBlock10 = styled(Box)`
    display : block;
    margin-top : 10px;
`;

const AvatarStyled = styled(Avatar)`    
    height : calc(15px + 0.6vw);
    width  : calc(15px + 0.6vw);
    align-self : center;
`;

const Typography9on6ml20 = styled(Typography)`
    font-size : calc( 9px + 0.6vw);
    margin-left : 20px;
    line-height : 1.1;
    text-align : left;
    align-self : center;
`;

const Typography9on6ml5 = styled(Typography)`
    font-size : calc( 9px + 0.6vw);
    margin-left : 5px;
    line-height : 1.1;
    text-align : left;
    align-self : center;
`;

const Typography9on6ml10 = styled(Typography)`
    font-size : calc( 9px + 0.6vw);
    margin-left : 10px;
    line-height : 1.1;
    text-align : left;
    align-self : center;
`;

const StyledIconButton = styled(IconButton)`
    font-size : calc(20px + 0.6vw);
`;

const BoxIcon = styled(Box)`
    font-size : calc(20px + 0.6vw);
    margin-bottom : 10px;
`;

const OFFAttachmentIcon = styled(AttachmentIcon)`
    color : #9F9F9F ;
`;

const OFFLinkOffIcon = styled(LinkOffIcon)`
    color : #9F9F9F ;
`;

const StyledContainer = styled(Container)`
    text-align : left;
    padding-left : 10px;
    paddingRight : 10px;
`;

const ClearTableSell = styled(TableCell)`
    margin : 0;
    padding : 0;
`;

const getDocUrl = (doc) => {
    if (doc[0] == 'Б') {
        let base = doc.split('_')[0].slice(2);
        let num = doc.split('_')[1].slice(2);
        let label = (doc.split('_')[2]) ? doc.split('_')[2].slice(2) : '100001';
        return (`consultantplus://offline/main?base=${base};n=${num};dst=${label};last`)
    } else {
        return doc;
    }
}    

function tableContent( props){

    const { isComparison , snippet, num} = props
    const [fullTextFlag,setFullTextFlag] = useState(false) ;
    const [isShowingClickChart, onClickChartClick] = useState(false);
    const [isShowingRefChart, onRefChartClick] = useState(false);
    const [isShowingAllDocs, onShowAllDocsClick] = useState(false);

    return([
    <StyledTableRow key={`${num}-base`}>
        <StyledTableCell align="center">
            <BoxFlex>
                <Link
                    target="_blank"
                    href={`consultantplus://offline/main?base=${snippet.base};n=${snippet.de_link};dst=${snippet.label};last`}
                >
                    <AvatarStyled 
                        alt="K+"
                        src={require("../K-logo.png")}
                    />
                </Link>
                <Typography9on6ml20 variant='h6'>{'База:'}</Typography9on6ml20>
                <Typography9on6ml5 variant='body1'>{snippet['base']}</Typography9on6ml5>
                <Typography9on6ml20 variant='h6'>{'Номер:'}</Typography9on6ml20>
                <Typography9on6ml5 variant='body1'>{snippet['doc_number']}</Typography9on6ml5>
            </BoxFlex>
            { 
                snippet['doc_title'] != null
                ? 
                <BoxFlex10>
                    <Typography9on6 variant='body1'> {snippet['doc_title']}</Typography9on6>
                </BoxFlex10> 
                :
                null
            }
            { 
                ((snippet['article'] != null) && (snippet['article'] != ''))
                ? 
                <BoxFlex10>
                    <Typography9on6 variant='body1'> {snippet['article']} </Typography9on6>
                </BoxFlex10> 
                :
                null
            }
            <BoxFlex10>
                <Typography9on6 variant='h6'> {'Метка:'}</Typography9on6>
                <Typography9on6ml5 variant='body1'> {snippet['label']}</Typography9on6ml5>
            </BoxFlex10>
            {   snippet['label_text'].length > 200 
                ?
                    fullTextFlag 
                    ? 
                    <BoxBlock10>
                        <Typography9on6 variant='body1'> {snippet['label_text']}</Typography9on6>
                        <Link 
                            onClick={ (e)=>{setFullTextFlag(false)}}
                        >
                            <Typography9on6 variant='h6' >{'Скрыть'}</Typography9on6>
                        </Link>
                    </BoxBlock10>
                    :
                    <BoxBlock10>
                        <Typography9on6 variant='body1'> {snippet['label_text'].slice(0,200) + '...' }</Typography9on6>
                        <Link 
                            onClick={ (e)=>{setFullTextFlag(true)}}
                        >
                            <Typography9on6 noWrap variant='h6' >{'Показать весь текст'}</Typography9on6>
                        </Link>
                    </BoxBlock10>
                :
                <BoxFlex10>
                    <Typography9on6 variant='body1' >{snippet['label_text']}</Typography9on6>
                </BoxFlex10>
            }     
        </StyledTableCell>
        <StyledTableCell >
            <Typography9on6 variant='body1' >{snippet['note_text']}</Typography9on6>
        </StyledTableCell>
        <StyledTableCell align="center">
            {
                snippet['rating_rank'] == null 
                ? 
                <Typography8on6 variant='body1'>---</Typography8on6>
                : 
                    isComparison
                    ?
                        snippet['comp_rating_rank'] == null 
                        ?
                        [
                            <Typography8on6 key={'rr1'} variant='body1'>{snippet['rating_rank']}</Typography8on6>,
                            <Typography8on6Grey key={'rr2'} variant='body1'> {`+NaN`}</Typography8on6Grey>
                        ]
                        :
                            snippet['rating_rank']-snippet['comp_rating_rank'] > 0
                            ?
                            [
                                <Typography8on6 key={'rr3'} variant='body1'>{snippet['rating_rank']}</Typography8on6>,
                                <Typography8on6Green key={'rr4'} variant='body1' > { '+' + Math.floor(snippet['rating_rank']-snippet['comp_rating_rank'] )}</Typography8on6Green>,
                            ]
                            :
                            [
                                <Typography8on6 key={'rr5'} variant='body1'>{snippet['rating_rank']}</Typography8on6>,
                                <Typography8on6Red key={'rr6'} variant='body1'> { '-' + Math.floor(snippet['rating_rank']-snippet['comp_rating_rank'] )}</Typography8on6Red>
                            ]        
                    :
                    <Typography8on6 variant='body1'>{snippet['rating_rank']}</Typography8on6>
            }
        </StyledTableCell>
        <StyledTableCell align="center">
            {
                snippet['click_count'] == null 
                ? 
                <Typography8on6 variant='body1'>---</Typography8on6>
                : 
                    isComparison
                    ?
                        snippet['comp_click_count'] == null 
                        ?
                        [
                            <Typography8on6 key={'cc1'} variant='body1'>{snippet['click_count']}</Typography8on6>,
                            <Typography8on6Grey key={'cc2'} variant='body1'>{`+NaN`}</Typography8on6Grey>
                        ]
                        :
                            snippet['click_count']-snippet['comp_click_count'] > 0
                            ?
                            [
                                <Typography8on6 key={'cc3'} variant='body1'>{snippet['click_count']}</Typography8on6>,
                                <Typography8on6Green key={'cc4'} variant='body1'> { '+' + Math.floor(snippet['click_count']-snippet['comp_click_count'] )}</Typography8on6Green>,
                            ]
                            :
                            [
                                <Typography8on6 key={'cc5'} variant='body1'>{snippet['click_count']}</Typography8on6>,
                                <Typography8on6Red key={'cc6'} variant='body1'> { '-' + Math.floor(snippet['click_count']-snippet['comp_click_count'] )}</Typography8on6Red>
                            ]        
                    :
                    <Typography8on6 variant='body1'>{snippet['click_count']}</Typography8on6>
                }
                <StyledIconButton 
                    onClick={()=>{onClickChartClick(!isShowingClickChart);onRefChartClick(false)}}
                >
                    <ShowChartIcon fontSize='inherit'/>
                </StyledIconButton>
        </StyledTableCell>
        <StyledTableCell align="center">
            {
                snippet['is_fixed'] 
                ? 
                <Typography8on6 variant='body1'>---</Typography8on6>
                : 
                    isComparison
                    ?
                        snippet['comp_click_i_count'] == null 
                        ?
                        [
                            <Typography8on6 key={'ci1'} variant='body1'>{snippet['point_click_i_count_num']}</Typography8on6>,
                            <Typography8on6Grey key={'ci2'} variant='body1'>{`+NaN`}</Typography8on6Grey>
                        ]
                        :
                            snippet['point_click_i_count_num']-snippet['comp_click_i_count'] > 0
                            ?
                            [
                                <Typography8on6 key={'ci3'} variant='body1'>{snippet['point_click_i_count_num']}</Typography8on6>,
                                <Typography8on6Green key={'ci4'} variant='body1'> { '+' + Math.floor(snippet['point_click_i_count_num']-snippet['comp_click_i_count'] )}</Typography8on6Green>,
                            ]
                            :
                            [
                                <Typography8on6 key={'ci5'} variant='body1'>{snippet['point_click_i_count_num']}</Typography8on6>,
                                <Typography8on6Red key={'ci6'} variant='body1'> { '-' + Math.floor(snippet['point_click_i_count_num']-snippet['comp_click_i_count'] )}</Typography8on6Red>
                            ]        
                    :
                    <Typography8on6 variant='body1'>{snippet['point_click_i_count_num']}</Typography8on6>
                }
        </StyledTableCell>
        <StyledTableCell align="center">
        {
            snippet['refusal_persent_15'] == null
            ? 
            <Typography8on6 variant='body1'>---</Typography8on6>
            : 
                isComparison
                ?
                    snippet['comp_refusal_persent_15'] == null 
                    ?
                    [
                        <Typography8on6 key={'rp1'} variant='body1'>{snippet['refusal_persent_15']}</Typography8on6>,
                        <Typography8on6Grey key={'rp2'} variant='body1'>{`+NaN`}</Typography8on6Grey>
                    ]
                    :
                        snippet['refusal_persent_15']-snippet['comp_refusal_persent_15'] > 0
                        ?
                        [
                            <Typography8on6 key={'rp3'} variant='body1'>{snippet['refusal_persent_15']}</Typography8on6>,
                            <Typography8on6Green key={'rp4'} variant='body1'> { '+' + Math.floor(snippet['refusal_persent_15']-snippet['comp_refusal_persent_15'] )}</Typography8on6Green>,
                        ]
                        :
                        [
                            <Typography8on6 key={'rp5'} variant='body1'>{snippet['refusal_persent_15']}</Typography8on6>,
                            <Typography8on6Red key={'rp6'} variant='body1'> { '-' + Math.floor(snippet['refusal_persent_15']-snippet['comp_refusal_persent_15'] )}</Typography8on6Red>
                        ]        
                :
                <Typography8on6 variant='body1'>{snippet['refusal_persent_15']}</Typography8on6>
            }
            <StyledIconButton 
            onClick={(e)=>{onRefChartClick(!isShowingRefChart),onClickChartClick(false)}}
            >
                <ShowChartIcon fontSize='inherit'/>
            </StyledIconButton>
        </StyledTableCell>
        <StyledTableCell align="center">
            {
                snippet['average_rejection_time_15'] == null
                ? 
                <Typography8on6 variant='body1'>---</Typography8on6>
                : 
                    isComparison
                    ?
                        snippet['comp_average_rejection_time_15'] == null 
                        ?
                        [
                            <Typography8on6 key={'arp1'} variant='body1'>{snippet['average_rejection_time_15']}</Typography8on6>,
                            <Typography8on6Grey key={'arp2'} variant='body1' >{`+NaN`}</Typography8on6Grey>
                        ]
                        :
                            snippet['average_rejection_time_15']-snippet['comp_average_rejection_time_15'] > 0
                            ?
                            [
                                <Typography8on6 key={'arp3'} variant='body1'>{snippet['average_rejection_time_15']}</Typography8on6>,
                                <Typography8on6Green key={'arp4'} variant='body1'> { '+' + Math.floor(snippet['average_rejection_time_15']-snippet['comp_average_rejection_time_15'] )}</Typography8on6Green>,
                            ]
                            :
                            [
                                <Typography8on6 key={'arp5'} variant='body1'>{snippet['average_rejection_time_15']}</Typography8on6>,
                                <Typography8on6Red key={'arp6'} variant='body1' > { '-' + Math.floor(snippet['average_rejection_time_15']-snippet['comp_average_rejection_time_15'] )}</Typography8on6Red>
                            ]        
                    :
                    <Typography8on6 variant='body1'>{snippet['average_rejection_time_15']}</Typography8on6>
                }
        </StyledTableCell>
        <StyledTableCell align="center">
            {
                snippet['is_multy'] == null
                ?
                null 
                :
                    snippet['is_multy'] === true 
                    ?
                    <BoxIcon>
                        <LinkIcon fontSize='inherit'/>
                    </BoxIcon>    
                    :
                    <BoxIcon>
                        <OFFLinkOffIcon fontSize='inherit'/>
                    </BoxIcon> 
            }
            {
                snippet['is_multy'] == null
                ?
                null 
                :
                    snippet['is_fixed'] === true 
                    ?
                    <BoxIcon>
                        <AttachFileIcon fontSize='inherit'/>
                    </BoxIcon>    
                    :
                    <BoxIcon>
                        <OFFAttachmentIcon  fontSize='inherit'/>
                    </BoxIcon>        
            }
            {
                snippet['is_fixed'] === null && snippet['is_multy'] === null
                ?
                <Typography8on6 >---</Typography8on6>
                :
                null
            }
        </StyledTableCell>
        <StyledTableCell align="left">
            {
                snippet['print_count'] == null
                ? 
                <Typography8on6 variant='body1'>---</Typography8on6>
                : 
                    isComparison
                    ?
                        snippet['comp_print_count'] == null 
                        ?
                        [
                            <Typography8on6 key={'pr1'} variant='body1'>{snippet['print_count']}</Typography8on6>,
                            <Typography8on6Grey key={'pr2'} variant='body1'>{`+NaN`}</Typography8on6Grey>
                        ]
                        :
                            snippet['print_count']-snippet['comp_print_count'] > 0
                            ?
                            [
                                <Typography8on6 key={'pr3'} variant='body1'>{snippet['print_count']}</Typography8on6>,
                                <Typography8on6Green key={'pr4'} variant='body1'> { '+' + Math.floor(snippet['print_count']-snippet['comp_print_count'] )}</Typography8on6Green>,
                            ]
                            :
                            [
                                <Typography8on6 key={'pr5'} variant='body1'>{snippet['print_count']}</Typography8on6>,
                                <Typography8on6Red key={'pr6'} variant='body1' > { '-' + Math.floor(snippet['print_count']-snippet['comp_print_count'] )}</Typography8on6Red>
                            ]        
                    :
                    <Typography8on6 variant='body1'>{snippet['print_count']}</Typography8on6>
                }
        </StyledTableCell>
        <StyledTableCell align="left">
            {
                snippet['copy_count'] == null
                ? 
                <Typography8on6 variant='body1'>---</Typography8on6>
                : 
                    isComparison
                    ?
                        snippet['comp_copy_count'] == null 
                        ?
                        [
                            <Typography8on6 key={'cop1'} variant='body1'>{snippet['copy_count']}</Typography8on6>,
                            <Typography8on6Grey key={'cop2'} variant='body1'>{`+NaN`}</Typography8on6Grey>
                        ]
                        :
                            snippet['copy_count']-snippet['comp_copy_count'] > 0
                            ?
                            [
                                <Typography8on6 key={'cop3'} variant='body1'>{snippet['copy_count']}</Typography8on6>,
                                <Typography8on6Green key={'cop4'} variant='body1'> { '+' + Math.floor(snippet['copy_count']-snippet['comp_copy_count'] )}</Typography8on6Green>,
                            ]
                            :
                            [
                                <Typography8on6 key={'cop5'} variant='body1'>{snippet['copy_count']}</Typography8on6>,
                                <Typography8on6Red  key={'cop6'} variant='body1'> { '-' + Math.floor(snippet['copy_count']-snippet['comp_copy_count'] )}</Typography8on6Red>
                            ]        
                    :
                    <Typography8on6 variant='body1'>{snippet['copy_count']}</Typography8on6>
                }
        </StyledTableCell>
        <StyledTableCell align="left">
            {
                snippet['export_count'] == null
                ? 
                <Typography8on6 variant='body1'>---</Typography8on6>
                : 
                    isComparison
                    ?
                        snippet['comp_export_count'] == null 
                        ?
                        [
                            <Typography8on6 key={'ec1'} variant='body1'>{snippet['export_count']}</Typography8on6>,
                            <Typography8on6Grey key={'ec2'} variant='body1'>{`+NaN`}</Typography8on6Grey>
                        ]
                        :
                            snippet['export_count']-snippet['comp_export_count'] > 0
                            ?
                            [
                                <Typography8on6 key={'ec3'} variant='body1'>{snippet['export_count']}</Typography8on6>,
                                <Typography8on6Green key={'ec4'} variant='body1'> { '+' + Math.floor(snippet['export_count']-snippet['comp_export_count'] )}</Typography8on6Green>,
                            ]
                            :
                            [
                                <Typography8on6 key={'ec5'} variant='body1'>{snippet['export_count']}</Typography8on6>,
                                <Typography8on6Red key={'ec6'} variant='body1'> { '-' + Math.floor(snippet['export_count']-snippet['comp_export_count'] )}</Typography8on6Red>
                            ]        
                    :
                    <Typography8on6 variant='body1'>{snippet['export_count']}</Typography8on6>
                }
        </StyledTableCell>
        <StyledTableCell align="left">
        {
            snippet['save_count'] == null
            ? 
            <Typography8on6 variant='body1'>---</Typography8on6>
            : 
                isComparison
                ?
                    snippet['comp_save_count'] == null 
                    ?
                    [
                        <Typography8on6 key={'sc1'} variant='body1'>{snippet['save_count']}</Typography8on6>,
                        <Typography8on6Grey key={'sc2'} variant='body1'>{`+NaN`}</Typography8on6Grey>
                    ]
                    :
                        snippet['save_count']-snippet['comp_save_count'] > 0
                        ?
                        [
                            <Typography8on6 key={'sc3'} variant='body1'>{snippet['save_count']}</Typography8on6>,
                            <Typography8on6Green key={'sc4'} variant='body1'> { '+' + Math.floor(snippet['save_count']-snippet['comp_save_count'] )}</Typography8on6Green>,
                        ]
                        :
                        [
                            <Typography8on6 key={'sc5'} variant='body1'>{snippet['save_count']}</Typography8on6>,
                            <Typography8on6Red key={'sc6'} variant='body1'> { '-' + Math.floor(snippet['save_count']-snippet['comp_save_count'] )}</Typography8on6Red>
                        ]        
                :
                <Typography8on6 variant='body1'>{snippet['save_count']}</Typography8on6>
            }
        </StyledTableCell>
        <StyledTableCell align="left">
            {
                snippet['fav_add_count'] == null
                ? 
                <Typography8on6 variant='body1'>---</Typography8on6>
                : 
                    isComparison
                    ?
                        snippet['comp_fav_add_count'] == null 
                        ?
                        [
                            <Typography8on6 key={'fc1'} variant='body1'>{snippet['fav_add_count']}</Typography8on6>,
                            <Typography8on6Grey key={'fc2'} variant='body1'>{`+NaN`}</Typography8on6Grey>
                        ]
                        :
                            snippet['fav_add_count']-snippet['comp_fav_add_count'] > 0
                            ?
                            [
                                <Typography8on6 key={'fc3'} variant='body1'>{snippet['fav_add_count']}</Typography8on6>,
                                <Typography8on6Green key={'fc4'} variant='body1'> { '+' + Math.floor(snippet['fav_add_count']-snippet['comp_fav_add_count'] )}</Typography8on6Green>,
                            ]
                            :
                            [
                                <Typography8on6 key={'fc5'} variant='body1'>{snippet['fav_add_count']}</Typography8on6>,
                                <Typography8on6Red key={'fc6'} variant='body1'> { '-' + Math.floor(snippet['fav_add_count']-snippet['comp_fav_add_count'] )}</Typography8on6Red>
                            ]        
                    :
                    <Typography8on6 variant='body1'>{snippet['fav_add_count']}</Typography8on6>
                }
        </StyledTableCell>
        <StyledTableCell align="center">
            {
                snippet['supr_key'] === null 
                ?
                <Typography9on6Center variant='h4'>Информация по данному примечанию отсутствует в системе СУПР</Typography9on6Center>   
                :
                <Box>
                    <BoxFlex>
                        <Typography9on6 variant='h6' >{'Ключ:'}</Typography9on6>
                        <Link 
                            target="_blank"
                            href={`http://supr.consultant.ru/object/${snippet['supr_key']}`}
                        >
                            <Typography9on6ml5 variant='body1' >{snippet['supr_key']}</Typography9on6ml5>
                        </Link>
                    </BoxFlex>
                    <BoxBlock10>
                        <Typography9on6 variant='h6' >{'Документы:'}</Typography9on6>
                        <StyledContainer>
                            {
                                snippet.supr_docs.length == 0 
                                ? 
                                'отсутствуют' 
                                : 
                                snippet.supr_docs.map((doc, i) => {
                                    if (isShowingAllDocs || i < 5) {
                                        return (
                                            <Link
                                            key={i}
                                            noWrap
                                            target="_blank"
                                            href={getDocUrl(doc)}>
                                                <Typography9on6>
                                                    {(doc[0] == 'Б') ? doc : (doc.slice(0,35) + '...')}
                                                    {(snippet.supr_docs.length-1 == i) ? '' : ', '}
                                                </Typography9on6>
                                            </Link>
                                        );
                                        } else {
                                        return null;
                                        }
                                })
                            
                            }
                        </StyledContainer> 
                        {
                            snippet.supr_docs.length > 4 
                            ?
                                isShowingAllDocs 
                                ?
                                <Link 
                                    onClick={ (e)=>{onShowAllDocsClick(false)}}
                                >
                                    <Typography9on6 noWrap variant='h6' >{'Скрыть'}</Typography9on6>
                                </Link>
                                :
                                <Link 
                                    onClick={ (e)=>{onShowAllDocsClick(true)}}
                                >
                                    <Typography9on6 noWrap variant='h6' >{'Все документы'}</Typography9on6>
                                </Link>
                            :
                            null    
                        }
                    </BoxBlock10>   
                    <BoxBlock10>
                        <Typography9on6  variant='h6'> {`Aвтор: `}</Typography9on6>
                        <Typography9on6ml10  
                            variant='body1'
                        >
                                {snippet['supr_author'] === null ? '---' : `${snippet.supr_devision} - ${snippet['supr_author']}` }
                        </Typography9on6ml10>
                    </BoxBlock10>
                    <BoxFlex10>  
                        <Typography9on6 variant='h6' > {`№ прим. в абзаце:`}</Typography9on6>
                        <Typography9on6ml5 variant='body1'> {snippet['supr_paragraph_number'] === null ? '---' : snippet['supr_paragraph_number']}</Typography9on6ml5>
                    </BoxFlex10>  
                    <BoxFlex10>
                        <Typography9on6 variant='h6' > {`Статус:`}</Typography9on6>
                        <Typography9on6ml5 variant='body1' >{snippet['supr_state'] === null ? '---' : snippet['supr_state']}</Typography9on6ml5>
                    </BoxFlex10>
                    <BoxFlex10>
                            <Typography9on6 variant='h6'> {`Дата создания:`}</Typography9on6>
                            <Typography9on6ml5 variant='body1' >{snippet['created_date'] === null ? '---' : snippet['created_date']}</Typography9on6ml5>
                    </BoxFlex10>
                    <BoxFlex10>
                        <Typography9on6 noWrap variant='h6' > {`Дата посл. изм.:`}</Typography9on6>
                        <Typography9on6ml5 noWrap variant='body1' >{snippet['modification_date'] === null ? '---' : snippet['modification_date']}</Typography9on6ml5>
                    </BoxFlex10>
                </Box>
            }        
        </StyledTableCell>
    </StyledTableRow>,
    isShowingClickChart 
    ?
        <TableRow colSpan={10}  key={num + 'HiddenChart1'}>
            <ClearTableSell  colSpan={14} >
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <Chart 
                            onClose={()=>{onClickChartClick(false);
                            onRefChartClick(false)}}
                            title={'Количество кликов'}
                            data={snippet['click_count_by_months']}
                            compData={(isComparison) ? snippet.comp_click_count_by_months : []}
                        />
                    </Grid>
                </Grid>        
            </ClearTableSell>
        </TableRow>
    :
    null,
    isShowingRefChart
    ?
        <TableRow colSpan={10}  key={num + 'HiddenChart2'}>
            <ClearTableSell  colSpan={14} >
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item>
                        <Chart onClose={()=>{onClickChartClick(false); onRefChartClick(false)}}
                            title={'Процент отказов'}
                            data={snippet['refusal_persent_by_months_15']}
                            compData={(isComparison) ? snippet.comp_refusal_persent_by_months_15 : []}
                        />
                    </Grid>
                </Grid>    
            </ClearTableSell>
        </TableRow>
    :
    null,

    ])     
}
export default tableContent