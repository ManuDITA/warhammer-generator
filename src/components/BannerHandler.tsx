//@ts-ignore
import { useRef } from "react";
import React from 'react';
import { useState } from "react";
import { read, utils } from 'xlsx';

import { Match } from './match'
import Banner from "./Banner";

function BannerHandler() {

    const [matches, setMatches] = useState<Match[]>([]);
    const [excelData, setExcelData] = useState(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            // Handle the case when there is no file selected
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {

            const data = event.target?.result;
            if (!data) {
                // Handle the case when the file data cannot be read
                return;
            }

            const arrayBuffer = data instanceof ArrayBuffer ? data : data as unknown;

            const workbook = read(data, { type: 'array' });
            console.log(workbook)

            // Get sheet names from the workbook

            // Access data from the first sheet (assuming it's the first one)
            const firstSheetName = "Session1";
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

            console.log(jsonData)

            const newmatches: Match[] = [];

            jsonData.forEach((row: any, k) => {
                if (k > 0) {
                    if (row[12] != undefined) {
                        //match 1, code below

                        const match: Match = new Match(row[2], row[9], row[10] == 'A', row[12], row[6], row[11], row[13], 'RG', row[27], '')
                        newmatches.push(match)

                    }
                    if (row[17] != undefined) {
                        //match 2, code below

                        const match: Match = new Match(row[2], row[14], row[15] == 'A', row[17], row[7], row[16], row[18], 'RG', row[28], '')
                        newmatches.push(match)

                    }
                    if (row[22] != undefined) {
                        //match 3, code below

                        if (k < jsonData.length / 2) {
                            const match: Match = new Match(row[2], row[19], row[20] == 'A', row[22], row[8], row[21], row[23], 'UTG', row[29], row[19])
                            newmatches.push(match)
                        } else {
                            const match: Match = new Match(row[2], row[19], row[20] == 'A', row[22], row[8], row[21], row[23], 'UTG', row[29], row[2])
                            newmatches.push(match)
                        }

                    }

                }

            });

            // Use jsonData as needed, which contains the sheet data in an array of arrays.
            //@ts-ignore
            setExcelData(jsonData);

            setMatches(newmatches)


        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {matches.map((m) => (
                //@ts-ignore


                <Banner prop={m}></Banner>
            ))}
        </div>

    )
}


export default BannerHandler;