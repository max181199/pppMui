export default class QueryService {
  _apiBase = `${window.location.protocol}//${window.location.host}/api`;
  
  counter = 0;


  transcriptPeriod = (period) => {
    if (period == 'Текущий') {
      return ('actual')
    }
    const arrDate = period.slice(0,10).split('.');
    const months = period.split(' ')[1];
    return (arrDate[2].toString() + arrDate[1].toString() + '_' + months.toString())
  }

  transcriptProfile = (profile) => {
    let newProfile;
    switch (profile) {
      case 'Все профили':
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

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'GET'
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  textTransform = async (url) => {
    const res = await fetch(url, {
      method: 'GET'
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };

  buildRep = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'GET'
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res;
  };

  postResource = async (url, body) => {
    console.log('MAX_OTL ::' +`${this._apiBase}${url}`);
    const res = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
  };

  getSnippets = async (offset=0, count=40, filters) => {
    const {from, to, period,
           profile, isComparison, compPeriod, compProfile, sortClick, sortClickI, sortRefuse, sortRefuseTime, sortRdn, ms, fix } = filters;
    let {nameArt, note} = filters;
    this.counter++;
    let localCounter = this.counter;

    let base='', num='', baseNum='', label='';
    if (filters.base) {
      baseNum = filters.base.split('_');
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

    if (nameArt) {
      try {
        nameArt = await this.textTransform(`http://rbd-cube1/windows-services/getQueryExtension?query=${encodeURI(nameArt)}`);
        nameArt = encodeURIComponent(nameArt.result);
      } catch(err) {
         console.log(err);
      }
    }

    if (note) {
      try {
        note = await this.textTransform(`http://rbd-cube1/windows-services/getQueryExtension?query=${encodeURI(note)}`);
        note = encodeURIComponent(note.result);
      } catch(err) {
         console.log(err);
      }
    }

    const data = await this.getResource(`/snippets/?offset=${offset
                                                   }&count=${count
                                                   }&base=${base
                                                   }&num=${num
                                                   }&label=${label
                                                   }&nameArt=${nameArt
                                                   }&note=${note
                                                   }&from=${from
                                                   }&to=${to
                                                   }&period=${this.transcriptPeriod(period)
                                                   }&profile=${this.transcriptProfile(profile)
                                                   }&isComparison=${isComparison
                                                   }&compPeriod=${this.transcriptPeriod(compPeriod)
                                                   }&compProfile=${this.transcriptProfile(compProfile)
                                                   }&sortClick=${sortClick
                                                   }&sortClickI=${sortClickI
                                                   }&sortRefuse=${sortRefuse
                                                   }&sortRefuseTime=${sortRefuseTime
                                                   }&sortRdn=${sortRdn
                                                   }&ms=${ms
                                                   }&fix=${fix}`);
    if(this.counter == localCounter){
      return data;
    } else {
      return 0;
      console.info(`Запрос #${localCounter} отменён, есть запросы позже`);
    }
  }

  buildReport = async (filters) => {
    const {from, to, period, count,
           profile, isComparison, compPeriod, compProfile, sortClick, sortClickI, sortRefuse, sortRefuseTime, sortRdn, ms, fix, isDetail } = filters;
    let {nameArt, note} = filters;
    const origNameArt = nameArt,
          origNote = note;

    if (nameArt) {
      try {
        nameArt = await this.textTransform(`http://rbd-cube1/windows-services/getQueryExtension?query=${encodeURI(nameArt)}`);
        nameArt = encodeURIComponent(nameArt.result);
      } catch(err) {
         console.log(err);
      }
    }

    if (note) {
      try {
        note = await this.textTransform(`http://rbd-cube1/windows-services/getQueryExtension?query=${encodeURI(note)}`);
        note = encodeURIComponent(note.result);
      } catch(err) {
         console.log(err);
      }
    }

    let base='', num='', baseNum='', label='';
    if (filters.base) {
      baseNum = filters.base.split('_');
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

    const status = await this.buildRep(`/excel/?offset=${0
                                   }&count=${(count) ? count : 'all'
                                   }&base=${base
                                   }&num=${num
                                   }&label=${label
                                   }&nameArt=${nameArt
                                   }&origNameArt=${origNameArt
                                   }&note=${note
                                   }&origNote=${origNote
                                   }&from=${from
                                   }&to=${to
                                   }&period=${this.transcriptPeriod(period)
                                   }&profile=${this.transcriptProfile(profile)
                                   }&isComparison=${isComparison
                                   }&isDetail=${isDetail
                                   }&compPeriod=${this.transcriptPeriod(compPeriod)
                                   }&compProfile=${this.transcriptProfile(compProfile)
                                   }&sortClick=${sortClick
                                   }&sortClickI=${sortClickI
                                   }&sortRefuse=${sortRefuse
                                   }&sortRefuseTime=${sortRefuseTime
                                   }&sortRdn=${sortRdn
                                   }&ms=${ms
                                   }&fix=${fix}`);
    return status;
  }

  getReports = async () => {
    const reports = await this.getResource('/reportsInfo');
    return reports;
  }

  downloadReport = async (path) => {
    const status = await this.buildRep(`/downloadReport?path=${path}`);
    return (status);
  }

  delReport = async (id) => {
    const status = await this.buildRep(`/delReport?id=${id}`);
    return (status);
  }

  getPeriodsList = async () => {
    const periodsList = await this.getResource('/periodsList');
    return periodsList;
  }

  getUpdateDate = async () => {
    const updateDate = await this.getResource('/getUpdateDate');
    return updateDate[0].update_date;
  }

}
