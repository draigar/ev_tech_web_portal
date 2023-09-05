import { element } from './../../node_modules/@types/prop-types/index.d';
import { useCallback } from "react";
import { formatter } from 'web/helper';
import { utils, writeFileXLSX } from "xlsx";

export const useExportData = () => {

    const ExportToExcel = (sheets: any | undefined, fileName?: string, sheetName?: string) => {
        let newFileName = null;
        const chName = fileName && fileName.replaceAll(" ", "_").toLowerCase() + "_" + formatter.formatDate("", "DD_MM_YYYY");
        newFileName = chName;
        const jsonKeys = Object.keys(sheets[0]);
        let objectMaxLength: any = [];
        for (let i = 0; i < sheets.length; i++) {
            const value = sheets[i];
            for (let j = 0; j < jsonKeys.length; j++) {
                if (typeof value[jsonKeys[j]] == "number") {
                    objectMaxLength[j] = 10;
                } else {

                    const l = value[jsonKeys[j]] ? value[jsonKeys[j]].length : 0;

                    objectMaxLength[j] =
                        objectMaxLength[j] >= l
                            ? objectMaxLength[j]
                            : l;
                }
            }
            let key = jsonKeys;
            for (let j = 0; j < key.length; j++) {
                objectMaxLength[j] =
                    objectMaxLength[j] >= key[j].length
                        ? objectMaxLength[j]
                        : key[j].length;
            }
        }

        const wscols = objectMaxLength.map((w: any) => { return { width: w } });
        const ws = utils.json_to_sheet(sheets)
        ws["!cols"] = wscols;
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, sheetName ?? "Data");
        writeFileXLSX(wb, newFileName + '.xlsx');
    }

    return {
        ExportToExcel,
    }
}