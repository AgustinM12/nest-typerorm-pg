import { Injectable } from '@nestjs/common';
import { CreateXslxDto } from './dto/create-xslx.dto';
import * as Xlsxpopulate from "xlsx-populate"
import { lectura, materias, problemas, titulos_fin, titulos_inicio, style } from "./data/excel.data"

function getExcelColLetter(colIndex: number): string {
  let letters = '';
  while (colIndex >= 0) {
    letters = String.fromCharCode((colIndex % 26) + 65) + letters;
    colIndex = Math.floor(colIndex / 26) - 1;
  }
  return letters;
}

@Injectable()
export class XslxService {
  async create(createXslxDto: CreateXslxDto) {

    const workbook = await Xlsxpopulate.fromBlankAsync();
    const sheet = workbook.sheet(0)

    sheet.range("A1:P1").merged(true).style({ border: true })
    sheet.cell("A1")
      .value("ID_Estudiante")
      .style(style);

    sheet.range("A2:P2").merged(true).style({ border: true })
    sheet.cell("A2")
      .value("VALOR")
      .style(style);

    // * Titulos iniciales
    for (let index = 0; index < titulos_inicio.length; index++) {
      const startIndex = getExcelColLetter(index);

      sheet.cell(startIndex + "3")
        .value(titulos_inicio[index])
        .style(style);
      sheet.column(startIndex).width(30)
    }

    // * Materias
    for (let index = 0; index < materias.length; index++) {
      const startIndex = 16 + index * 8;
      const endIndex = startIndex + 7;

      const startLetter = getExcelColLetter(startIndex);
      const endLetter = getExcelColLetter(endIndex);

      const rango = `${startLetter}1:${endLetter}1`;

      sheet.range(rango).merged(true).style({ border: true });
      sheet.cell(startLetter + "1")
        .value(materias[index])
        .style(style);
    }

    // * Titulos finales
    for (let index = 0; index < titulos_fin.length; index++) {
      const startIndex = 112 + index;

      const cell = getExcelColLetter(startIndex)

      sheet.cell(cell + "3")
        .value(titulos_fin[index])
        .style(style);
      sheet.column(startIndex + 1).width(30)
    }


    // * habilidad
    let switcher = true

    for (let index = 0; index < 24; index++) {

      const startIndex = titulos_inicio.length + index * 4;
      const endIndex = startIndex + 3;

      const startLetter = getExcelColLetter(startIndex);
      const endLetter = getExcelColLetter(endIndex);

      const rango = `${startLetter}2:${endLetter}2`;

      sheet.range(rango).merged(true).style({ border: true });
      sheet.cell(startLetter + "2")
        .value(switcher ? "COMPRENSIÓN LECTORA" : "RESOLUCIÓN DE PROBLEMAS")
        .style({ ...style, fill: switcher ? "f87171" : "86efac" });

      switcher = !switcher
    }

    // * desempeño
    let count = 0
    for (let index = 0; index < 96; index++) {

      if (count === 4) {
        count = 0
        switcher = !switcher
      }

      const startIndex = titulos_inicio.length + index;

      const cell = getExcelColLetter(startIndex)

      sheet.cell(cell + "3")
        .value(switcher ? lectura[count] : problemas[count])
        .style(style);
      sheet.column(startIndex + 1).width(30)

      count++
    }

    await workbook.toFileAsync("./default.xlsx");

  }

  async read() {
    const workbook = await Xlsxpopulate.fromFileAsync("./xlsx/PEAF_MODEL.xlsx")

    const xd = workbook.sheet("BASE DE DATOS").cell("A3").value()

    console.log(xd);

  }

}
