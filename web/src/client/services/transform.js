import { getQueryWithoutBase } from './query-service'
import { offset } from 'highcharts';

const transcriptPeriod = (period) => {
    if (period == 'Текущий') {
      return ('actual')
    }
    if (period == 'Не выбрано') {
        return ('actual')
    }
    const arrDate = period.slice(0,10).split('.');
    const months = period.split(' ')[1];
    return (arrDate[2].toString() + arrDate[1].toString() + '_' + months.toString())
}

const transcriptProfile = (profile) => {
    let newProfile;
    switch (profile) {
      case 'Все профили':
        newProfile = 'all';
        break;
      case 'Не выбрано':
        newProfile = 'all';
        break;  
      case 'Бухгалтерия и кадры бюджетной организации':
        newProfile = 'budget';
        break;
      case 'Бухгалтерия и кадры':
        newProfile = 'buh';
        break;
      case 'Кадры':
        newProfile = 'hr';
        break;
      case 'Юрист':
        newProfile = 'jur';
        break;
      case 'Универсальный':
        newProfile = 'universal';
        break;
      case 'Универсальный для бюджетной организации':
        newProfile = 'budget_universal';
        break;
      case 'Специалист по закупкам':
        newProfile = 'zakupki';
        break;
      default:
        newProfile = 'all';
    }
    return(newProfile)
  }

const transformName = ( filtersBase )=>{
    let base='', num='', baseNum='', label='';
    if (filtersBase) {
    baseNum = filtersBase.split('_');
    if (baseNum.length == 3) {
        base = (baseNum[0].search('=') == -1) ? baseNum[0] : baseNum[0].slice(baseNum[0].search('=')+1);
        num = (baseNum[1].search('=') == -1) ? baseNum[1] : baseNum[1].slice(baseNum[1].search('=')+1);
        label = (baseNum[2].search('=') == -1) ? baseNum[2] : baseNum[2].slice(baseNum[2].search('=')+1);
    } else if (baseNum.length == 2) {
        base = (baseNum[0].search('=') == -1) ? baseNum[0] : baseNum[0].slice(baseNum[0].search('=')+1);
        num = (baseNum[1].search('=') == -1) ? baseNum[1] : baseNum[1].slice(baseNum[1].search('=')+1);
    } else {
        base = (baseNum[0].search('=') == -1) ? baseNum[0] : baseNum[0].slice(baseNum[0].search('=')+1);
    }
    }  
    return({
        base : base,
        num  : num ,
        label : label,
    })
}

const transformNameArt = ( nameArt ) => {
    nameArt = getQueryWithoutBase(`http://rbd-cube1/windows-services/getQueryExtension?query=${encodeURI(nameArt)}`);
    nameArt = encodeURIComponent(nameArt.result);
    return nameArt;
}

const transformNote = ( note ) => {
    note = getQueryWithoutBase(`http://rbd-cube1/windows-services/getQueryExtension?query=${encodeURI(note)}`);
    note = encodeURIComponent(note.result);
    return note;
}

const toSnippetsRequestForm = ( filters  , offset = 0 , count = 20 ) =>{
    return({
        ...filters,
        period : transcriptPeriod(filters.period),
        profile : transcriptProfile(filters.profile),
        compPeriod : transcriptPeriod(filters.compPeriod),
        compProfile : transcriptProfile(filters.compProfile),
        offset : offset,
        count  : count ,
        note : transformNote(filters.note),
        nameArt : transformNameArt(filters.nameArt),
        ...transformName(filters.base),
    })
}

const toReportsRequestForm = ( filters , offset = 0) =>{
    return({
      ...filters,
      offset : offset,
      count  : (filters.count) ? filters.count : 'all',
      origNameArt : filters.nameArt,
      origNote    : filters.note,
      period : transcriptPeriod(filters.period),
      profile : transcriptProfile(filters.profile),
      compPeriod : transcriptPeriod(filters.compPeriod),
      compProfile : transcriptProfile(filters.compProfile),
      note : transformNote(filters.note),
      nameArt : transformNameArt(filters.nameArt),
      ...transformName(filters.base),
    })
}

export {
    transcriptPeriod,
    transcriptProfile,
    transformName,
    transformNameArt,
    transformNote,
    toSnippetsRequestForm,
    toReportsRequestForm
}