const xl = require('excel4node');
const fs = require('fs')

module.exports = function reportBuilder (name='name',
                                         date='',
                                         title='title',
                                         headers=[],
                                         data=[],
                                         style={}) {
  const wb = new xl.Workbook();
  const ws = wb.addWorksheet(title);

  let isComplexTable = false;
  const styleHeaders = {
     alignment: {
       horizontal: 'center',
       vertical: 'center',
       shrinkToFit: true,
       wrapText: true
     },
     font: {
       bold: true
     }
  }

  let i = 0;
  headers.map((header) => {
    if (Array.isArray(header)) {
      isComplexTable = true;
      header.map((subheader, j) => {
        if (j == 0) {
          ws.cell(1,i+1, 1,(header.length-1+i), true).string(header[0]);
        } else {
          ws.cell(2,i+j).string(subheader);
        }
      })
      i += (header.length-1);
    } else {
      ws.cell(1,i+1, 2,i+1, true).string(header);
      i++;
    }
  });

  if (isComplexTable) {
    ws.cell(1,1, 2,i).style(styleHeaders);
  } else {
    ws.cell(1,1, 1,i).style(styleHeaders);
  }

  ws.column(7).setWidth(35);

  const startRow = (isComplexTable) ? 3 : 2;
  for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
      switch (typeof(data[r][c])) {
        case 'number':
          ws.cell((startRow+r),c+1).number(data[r][c]);
          break;
        case 'string':
          ws.cell((startRow+r),c+1).string(data[r][c]);
          break;
        case 'boolean':
          if (data[r][c]) {
            ws.cell((startRow+r),c+1).number(1);
          } else {
            ws.cell((startRow+r),c+1).number(0);
          }
          break;
        default:
          ws.cell((startRow+r),c+1).string('-');
      }
    }
  }

  if (Object.keys(style).length > 0) {
    for (let key in style) {
      for (let prop in style[key]) {
        if (prop == 'width') {
          ws.column(+key).setWidth(style[key][prop]);
        }
        if (prop == 'options') {
          ws.cell(startRow,+key, data.length+startRow-1,+key).style(style[key][prop]);
        }
      }
    }
  }

  try {
    fs.mkdirSync(`docs/reports/${name}_${date}`, {recursive: true});
    wb.write(`docs/reports/${name}_${date}/docsReport_${date}.xlsx`);
  } catch (err) {
    console.log(err);
  }

}
