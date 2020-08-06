const transcriptProfile = (profile) => {
  let newProfile;
  switch (profile) {
    case 'all':
      newProfile = 'Все профили';
      break;
    case 'budget':
      newProfile = 'Бухгалтерия и кадры бюджетной организации';
      break;
    case 'buh':
      newProfile = 'Бухгалтерия и кадры';
      break;
    case 'hr':
      newProfile = 'Кадры';
      break;
    case 'jur':
      newProfile = 'Юрист';
      break;
    case 'universal':
      newProfile = 'Универсальный';
      break;
    case 'budget_universal':
      newProfile = 'Универсальный для бюджетной организации';
      break;
    case 'zakupki':
      newProfile = 'Специалист по закупкам';
      break;
    default:
      newProfile = 'Все профили';
  }
  return(newProfile)
}

const transcriptDate = (date) => {
  if (date == 'actual') {
    return ('Текущий')
  } else {
    return(`01.${date.split('_')[0].slice(4)}.${date.split('_')[0].slice(0,4)} ${date.split('_')[1]} ${(date.split('_')[1] == '12') ? 'месяцев' : 'месяца'}`)
  }
}

const getMonth = (date) => {
  if (date == 'actual') {
    return 3
  } else {
    return (+date.split('_')[1])
  }
}

const transcriptDateTable = (date) => {
  let newDate = new Date(date);
  year = newDate.getFullYear();
  month = newDate.getMonth()+1;
  day = newDate.getDate();
  return (`${(day.toString().length == 1) ? `0${day}` : day}.${(month.toString().length == 1) ? `0${month}` : month}.${year}`);
}

module.exports = {transcriptProfile, transcriptDate, transcriptDateTable, getMonth}
