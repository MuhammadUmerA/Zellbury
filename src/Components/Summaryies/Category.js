import React, { useState } from "react";
import Chart from "react-apexcharts";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from '../Loader'

function Category({ itemsCategory, isLoading, CategoryValueHook, CategorylabelHook }) {



    // Today

    let idSum = 0;
    let idSumTodayQty = 0;
    let idSumYes = 0;
    let idSumYesQty = 0;
    let idSumMon = 0;
    let idSumMonQty = 0;
    let idSumpreMon = 0;
    let idSumpreMonQty = 0;
    let idSumGrossSale = 0;
    let idSumGp = 0;


    for (let i = 0; itemsCategory && i < itemsCategory.length; i++) {
        idSum += itemsCategory[i].today;
        idSumTodayQty += itemsCategory[i].todayQty;
        idSumYes += itemsCategory[i].yesterday;
        idSumYesQty += itemsCategory[i].yesterdayQty;
        idSumMon += itemsCategory[i].monthly;
        idSumMonQty += itemsCategory[i].monthlyQty;
        idSumpreMon += itemsCategory[i].previous;
        idSumpreMonQty += itemsCategory[i].previousQty;
        idSumGrossSale += itemsCategory[i].grossSale;
        idSumGp += itemsCategory[i].gpMargin;
    }




    // CSV
    const headers = [
        { label: "Department Name", key: "categoryName" },
        { label: "Today", key: "today" },
        { label: "Today Qty", key: "todayQty" },
        { label: "Yesterday", key: "yesterday" },
        { label: "Yesterday Qty", key: "yesterdayQty" },
        { label: "Monthly", key: "monthly" },
        { label: "Monthly Qty", key: "monthlyQty" },
        { label: "Previous Month", key: "previous" },
        { label: "Previous Month Qty", key: "previousQty" },
        { label: "Gross Sale", key: "grossSale" },
        { label: "GP Margin", key: "gpMargin" }

    ];

    const csvReport = {
        data: itemsCategory,
        headers: headers,
        filename: 'Category Summary.csv'
    };
    //CSV

    // COPY TO CLIPBOARD
    // COPY TO CLIPBOARD
    const [CopyModal, setCopyModal] = useState('Hiding');
    const copyTable = () => {
        const elTable = document.getElementById('table-Category');

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
    const CopyModalData = itemsCategory.length;
    return isLoading ? (   //Checkif if is loading
        <Loader />
    ) : (
        <>
            {/* COPY MODAL */}
            <div id="datatables_buttons_info" className={`dt-button-info ${CopyModal}`} style={{}}><h2>Copy to clipboard</h2><div>{`Copied ${CopyModalData} rows to clipboard`}</div></div>
            <h4 className='mt-4'>Category Summary</h4>
            <hr className="mx-1" />
            <div className="dt-buttons btn-group " style={{marginTop:'20px'}}>
                <button className="btn btn-secondary buttons-copy buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0" onClick={copyTable}><span>Copy</span></button>
                <CSVLink {...csvReport}>  <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0"><span>CSV</span></button></CSVLink>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-secondary buttons-excel buttons-html5 ml-1"
                    table="table-Category"
                    filename="Category Summary.xls"
                    sheet="Category Summaryxls"
                    buttonText="Excel" />



            </div>

            <div className='myTbl mt-5'>
               

                <div className="row">
                    <div className="col-md-12 col-sm-12" >
                        <div className="view">
                     
                                <table className="table  table-hover table-bordered" id="table-Category">
                                    <thead id="tom">
                                        <tr>
                                            <th className="sticky-col first-col2 coltm4">Category Name</th>

                                            <th className="coltm4">Today</th>

                                            <th className="coltm4">Today Qty</th>

                                            <th className="coltm4">Yesterday</th>

                                            <th className="coltm4">Yesterday Qty</th>

                                            <th className="coltm4">Monthly</th>

                                            <th className="coltm4">Monthly Qty</th>

                                            <th className="coltm4">Previous Month</th>

                                            <th className="coltm4">Previous Month Qty</th>

                                            <th className="coltm4">Gross Sale</th>

                                            <th className="coltm4">Gp Margin</th>
                                        </tr>
                                    </thead>
                                    <tbody className="some" id="dome" style={{}}>

                                        {itemsCategory.map((item, index) => (   //here we map through the items
                                            <tr className='bg-white' key={index}>

                                                <td className="sticky-col first-col">{item.categoryName}</td>


                                                <td className="text-center ind">{(item.today).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.todayQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.yesterday).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.yesterdayQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.monthly).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.monthlyQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.previous).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.previousQty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.grossSale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                                <td className="text-center ind">{(item.gpMargin).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
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

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumGrossSale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td id="color" style={{ textAlign: "center" }}>{(idSumGp).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

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
                <p className="text-center h4 ">Category Wise Category Detail Report</p>

                <div className="container-fluid mb-3 mt-5 alig top2" >
                    <Chart
                        type="pie"
                        width={300}
                        height={320}

                        series={CategoryValueHook}
                        options={{

                            noData: { text: "Loading...." },
                            // colors:["#f90000","#f0f"],
                            colors: ['#5E667F', '#19B28E', '#5E667F', '#FFD72F', '#592975', '#71CC81', '#199AA3'],
                            labels: CategorylabelHook,
                            legend: {
                                show: false
                            },

                            dataLabels: {
                                enabled: true,
                                textAnchor: 'middle',
                                style:
                                    { fontSize: '13px', color: '#FFFFFF' },
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
export default Category