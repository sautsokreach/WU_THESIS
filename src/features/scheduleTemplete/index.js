import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TitleCard from "../../components/Cards/TitleCard"
import axios from 'axios';
import { Base_URL } from '../../../src/utils/globalConstantUtil';

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
function getListUniversity(setRows) {
    axios.get(`${Base_URL}/api/universities`)
        .then(res => {
            setRows(res.data.map((item) => ({ ...item, id: item.university_id })))
        })
}

export default function ScheduleTemplete({ data }) {
    const elementToPrintRef = useRef(null);
    const handlePrint = () => {
        const elementToPrint = elementToPrintRef.current;
        console.error(elementToPrint);
        if (elementToPrint) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(elementToPrint.innerHTML);
            printWindow.document.close();
            setTimeout(()=>printWindow.print(),1000)
            ; // Trigger the print dialog
        } else {
            console.error('Element to print not found.');
        }
    };

    return (
        <div>
            <div ref={elementToPrintRef}>
                <style>
                    {`
            .scheduleContainer {
                display: flex;
                flex-direction: column;
              }
              
              .scheduleHeader {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;
              
                border-bottom: 1px solid;
              }
              
              .scheduleHeader h4 {
                margin-top: auto;
                margin-bottom: 5px;
              }
              
              /* Body Schedule */
              .scheduleUnderHeader {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              
              .scheduleUnderHeader img {
                width: 100px;
              }
              
              .description {
                max-width: 500px;
                width: 350px;
                text-align: end;
              }
              
              /* Title */
              
              .title {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 10px;
              }
              
              .title h2 {
                margin: 5px;
              }
              
              .title p {
                margin-top: 2px;
                margin-bottom: 5px;
                font-size: 1rem;
              }
              
              /* Table */
              table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
                margin-right: 50px;
                margin-bottom: 5px;
              }
              td,
              th {
                border: 5px solid #dddddd;
                font-size: 0.8rem;
                text-align: center;
                width: 100px;
                max-width: 200px;
                padding: 10px;
              }
              td {
                height: 80px;
              }
              
              .col > * {
                padding: 0;
                margin: 5px;
              }
              
              /* Footer */
              
              .footer {
                display: flex;
                flex-direction: column;
              }
              
              .scheduleTime,
              .signature {
                width: 100%;
                display: flex;
                justify-content: space-between;
              }
              
              .term,
              .dateTime {
                max-width: 300px;
                width: 100%;
                font-size: 1rem;
              }
              .term > * {
                margin-bottom: 0;
              }
              
              .signatureButton > p:first-child {
                padding-bottom: 50px;
              }
              
          `}  </style>
                {data != null ?
                    (<div class="scheduleContainer" style={{background:'white',padding:'20px'}}>

                        <div class="scheduleHeader">
                            <h4>សកលវិទ្យាល័យ វេស្ទីន</h4>
                            <h4>Academic {data.academic}</h4>
                            <h4>Western University</h4>
                        </div>

                        <div class="scheduleUnderHeader">
                            <img src="https://media.licdn.com/dms/image/C4E22AQFEcsuyNeWRiQ/feedshare-shrink_800/0/1605667646490?e=2147483647&v=beta&t=aAH3Im3lA0ERpEBjnXf2snGnNvx6hmPWy3D8BpxfvZU"
                                alt="Logo" />
                            <div class="description">
                                <h3>{data.department} </h3>
                            </div>
                        </div>

                        <div class="title">
                            <h2>SCHEDULE OF YEAR {data.year} - SEMESTER {data.semester} - BATCH {data.batch}</h2>
                            <p><b>Bachelor Degree</b></p>
                            <p>Major in Accounting and Banking Finance</p>
                            <p><b>Shift: {data.shift}</b></p>

                        </div>

                        <table>
                            <tr>
                                <th>Date</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                            </tr>
                            <tr>
                                <td>8:00 to 9:30</td>
                                <td rowSpan='2'>
                                    <div class="col">
                                        <p>Finance Report Analysis</p>
                                        <p>Code FIX10</p>
                                        <p>Mr KOY Sokun</p>
                                        <p>Tel: 012548456</p>
                                        <p>Room: 104</p>
                                    </div>
                                </td>
                                <td rowSpan='2'>
                                    <div class="col">
                                        <p>Finance Report Analysis</p>
                                        <p>Code FIX10</p>
                                        <p>Mr KOY Sokun</p>
                                        <p>Tel: 012548456</p>
                                        <p>Room: 104</p>
                                    </div>
                                </td>
                                <td rowSpan='2'>
                                    <div class="col">
                                        <p>Finance Report Analysis</p>
                                        <p>Code FIX10</p>
                                        <p>Mr KOY Sokun</p>
                                        <p>Tel: 012548456</p>
                                        <p>Room: 104</p>
                                    </div>
                                </td>
                                <td rowSpan='2'>
                                    <div class="col">
                                        <p>Finance Report Analysis</p>
                                        <p>Code FIX10</p>
                                        <p>Mr KOY Sokun</p>
                                        <p>Tel: 012548456</p>
                                        <p>Room: 104</p>
                                    </div>
                                </td>
                                <td rowSpan='2'>
                                    <div class="col">
                                        <p>Finance Report Analysis</p>
                                        <p>Code FIX10</p>
                                        <p>Mr KOY Sokun</p>
                                        <p>Tel: 012548456</p>
                                        <p>Room: 104</p>
                                    </div>
                                </td>


                            </tr>
                            <tr>
                                <td>9:35 to 11:00</td>
                            </tr>
                        </table>
                        <div class="footer">
                            <div class="scheduleTime">
                                <div class="term">
                                    <p>Term starts on Auguest 7,2023</p>
                                    <p>Term ends on November 25, 2023</p>
                                </div>

                                <div class="dateTime">
                                    <p>
                                        This schedule is subject to change Phnom penh, Auguest 1, 2023
                                    </p>
                                </div>
                            </div>

                            <div class="signature">
                                <div class="signatureButton">
                                    <p>Seen and Approved by</p>
                                    <p>Try Sothearith. Ph.D</p>
                                </div>

                                <div class="signatureButton">
                                    <p>
                                        Prepared by
                                    </p>
                                    <p>
                                        Long Bunleng, Ph.D
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    ) : ''}
            </div>
            {data != null ? (<center><button className=" btn px-6 btn-sm normal-case btn-primary" onClick={handlePrint}>Print</button></center>):''}
        </div>
    );
}
