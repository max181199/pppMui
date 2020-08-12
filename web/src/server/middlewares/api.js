

const fs = require('fs')
const {resolve} = require('path');
const {pgp, client} = require('./pgp');

const reportBuilder = require('./report-builder');
const { transcriptProfile, transcriptDate, transcriptDateTable, getMonth } = require('./transcript');

const generalQuery = ({limit, count, offset, base, num, label, nameArt, note, from,
                      to, period, profile, isComparison, compPeriod,
                      compProfile, sortClick, sortClickI, sortRefuse, sortRefuseTime, sortRdn, ms, fix}) => {
  const q = `
    SELECT stat.doc_id_hash, stat.point_id,
           stat.base, stat.doc_number, doc_info.title AS doc_title, doc_info.de AS de_link, doc_content.title AS article, stat.label,
           coalesce(note_info.text, stat.text) AS note_text,
           coalesce(rating_norms.rating_rank,rating_docs.rating_rank,null) AS rating_rank,
           coalesce(stat.click_count,0) AS click_count,
           CASE
             WHEN note_info.is_fixed THEN 0
             WHEN stat.click_i_count is null THEN 0
             ELSE stat.click_i_count
           END AS click_i_count,
           CASE
             WHEN note_info.is_fixed THEN 0
             WHEN stat.point_click_i_count is null THEN 0
             ELSE stat.point_click_i_count
           END AS point_click_i_count,
           coalesce(stat.refusal_persent_15,0) AS refusal_persent_15,
           stat.average_rejection_time_15,
           stat.list_rejection_count,
           note_info.is_multy, note_info.is_fixed,
           coalesce(stat.print_count,0) AS print_count, coalesce(stat.copy_count,0) AS copy_count, coalesce(stat.export_count,0) AS export_count, coalesce(stat.save_count,0) AS save_count, coalesce(stat.fav_add_count,0) AS fav_add_count,
           note_info.key as supr_key, note_info.docs as supr_docs, note_info.author as supr_author, note_info.author_devision AS supr_devision, note_info.paragraph_number AS supr_paragraph_number, note_info.state AS supr_state, note_info.modification_time, note_info.created_time,
           coalesce(stat.click_count_by_months,'[]') AS click_count_by_months,
           coalesce(stat.refusal_persent_by_months_15,'[]') AS refusal_persent_by_months_15,
           coalesce(stat.refusal_persent_by_months_10,'[]') AS refusal_persent_by_months_10,
           coalesce(stat.refusal_persent_by_months_5,'[]') AS refusal_persent_by_months_5
           ${
             (isComparison && isComparison != 'false') ? (
               `, coalesce(comp_rating_norms.rating_rank,comp_rating_docs.rating_rank,null) AS comp_rating_rank,
                coalesce(comp_stat.click_count,0) AS comp_click_count,
                CASE
                  WHEN note_info.is_fixed THEN 0
                  WHEN comp_stat.click_i_count is null THEN 0
                  ELSE comp_stat.click_i_count
                END AS comp_click_i_count,
                CASE
                  WHEN note_info.is_fixed THEN 0
                  WHEN comp_stat.point_click_i_count is null THEN 0
                  ELSE comp_stat.point_click_i_count
                END AS comp_point_click_i_count,
                coalesce(comp_stat.refusal_persent_15,0) AS comp_refusal_persent_15,
                comp_stat.average_rejection_time_15 AS comp_average_rejection_time_15,
                comp_stat.list_rejection_count AS comp_list_rejection_count,
                coalesce(comp_stat.print_count,0) AS comp_print_count,
                coalesce(comp_stat.copy_count,0) AS comp_copy_count,
                coalesce(comp_stat.export_count,0) AS comp_export_count,
                coalesce(comp_stat.save_count,0) AS comp_save_count,
                coalesce(comp_stat.fav_add_count,0) AS comp_fav_add_count,
                coalesce(comp_stat.click_count_by_months,'[]') AS comp_click_count_by_months,
                coalesce(comp_stat.refusal_persent_by_months_15,'[]') AS comp_refusal_persent_by_months_15,
                coalesce(comp_stat.refusal_persent_by_months_10,'[]') AS comp_refusal_persent_by_months_10,
                coalesce(comp_stat.refusal_persent_by_months_5,'[]') AS comp_refusal_persent_by_months_5`
             ) : ''
           }
    FROM ppp_prod.stat_${period}_${profile} AS stat
    LEFT JOIN rating_prod.norms_${period}_${profile} AS rating_norms
      ON doc_id_hash = doc_link_hash AND chapter_id_hash = link_hash
    FULL JOIN ppp_prod.note_info
      ON stat.doc_id_hash = note_info.doc_id_hash AND stat.chapter_id_hash = note_info.chapter_id_hash AND stat.text = note_info.text
    LEFT JOIN ppp_prod.doc_content as doc_content
      ON (stat.doc_id_hash = doc_content.link_hash or note_info.doc_id_hash = doc_content.link_hash)
      AND (stat.chapter_id_hash = doc_content.chapter_hash or note_info.chapter_id_hash = doc_content.chapter_hash)
    LEFT JOIN ppp_prod.doc_info AS doc_info
      ON stat.doc_id_hash = doc_info.link_hash
    LEFT JOIN rating_prod.docs_${period}_${profile} AS rating_docs
      ON rating_docs.link_hash = stat.doc_id_hash
    ${
      (isComparison && isComparison != 'false') ? (
        `LEFT JOIN ppp_prod.stat_${compPeriod}_${compProfile} AS comp_stat
           ON stat.point_id = comp_stat.point_id
           AND stat.doc_number = comp_stat.doc_number
           AND stat.text = comp_stat.text
         LEFT JOIN rating_prod.norms_${compPeriod}_${compProfile} AS comp_rating_norms
           ON comp_stat.doc_id_hash = comp_rating_norms.doc_link_hash AND comp_stat.chapter_id_hash = comp_rating_norms.link_hash
         LEFT JOIN rating_prod.docs_${compPeriod}_${compProfile} AS comp_rating_docs
           ON comp_rating_docs.link_hash = comp_stat.doc_id_hash`
      ) : ''
    }
    WHERE ${(base) ? `stat.base = '${base}'` : 'true'}
          AND ${(num) ? `stat.doc_number = '${num}'` : 'true'}
          AND ${(label) ? `stat.label = '${label}'` : 'true'}
          AND (${(nameArt) ? `(doc_content.title_index @@ to_tsquery('${nameArt}')) OR (doc_info.title_index @@ to_tsquery('${nameArt}'))` : 'true'})
          AND ${(note) ? `((ppp_prod.note_info.text_index @@ to_tsquery('${note}')) OR stat.text_index @@ to_tsquery('${note}'))` : 'true'}
          AND ${`stat.refusal_persent_15 >= ${from/100} AND stat.refusal_persent_15 <= ${to/100}`}
          AND ${(ms=='true') ? `note_info.is_multy = true` : 'true'}
          AND ${(fix=='true') ? `note_info.is_fixed = true` : 'true'}
          AND stat.doc_id_hash is not null
    ORDER BY ${(sortClick && sortClick != 'false') ? `stat.click_count ${sortClick}` : (sortRefuse && sortRefuse != 'false') ? `stat.refusal_persent_15 ${sortRefuse}` : (sortRefuseTime && sortRefuseTime != 'false') ? `stat.average_rejection_time_15 ${sortRefuseTime}` : (sortClickI && sortClickI != 'false') ? `(stat.point_click_i_count) ${sortClickI}` : (sortRdn && sortRdn != 'false') ? `(rating_rank) ${sortRdn} NULLS LAST` : 'stat.click_count'}
    ${(limit) ? `OFFSET ${offset} LIMIT ${count}` : ''}
  `;
  console.log(q);
  return q;
}

const labelTextQuery = (docIdHash, pointId) => {
  const q = `
    SELECT text
    FROM doc_text_prod.points
    WHERE points.link_hash = '${docIdHash}' AND points.point = '${pointId}'
  `;
  console.log(q);
  return q;
}

const errorReport = (reportId) => {
  client.query(`
    UPDATE userdata.ppp_reports
    SET is_ready = true, is_error = true
    WHERE id = ${reportId}`)
    .then((status) => {
      console.log('ERROR');
    })
    .catch(err => {
      console.log(err);
    });
}

const dataTransform = (data, isComparison, period, compPeriod) => {
  data.map((row) => {
    row.click_i_count_num = Math.floor(row.click_i_count);
    row.click_i_count = Math.round((row.click_i_count / (row.click_i_count + row.click_count))*100);
    row.point_click_i_count_num = Math.floor(row.point_click_i_count);
    row.point_click_i_count = Math.round((row.point_click_i_count / (row.point_click_i_count + row.click_count))*100);
    row.average_rejection_time_15 = Math.ceil(row.average_rejection_time_15/1000);
    row.refusal_persent_15 = Math.floor(row.refusal_persent_15*100);
    row.click_count_by_months = JSON.parse(row.click_count_by_months);
    row.refusal_persent_by_months_15 = JSON.parse(row.refusal_persent_by_months_15);
    row.refusal_persent_by_months_10 = JSON.parse(row.refusal_persent_by_months_10);
    row.refusal_persent_by_months_5 = JSON.parse(row.refusal_persent_by_months_5);
    if (period == 'actual' && row.click_count_by_months.length > 3) {
      row.click_count_by_months = row.click_count_by_months.slice(1);
      row.refusal_persent_by_months_15 = row.refusal_persent_by_months_15.slice(1);
      row.refusal_persent_by_months_10 = row.refusal_persent_by_months_10.slice(1);
      row.refusal_persent_by_months_5 = row.refusal_persent_by_months_5.slice(1);
    }
    if (row.supr_docs) {
      row.supr_docs = JSON.parse(row.supr_docs);
    };
    row.refusal_persent_by_months_15.map((item) => {
      item.y = Math.floor((item['y'].toFixed(2)) * 100);
    });
    row.refusal_persent_by_months_10.map((item) => {
      item.y = Math.floor((item['y'].toFixed(2)) * 100);
    });
    row.refusal_persent_by_months_5.map((item) => {
      item.y = Math.floor((item['y'].toFixed(2)) * 100);
    });

    if (isComparison && isComparison != 'false') {
      row.comp_click_i_count_num = Math.floor(row.comp_click_i_count);
      row.comp_point_click_i_count_num = Math.floor(row.point_click_i_count);
      row.comp_click_i_count = Math.round((row.comp_click_i_count / (row.comp_click_i_count + row.comp_click_count))*100);
      row.comp_point_click_i_count = Math.round((row.comp_point_click_i_count / (row.comp_point_click_i_count + row.comp_click_count))*100);
      row.comp_average_rejection_time_15 = Math.ceil(row.comp_average_rejection_time_15/1000);
      row.comp_refusal_persent_15 = Math.floor(row.comp_refusal_persent_15.toFixed(2)*100);
      row.comp_click_count_by_months = JSON.parse(row.comp_click_count_by_months);
      row.comp_refusal_persent_by_months_15 = JSON.parse(row.comp_refusal_persent_by_months_15);
      row.comp_refusal_persent_by_months_10 = JSON.parse(row.comp_refusal_persent_by_months_10);
      row.comp_refusal_persent_by_months_5 = JSON.parse(row.comp_refusal_persent_by_months_5);

      if (compPeriod == 'actual' && row.comp_click_count_by_months.length > 3) {
        row.comp_click_count_by_months = row.comp_click_count_by_months.slice(1);
        row.comp_refusal_persent_by_months_15 = row.comp_refusal_persent_by_months_15.slice(1);
        row.comp_refusal_persent_by_months_10 = row.comp_refusal_persent_by_months_10.slice(1);
        row.comp_refusal_persent_by_months_5 = row.comp_refusal_persent_by_months_5.slice(1);
      }

      row.comp_refusal_persent_by_months_15.map((item) => {
        item.y = Math.floor((item['y'].toFixed(2)) * 100);
      })

      row.comp_refusal_persent_by_months_10.map((item) => {
        item.y = Math.floor((item['y'].toFixed(2)) * 100);
      })

      row.comp_refusal_persent_by_months_5.map((item) => {
        item.y = Math.floor((item['y'].toFixed(2)) * 100);
      })
    }

    let modif_date='', modif_time='', created_date='', created_time='';
    if (row.modification_time && row.created_time) {
      let mm = (row.modification_time.getMonth() + 1).toString(),
          dd = (row.modification_time.getDate()).toString(),
          yy = (row.modification_time.getFullYear()).toString(),
          h = (row.modification_time.getHours()).toString(),
          min = (row.modification_time.getMinutes()).toString(),
          sec = (row.modification_time.getSeconds()).toString();
      if (mm.length == 1) mm ='0'+mm;
      if (dd.length == 1) dd ='0'+dd;
      if (h.length == 1) h ='0'+h;
      if (min.length == 1) min ='0'+min;
      if (sec.length == 1) sec ='0'+sec;

      modif_date = `${dd}.${mm}.${yy}`;
      modif_time = `${h}:${min}:${sec}`;

      mm = (row.created_time.getMonth() + 1).toString(),
      dd = (row.created_time.getDate()).toString(),
      yy = (row.created_time.getFullYear()).toString(),
      h = (row.created_time.getHours()).toString(),
      min = (row.created_time.getMinutes()).toString(),
      sec = (row.created_time.getSeconds()).toString();
      if (mm.length == 1) mm ='0'+mm;
      if (dd.length == 1) dd ='0'+dd;
      if (h.length == 1) h ='0'+h;
      if (min.length == 1) min ='0'+min;
      if (sec.length == 1) sec ='0'+sec;

      created_date = `${dd}.${mm}.${yy}`;
      created_time = `${h}:${min}:${sec}`;

    }
    row.modification_date = modif_date;
    row.modification_time = modif_time;
    row.created_date = created_date;
    row.created_time = created_time;
  });
  return data;
}

module.exports = function setup(app) {

  app.get('/api/testSnippets' , async (req , res) =>{
    try {
      const fs = require('fs');
      const path = resolve(__dirname, '..', '..' , 'client' , 'tmpDate' , 'snippets.js');
      const data = fs.readFileSync(path, 'utf8');
      res.send(JSON.stringify(data))
    } catch(err) {
      console.log(err);
      res.send("Error");
    }
  })

  app.get('/api/testPeriods' , async (req , res) =>{
    try {
      const fs = require('fs');
      const path = resolve(__dirname, '..', '..' , 'client' , 'tmpDate' , 'periodic.js');
      const data = fs.readFileSync(path, 'utf8');
      res.send(JSON.stringify(data))
    } catch(err) {
      console.log(err);
      res.send("Error");
    }
  })

  app.get('/api/snippets', async (req, res) => {
    try {
      const limit = true,
            count = +req.query.count || 40,
            offset = +req.query.offset || 0,
            base = req.query.base || '',
            num = req.query.num || '',
            label = req.query.label || '',
            nameArt = (req.query.nameArt) ? (req.query.nameArt) : '',
            note = (req.query.note) ? (req.query.note) : '',
            from = req.query.from || 0,
            to = req.query.to || 100,
            period = req.query.period || '',
            profile = req.query.profile || '',
            isComparison = req.query.isComparison || 'false',
            compPeriod = req.query.compPeriod || '',
            compProfile = req.query.compProfile || '',
            sortClick = req.query.sortClick || 'false',
            sortClickI = req.query.sortClickI || 'false',
            sortRefuse = req.query.sortRefuse || 'false',
            sortRefuseTime = req.query.sortRefuseTime || 'false',
            sortRdn = req.query.sortRdn || 'false',
            ms = req.query.ms || 'false',
            fix = req.query.fix || 'false';

      client.query(generalQuery({limit, count, offset, base, num, label, nameArt, note, from,
                                                       to, period, profile, isComparison, compPeriod,
                                                       compProfile, sortClick, sortClickI, sortRefuse, sortRefuseTime, sortRdn, ms, fix}))
        .then(data => {
          let promises = data.map((row,i) => {
            return client.query(labelTextQuery(row.doc_id_hash, row.point_id))
                     .then((result) => {
                       if (result[0]) {
                         data[i].label_text = result[0].text;
                       }
                       else {
                         data[i].label_text = '-----';
                       }
                     })
          });
          const newData = Promise.all(promises)
            .then((results) => {
              return data;
            })
          return newData;
        })
        .then(data => {
          return(dataTransform(data, isComparison, period, compPeriod));
        })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log(err);
        })
    } catch(err) {
       console.log(err);
       res.send("Error");
    }
  });

  app.get('/api/excel', async (req, res) => {
    try {
      const limit = (req.query.count == 'all') ? false : true,
            count = (req.query.count == 'all') ? -1 : (+req.query.count),
            offset = 0,
            base = req.query.base || '',
            num = req.query.num || '',
            label = req.query.label || '',
            nameArt = (req.query.nameArt) ? (req.query.nameArt) : '',
            origNameArt = (req.query.origNameArt) ? (req.query.origNameArt) : '',
            note = (req.query.note) ? (req.query.note) : '',
            origNote = (req.query.origNote) ? (req.query.origNote) : '',
            from = req.query.from || 0,
            to = req.query.to || 100,
            period = req.query.period || '',
            profile = req.query.profile || '',
            isComparison = req.query.isComparison || 'false',
            compPeriod = req.query.compPeriod || '',
            compProfile = req.query.compProfile || '',
            sortClick = req.query.sortClick || 'false',
            sortClickI = req.query.sortClickI || 'false',
            sortRefuse = req.query.sortRefuse || 'false',
            sortRefuseTime = req.query.sortRefuseTime || 'false',
            sortRdn = req.query.sortRdn || 'false',
            ms = req.query.ms || 'false',
            fix = req.query.fix || 'false',
            isDetail = req.query.isDetail || 'false';

      let datetime = new Date().toISOString();
      let reportId;
      let name = req.cookies.login,
            date = `${datetime.slice(0,10)}_${datetime.slice(11,19).split(':')[0]}${datetime.slice(11,19).split(':')[1]}${datetime.slice(11,19).split(':')[2]}`;
            title = 'ППП',
            headers = [['Метка', 'База', 'Номер', 'Метка', 'Документ', 'Статья', 'Текст'],
                        'Текст примечания',
                        'Позиция в РДН',
                        'Кол. кликов',
                        'Кол. кликов по I',
                        'Клики по I %',
                        'Кол. кликов по I при открытии прим. в этой же сессии',
                        'Клики по I при открытии прим. в этой же сессии %',
                        'Отказы %',
                        'Время отказа',
                        'М-ссылка',
                        'Закрепление',
                        'Кол. отказов от списка',
                       ['Действия', 'Печать', 'Копир.', 'Экспорт', 'Сохран.', 'Избранное'],
                       ['СУПР', 'Ключ', 'Документы', 'Подразд.-автор', '№ в абзаце', 'Статус', 'Дата создания', 'Дата изменения']],
            style={
              7: {
                width: 35
              }
            };

      client.query(`INSERT INTO userdata.ppp_reports (path, login, date_time, is_ready, params)
                    VALUES ('docs/reports/${name}_${date}/docsReport_${date}.xlsx',
                            '${name}', '${datetime.slice()}',
                            false,
                            '{"limit":${limit
                             },"count":${count
                             },"base":"${base
                             }","num":"${num
                             }","label":"${label
                             }","nameArt":"${origNameArt.replace(/&/g, " ")
                             }","note":"${origNote.replace(/&/g, " ")
                             }","from":${from
                             },"to":${to
                             },"period":"${transcriptDate(period)
                             }","profile":"${transcriptProfile(profile)
                             }","isComparison":"${isComparison
                             }","compPeriod":"${transcriptDate(compPeriod)
                             }","compProfile":"${transcriptProfile(compProfile)
                             }","ms":"${ms
                             }","fix":"${fix
                             }","isDetail":"${isDetail
                             }","sortClick":"${sortClick
                             }","sortClickI":"${sortClickI
                             }","sortRefuseTime":"${sortRefuseTime
                             }","sortRdn":"${sortRdn
                             }","sortRefuse":"${sortRefuse}"}')
                    RETURNING id`)
        .then((data)=> {
          reportId = data[0].id;
          res.sendStatus(200);
        })
        .then(()=>{
          let result = client.query(generalQuery({limit, count, offset, base, num, label, nameArt, note, from,
                                                         to, period, profile, isComparison, compPeriod,
                                                         compProfile, sortClick, sortClickI, sortRefuse, sortRefuseTime, sortRdn, ms, fix}))
            .then((data) => {
              return data;
            })
            .catch(err => {
              console.log(err);
            });
          return result;
        })
        .then(data => {
          let promises = data.map((row,i) => {
            return client.query(labelTextQuery(row.doc_id_hash, row.point_id))
                     .then((result) => {
                       if (result[0]) {
                         data[i].label_text = result[0].text;
                       }
                       else {
                         data[i].label_text = '------';
                       }

                     })
          });
          const newData = Promise.all(promises)
            .then((results) => {
              return data;
            })
          return newData;
        })
        .then(data => {
          let report = [];
          let headersPeriod = [];
          let headersCompPeriod = [];
          data = dataTransform(data, isComparison, period, compPeriod);
          let periodMonth = getMonth(period);
          let compPeriodMonth = getMonth(compPeriod);

          for (let i = 0; i < data.length; i++) {
            if ((data[i].click_count_by_months.length > 0) && (headersPeriod.length == 0)) {
              data[i].click_count_by_months.map((item, i) => {
                headersPeriod.push(transcriptDateTable(item.x));
              })
            }
            if ((isComparison != 'false') && (data[i].comp_click_count_by_months.length > 0) && (headersCompPeriod.length == 0)) {
              data[i].comp_click_count_by_months.map((item, i) => {
                headersCompPeriod.push(transcriptDateTable(item.x));
              })
            }
            if ((headersPeriod.length > 0) && ((headersCompPeriod.length > 0) || (isComparison == 'false'))) break;
          }
          if (isDetail!='false') {
            if (headersPeriod.length > 0) {
              headers.push([`Кол-во кликов за ${transcriptDate(period)} (${transcriptProfile(profile)})`, ...headersPeriod]);
            }
            if ((isComparison!='false') && (headersCompPeriod.length > 0)) {
              headers.push([`Кол-во кликов за ${transcriptDate(compPeriod)} (${transcriptProfile(compProfile)})`, ...headersCompPeriod]);
            }

            if (headersPeriod.length > 0) {
              headers.push([`Проц. отказов за ${transcriptDate(period)} (${transcriptProfile(profile)}) (15 сек)`, ...headersPeriod]);
              headers.push([`Проц. отказов за ${transcriptDate(period)} (${transcriptProfile(profile)}) (10 сек)`, ...headersPeriod]);
              headers.push([`Проц. отказов за ${transcriptDate(period)} (${transcriptProfile(profile)}) (5 сек)`, ...headersPeriod]);
            }

            if ((isComparison!='false') && (headersCompPeriod.length > 0)) {
              headers.push([`Проц. отказов за ${transcriptDate(compPeriod)} (${transcriptProfile(compProfile)}) (15 сек)`, ...headersCompPeriod]);
              headers.push([`Проц. отказов за ${transcriptDate(compPeriod)} (${transcriptProfile(compProfile)}) (10 сек)`, ...headersCompPeriod]);
              headers.push([`Проц. отказов за ${transcriptDate(compPeriod)} (${transcriptProfile(compProfile)}) (5 сек)`, ...headersCompPeriod]);
            }
          }
          data.map((row, i) => {
            let docs = '';
            if (row.supr_docs) {
              row.supr_docs.map((doc, i) => {
                docs += doc;
                if (row.supr_docs.length-1 != i) {
                  docs+=', '
                }
              });
            }
            let clickCountByMonths = [];
            let refusalPersentByMonths_15 = [];
            let refusalPersentByMonths_10 = [];
            let refusalPersentByMonths_5 = [];

            if ((headersPeriod.length > 0)) {
              if (row.click_count_by_months.length == 0) {
                clickCountByMonths = new Array(periodMonth).fill('-');
              } else {
                row.click_count_by_months.map((item, i) => {
                  clickCountByMonths.push(item.y);
                })
              }

              if (row.refusal_persent_by_months_15.length == 0) {
                refusalPersentByMonths_15 = new Array(periodMonth).fill('-');
              } else {
                row.refusal_persent_by_months_15.map((item, i) => {
                  refusalPersentByMonths_15.push(item.y);
                })
              }

              if (row.refusal_persent_by_months_10.length == 0) {
                refusalPersentByMonths_10 = new Array(periodMonth).fill('-');
              } else {
                row.refusal_persent_by_months_10.map((item, i) => {
                  refusalPersentByMonths_10.push(item.y);
                })
              }

              if (row.refusal_persent_by_months_5.length == 0) {
                refusalPersentByMonths_5 = new Array(periodMonth).fill('-');
              } else {
                row.refusal_persent_by_months_5.map((item, i) => {
                  refusalPersentByMonths_5.push(item.y);
                })
              }
            }

            if (isComparison && isComparison != 'false') {
              let compClickCountByMonths = [];
              let compRefusalPersentByMonths_15 = [];
              let compRefusalPersentByMonths_10 = [];
              let compRefusalPersentByMonths_5 = [];

              if ((headersCompPeriod.length > 0)) {
                if (row.comp_click_count_by_months.length == 0) {
                  compClickCountByMonths = new Array(compPeriodMonth).fill('-');
                } else {
                  row.comp_click_count_by_months.map((item, i) => {
                    compClickCountByMonths.push(item.y);
                  })
                }

                if (row.comp_refusal_persent_by_months_15.length == 0) {
                  compRefusalPersentByMonths_15 = new Array(compPeriodMonth).fill('-');
                } else {
                  row.comp_refusal_persent_by_months_15.map((item, i) => {
                    compRefusalPersentByMonths_15.push(item.y);
                  })
                }

                if (row.comp_refusal_persent_by_months_10.length == 0) {
                  compRefusalPersentByMonths_10 = new Array(compPeriodMonth).fill('-');
                } else {
                  row.comp_refusal_persent_by_months_10.map((item, i) => {
                    compRefusalPersentByMonths_10.push(item.y);
                  })
                }

                if (row.comp_refusal_persent_by_months_5.length == 0) {
                  compRefusalPersentByMonths_5 = new Array(compPeriodMonth).fill('-');
                } else {
                  row.comp_refusal_persent_by_months_5.map((item, i) => {
                    compRefusalPersentByMonths_5.push(item.y);
                  })
                }
              }

              report.push([row.base, row.doc_number, row.label, row.doc_title, row.article, row.label_text,
                         row.note_text,
                         (row.rating_rank != null) ?
                         `${row.rating_rank} / ${ (row.comp_rating_rank != null) ? row.comp_rating_rank : '-'} | ${Math.floor(row.rating_rank - row.comp_rating_rank)}` : '-',
                         `${row.click_count} / ${row.comp_click_count} | ${Math.floor(row.click_count - row.comp_click_count)}`,
                         (row.is_fixed) ? '-' : `${row.point_click_i_count_num} / ${row.comp_point_click_i_count_num} | ${Math.floor(row.point_click_i_count_num - row.comp_point_click_i_count_num)}`,
                         (row.is_fixed) ? '-' : `${row.point_click_i_count} / ${row.comp_point_click_i_count} | ${Math.floor(row.point_click_i_count - row.comp_point_click_i_count)}`,
                         (row.is_fixed) ? '-' : `${row.click_i_count_num} / ${row.comp_click_i_count_num} | ${Math.floor(row.click_i_count_num - row.comp_click_i_count_num)}`,
                         (row.is_fixed) ? '-' : `${row.click_i_count} / ${row.comp_click_i_count} | ${Math.floor(row.click_i_count - row.comp_click_i_count)}`,
                         `${row.refusal_persent_15} / ${row.comp_refusal_persent_15} | ${Math.floor((+row.refusal_persent_15) - (+row.comp_refusal_persent_15))}`,
                         `${row.average_rejection_time_15} / ${row.comp_average_rejection_time_15} | ${Math.floor(+row.average_rejection_time_15 - (+row.comp_average_rejection_time_15))}`,
                         (row.is_multy != null) ? row.is_multy : '-', (row.is_fixed != null) ? row.is_fixed : '-',
                         `${row.list_rejection_count} / ${row.comp_list_rejection_count} | ${Math.floor(row.list_rejection_count - row.comp_list_rejection_count)}`,
                         `${row.print_count} / ${row.comp_print_count} | ${Math.floor(row.print_count - row.comp_print_count)}`,
                         `${row.copy_count} / ${row.comp_copy_count} | ${Math.floor(row.copy_count - row.comp_copy_count)}`,
                         `${row.export_count} / ${row.comp_export_count} | ${Math.floor(row.export_count - row.comp_export_count)}`,
                         `${row.save_count} / ${row.comp_save_count} | ${Math.floor(row.save_count - row.comp_save_count)}`,
                         `${row.fav_add_count} / ${row.comp_fav_add_count} | ${Math.floor(row.fav_add_count - row.comp_fav_add_count)}`,
                         (row.supr_key) ? row.supr_key : '-', (docs) ? docs : '-', (row.supr_devision) ? `${row.supr_devision}-${row.supr_author}` : '-', (row.supr_paragraph_number) ? row.supr_paragraph_number : '-', (row.supr_state) ? row.supr_state : '-', (row.created_date) ? `${row.created_date} ${row.created_time}` : '-', (row.modification_date) ? `${row.modification_date} ${row.modification_time}` : '-']);
                         if (isDetail != 'false') {
                           report[i].push(...clickCountByMonths, ...compClickCountByMonths, ...refusalPersentByMonths_15, ...refusalPersentByMonths_10, ...refusalPersentByMonths_5, ...compRefusalPersentByMonths_15, ...compRefusalPersentByMonths_10, ...compRefusalPersentByMonths_5)
                         }
            } else {
                report.push([row.base, row.doc_number, row.label, row.doc_title, row.article, row.label_text,
                           row.note_text, row.rating_rank,
                           (row.click_count != null) ? row.click_count : '-',
                           (row.is_fixed) ? '-' : row.point_click_i_count_num,
                           (row.is_fixed) ? '-' : row.point_click_i_count,
                           (row.is_fixed) ? '-' : row.click_i_count_num,
                           (row.is_fixed) ? '-' : row.click_i_count,
                           row.refusal_persent_15,
                           row.average_rejection_time_15,
                           (row.is_multy != null) ? row.is_multy : '-', (row.is_fixed != null) ? row.is_fixed : '-',
                           row.list_rejection_count,
                           row.print_count,
                           row.copy_count,
                           row.export_count,
                           row.save_count,
                           row.fav_add_count,
                           (row.supr_key) ? row.supr_key : '-', (docs) ? docs : '-', (row.supr_devision) ? `${row.supr_devision}-${row.supr_author}` : '-', (row.supr_paragraph_number) ? row.supr_paragraph_number : '-', (row.supr_state) ? row.supr_state : '-', (row.created_date) ? `${row.created_date} ${row.created_time}` : '-', (row.modification_date) ? `${row.modification_date} ${row.modification_time}` : '-']);
                           if (isDetail != 'false') {
                             report[i].push(...clickCountByMonths, ...refusalPersentByMonths_15, ...refusalPersentByMonths_10, ...refusalPersentByMonths_5)
                           }
            }
          });
          return(report);
        })
        .then((report) => {
          reportBuilder(name, date, title, headers, report, style);
        })
        .then(() =>{
          client.query(`
            UPDATE userdata.ppp_reports
            SET is_ready = true
            WHERE id = ${reportId}`)
            .then((status) => {
              console.log('Report was built');
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          errorReport(reportId);
          console.log(err);
        })

    } catch(err) {
       console.log(err);
       res.send("Error");
    }
  });

  app.get('/api/reportsInfo', async (req, res) => {
    try {
      const name = req.cookies.login;

      client.query(`SELECT id, is_ready, is_error, params, path from userdata.ppp_reports where login = '${name}'
                    ORDER BY id DESC`)
        .then(data => {
          data.map((row) => {row.params = JSON.parse(`${row.params}`)});
          return(data);
        })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log(err);
        })

    } catch(err) {
       console.log(err);
       res.send("Error");
    }
  });

  app.get('/api/downloadReport', async (req, res) => {
    try {
      pathFile = resolve(__dirname, '..', '..', '..', (req.query.path));
      res.download(pathFile);
    } catch(err) {
       console.log(err);
       res.send("Error");
    }
  });

  app.get('/api/delReport', async (req, res) => {
    try {
      const id = req.query.id;

      client.query(`DELETE FROM userdata.ppp_reports
                    WHERE id = '${id}'`)
        .then(() => {
          res.sendStatus(200);
        })
        .catch(err => {
          console.log(err);
        })

    } catch(err) {
       console.log(err);
       res.send("Error");
    }
  });


  app.get('/api/periodsList', async (req, res) => {
    try {
      client.query(`SELECT DISTINCT substring(table_name from 6 for 6) partition_name
                    FROM   information_schema.tables
                    where table_schema = 'ppp_prod'
                    and table_name like 'stat_%'
                    ORDER BY partition_name DESC`)
        .then(data => {
          let periodsList = [];
          data.map((period) => {
            if (period.partition_name == 'actual') {
              periodsList.push('Текущий');
            } else {
              periodsList.push(`01.${period.partition_name.slice(4)}.${period.partition_name.slice(0,4)} 12 месяцев`);
              //periodsList.push(`01.${period.partition_name.slice(4)}.${period.partition_name.slice(0,4)} 6 месяцев`);
              periodsList.push(`01.${period.partition_name.slice(4)}.${period.partition_name.slice(0,4)} 3 месяца`);
            }
          });
          res.send(periodsList);
        })
        .catch(err => {
          console.log(err);
        })

    } catch(err) {
       console.log(err);
       res.send("Error");
    }
  });

  app.get('/api/getUpdateDate', async (req, res) => {
    try {
      client.query(`SELECT obj_description('ppp_prod.stat'::regclass) as update_date`)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log(err);
        })

    } catch(err) {
       console.log(err);
       res.send("Error");
    }
  });
};
