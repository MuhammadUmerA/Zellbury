import React, { useState } from "react";
import Chart from "react-apexcharts";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from '../Loader'


function Production({ isLoading, itemsProduction, ProductionValueHook, ProductionlabelHook }) {






    let idSum = 0;
    let idSumTodayQty = 0;
    let idSumYes = 0;
    let idSumYesQty = 0;
    let idSumMon = 0;
    let idSumMonQty = 0;
    let idSumpreMon = 0;
    let idSumpreMonQty = 0;

    for (let i = 0; itemsProduction && i < itemsProduction.length; i++) {
        idSum += itemsProduction[i].today;
        idSumTodayQty += itemsProduction[i].todayQty;
        idSumYes += itemsProduction[i].yesterday;
        idSumYesQty += itemsProduction[i].yesterdayQty;
        idSumMon += itemsProduction[i].monthly;
        idSumMonQty += itemsProduction[i].monthlyQty;
        idSumpreMon += itemsProduction[i].previous;
        idSumpreMonQty += itemsProduction[i].previousQty;
    }


    // CSV
    const headers = [
        { label: "Production Year", key: "attribute2Name" },
        { label: "Today", key: "today" },
        { label: "Today Qty", key: "todayQty" },
        { label: "Yesterday", key: "yesterday" },
        { label: "Yesterday Qty", key: "yesterdayQty" },
        { label: "Monthly", key: "monthly" },
        { label: "Monthly Qty", key: "monthlyQty" },
        { label: "Previous Month", key: "previous" },
        { label: "Previous Month Qty", key: "previousQty" }

    ];

    const csvReport = {
        data: itemsProduction,
        headers: headers,
        filename: 'production Year Summary.csv'
    };
    //CSV
    // COPY TO CLIPBOARD
    const [CopyModal, setCopyModal] = useState('Hiding');
    const copyTable = () => {
        const elTable = document.getElementById('ProductionYear-table-to-xls');

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
    const CopyModalData = itemsProduction.length;
    return isLoading ? (   //Checkif if is loading
        <Loader />
    ) : (
        <>
            {/* COPY MODAL */}
            <div id="datatables_buttons_info" className={`dt-button-info ${CopyModal}`} style={{}}><h2>Copy to clipboard</h2><div>{`Copied ${CopyModalData} rows to clipboard`}</div></div>
            <h4 className='mt-4'>Production Year Summary</h4>
            <hr className="mx-1" />
           <div className="dt-buttons btn-group " style={{marginTop:'20px'}}>
                <button className="btn btn-secondary buttons-copy buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0" onClick={copyTable}><span>Copy</span></button>
                <CSVLink {...csvReport}>  <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0"><span>CSV</span></button></CSVLink>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-secondary buttons-excel buttons-html5 ml-1"
                    table="ProductionYear-table-to-xls"
                    filename="Production Year Summary.xls"
                    sheet="Production Year Summaryxls"
                    buttonText="Excel" />



            </div>

            <div className='myTbl mt-5'>
               

                <div className="row">
                    <div className="col-md-12 col-sm-12" >
                        <div className="view">
                          
                                <table className="table  table-hover table-bordered" id="ProductionYear-table-to-xls">
                                    <thead id="tom">
                                        <tr>
                                            <th className="sticky-col first-col2 coltm4">Production Year </th>

                                            <th className="coltm4">Today</th>

                                            <th className="coltm4">Today Qty</th>

                                            <th className="coltm4">Yesterday</th>

                                            <th className="coltm4">Yesterday Qty</th>

                                            <th className="coltm4">Monthly</th>

                                            <th className="coltm4">Monthly Qty</th>

                                            <th className="coltm4">Previous Month</th>

                                            <th className="coltm4">Previous Month Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody className="some" id="dome" style={{}}>

                                        {itemsProduction.map((item, index) => (   //here we map through the items
                                            <tr className='bg-white' key={index}>

                                                <td className="sticky-col first-col">{item.attribute2Name}</td>


                                                <td className="text-center ind">{(item.today).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.todayQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.yesterday).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.yesterdayQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.monthly).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.monthlyQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.previous).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.previousQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>


                                                {/* <td className="text-center ind">{item.reduce((acc, curr) => acc + curr.today, 0)}</td> */}
                                            </tr>
                                        ))}

                                        


                                    </tbody>
                                    <tfoot>
                                    <tr >  
                                            <td className="sticky-col first-col" id="color">Total</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSum).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumTodayQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumYes).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumYesQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumMon).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumMonQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumpreMon).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumpreMonQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>


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
                <p className="text-center h4 ">Production Year Wise Category Detail Report</p>

                <div className="container-fluid mb-3 mt-5 alig top2" >
                    <Chart
                        type="pie"
                        width={300}
                        height={320}

                        series={ProductionValueHook}

                        options={{

                            noData: { text: "Loading...." },
                            // colors:["#f90000","#f0f"],
                            colors: ['#5E667F', '#19B28E', '#5E667F', '#FFD72F', '#592975', '#71CC81', '#199AA3'],
                            labels: ProductionlabelHook,
                            legend: {
                                show: false
                            },

                            dataLabels: {
                                enabled: true,
                                textAnchor: 'middle',
                                style:
                                    { fontSize: '14px', color: '#FFFFFF' },
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

export default Production