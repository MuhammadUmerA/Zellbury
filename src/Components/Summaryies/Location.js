import React, { useState } from "react";
import Chart from "react-apexcharts";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from '../Loader'


function Location({ itemsLocation, isLoading, LocationLabelsHook, LocationValueHook }) {
    // Today
    let idSum = 0;
    let idSumYes = 0;
    let idSumMon = 0;
    let idSumprevious = 0;
    let idSumGrossSale = 0;
    let idSumGp = 0;
    let idSQFeetYeild = 0;
    let idRentRevenueRatio = 0;
    for (let i = 0; itemsLocation && i < itemsLocation.length; i++) {
        idSum += itemsLocation[i].today;
        idSumYes += itemsLocation[i].yesterday;
        idSumMon += itemsLocation[i].monthly;
        idSumprevious += itemsLocation[i].previous;
        idSumGrossSale += itemsLocation[i].grossSale;
        idSumGp += itemsLocation[i].gpMargin;
        idSQFeetYeild += itemsLocation[i].sqFeetYeild;
        idRentRevenueRatio += itemsLocation[i].rentRevenueRatio;
    }

    // CSV
    const headers = [
        { label: "Location Name", key: "locationName" },
        { label: "Today", key: "today" },
        { label: "Yesterday", key: "yesterday" },
        { label: "Monthly", key: "monthly" },
        { label: "Previous Month", key: "previous" },
        { label: "Gross Sale", key: "grossSale" },
        { label: "GP Margin", key: "gpMargin" },
        { label: "SQFeetYeild", key: "sqFeetYeild" },
        { label: "RentRevenueRatio", key: "rentRevenueRatio" }

    ];

    const csvReport = {
        data: itemsLocation,
        headers: headers,
        filename: 'Location Summary.csv'
    };
    // console.log(LocationLabelsHook);
    // console.log(LocationValueHook);
    //CSV
    // COPY TO CLIPBOARD
    const [CopyModal, setCopyModal] = useState('Hiding');
    const copyTable = () => {
        const elTable = document.getElementById('Location-table-to-xls');

        let range, sel;

        // Ensure that range and selection are supported by the browsers
        if (document.createRange && window.getSelection) {

            range = document.createRange();
            sel = window.getSelection();
            // unselect any element in the page
            sel.removeAllRanges();

            try {
                range.selectNodeContents(elTable);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(elTable);
                sel.addRange(range);
            }

            document.execCommand('copy');
        }

        sel.removeAllRanges();

        setCopyModal('Show-Modal');

        setTimeout(() => {
            setCopyModal('Hiding');
        }, 2300);
    }
    const CopyModalData = itemsLocation.length;
    return isLoading ? (   //Checkif if is loading
        <Loader />
    ) : (
        <>
            {/* COPY MODAL */}
            <div id="datatables_buttons_info" className={`dt-button-info ${CopyModal}`} style={{}}><h2>Copy to clipboard</h2><div>{`Copied ${CopyModalData} rows to clipboard`}</div></div>



            <div className="dt-buttons btn-group " style={{ marginTop: '20px' }}>
                {/* copy btn */}
                <button className="btn btn-secondary buttons-copy buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0" onClick={copyTable}><span>Copy</span></button>
                <CSVLink {...csvReport}>  <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0"><span>CSV</span></button></CSVLink>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-secondary buttons-excel buttons-html5 ml-1"
                    table="Location-table-to-xls"
                    filename="Location Summary.xls"
                    sheet="Location Summaryxls"
                    buttonText="Excel" />
            </div>

            <div className='myTbl mt-5'>


                <div className="row">
                    <div className="col-md-12 col-sm-12" >
                        <div className="view">

                            <table className="table  table-hover table-bordered vertical-scrollable" id="Location-table-to-xls">
                                <thead id="tom">
                                    <tr>
                                        <th className="sticky-col first-col2 coltm4">Location Name</th>

                                        <th className="coltm4">Today</th>

                                        <th className="coltm4">Yesterday</th>

                                        <th className="coltm4">Monthly</th>

                                        <th className="coltm4">Previous Month</th>

                                        <th className="coltm4">Gross Sale</th>

                                        <th className="coltm4">GP Margin</th>

                                        <th className="coltm4">SQFeetYeild</th>

                                        <th className="coltm4">RentRevenueRatio</th>
                                    </tr>
                                </thead>
                                <tbody className="some" id="dome" style={{}}>

                                    {itemsLocation.map((item, index) => (   //here we map through the items
                                        <tr className='bg-white' key={index}>

                                            <td className="sticky-col first-col">{item.locationName}</td>


                                            <td className="text-center ind">{(item.today).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.yesterday).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.monthly).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.previous).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.grossSale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.gpMargin).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.sqFeetYeild).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.rentRevenueRatio).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            {/* <td className="text-center ind">{item.reduce((acc, curr) => acc + curr.today, 0)}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot >

                                    <tr className="">

                                        <td className="sticky-col first-col" id="color" >Total</td>

                                        <td id="color" style={{ textAlign: "center" }}>{(idSum).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        <td id="color" style={{ textAlign: "center" }}>{(idSumYes).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        <td id="color" style={{ textAlign: "center" }}>{(idSumMon).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        <td id="color" style={{ textAlign: "center" }}>{(idSumprevious).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        <td id="color" style={{ textAlign: "center" }}>{(idSumGrossSale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        <td id="color" style={{ textAlign: "center" }}>{(idSumGp).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        <td id="color" style={{ textAlign: "center" }}>{(idSQFeetYeild).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                        <td id="color" style={{ textAlign: "center" }}>{(idRentRevenueRatio).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                            <hr className="new1"/>





                    </div>

                </div>
            </div>
            {/* Chart */}
            <div className='top ' >
                <p className="text-center h4 ">Location Wise Category Detail Report</p>

                <div className="container-fluid mb-3 mt-5 alig top2 " >
                    <Chart
                        type="pie"
                        width={300}
                        height={320}

                        series={LocationValueHook}
                        options={{

                            noData: { text: "Loading...." },
                            // colors:["#f90000","#f0f"],
                            colors: ['#5E667F', '#19B28E', '#5E667F', '#FFD72F', '#592975', '#71CC81', '#199AA3'],
                            labels: LocationLabelsHook,
                            legend: {
                                show: false
                            },

                            dataLabels: {
                                enabled: true,
                                style:
                                    { fontSize: '11px', color: '#FFFFFF' },
                                formatter: function (value, opts) {
                                    return [opts.w.globals.labels[opts.seriesIndex] + '\n' + value.toFixed(1) + '%']
                                }
                            },


                        }}
                    >
                    </Chart>
                </div>
            </div>
        </>
    )

}

export default Location 