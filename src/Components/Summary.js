import React, { useState } from "react";
import Chart from "react-apexcharts";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from './Loader'

function Summary({ items, isLoading, previousYearMonthnetSale, monthlynetSale }) {


    // date

    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const current = new Date();
    const ChartDate = `${current.getDate()}-${monthArray[current.getMonth()]}-${current.getFullYear()}`;
    const ChartDatePrevious = `${current.getDate()}-${monthArray[current.getMonth()]}-${current.getFullYear() - 1}`;

    // CSV
    const headers = [
        { label: "Description", key: "description" },
        { label: "Gross Sale", key: "grossSale" },
        { label: "Net Sale", key: "netSale" },
        { label: "Qty", key: "qty" },
        { label: "Discount", key: "sales" },
        { label: "Sales Return", key: "salesReturn" },
        { label: "Total Bills", key: "totalBills" },
        { label: "Average Bill", key: "averageBill" },
        { label: "GP Margin", key: "gpMargin" }

    ];

    const csvReport = {
        data: items,
        headers: headers,
        filename: 'Sales Summary.csv'
    };
    //CSV

    // COPY TO CLIPBOARD
    const [CopyModal, setCopyModal] = useState('Hiding');
    const copyTable = () => {
        const elTable = document.getElementById('tableS');

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
    const CopyModalData = items.length;
    return isLoading ? (   //Checkif if is loading
        <Loader />
    ) : (
        <>
            {/* COPY MODAL */}
            <div id="datatables_buttons_info" className={`dt-button-info ${CopyModal}`} style={{}}><h2>Copy to clipboard</h2><div>{`Copied ${CopyModalData} rows to clipboard`}</div></div>

            {/* Buttons */}

            {/* table */}

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8" >
                    <div className="dt-buttons btn-group " style={{ marginTop: '20px' }}>
                        <button className="btn btn-secondary buttons-copy buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0" onClick={copyTable}><span>Copy</span></button>
                        <CSVLink {...csvReport}>  <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0"><span>CSV</span></button></CSVLink>

                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-secondary buttons-excel buttons-html5 ml-1"
                            table="tableS"
                            filename="Sales Summary.xls"
                            sheet="Sales Summaryxls"
                            buttonText="Excel" />



                    </div>  
                    <div className="mt-5"></div>
                    <div className="viewSalesSummary">
                        <div className="wrapperSalesSummary">
                            <table className="table  table-hover table-bordered" id="tableS">
                                <thead >
                                    <tr>
                                        <th className="sticky-colSalesSummary first-col2SalesSummary coltm4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>

                                        <th className="coltm4">Gross&nbsp;Sale</th>

                                        <th className="coltm4">Net&nbsp;Sale</th>

                                        <th className="coltm4">Qty</th>

                                        <th className="coltm4">Discount</th>

                                        <th className="coltm4">Sales&nbsp;Return</th>

                                        <th className="coltm4">Total&nbsp;Bills</th>

                                        <th className="coltm4">Average&nbsp;Bill</th>

                                        <th className="coltm4">GP&nbsp;Margin</th>
                                    </tr>
                                </thead>
                                <tbody className="some" id="dome" style={{}}>

                                    {items.map((item, index) => (   //here we map through the items
                                        <tr className='bg-white' key={index}>

                                            <td className="sticky-colSalesSummary first-colSalesSummary">{item.description}</td>


                                            <td className="text-center ind">{(item.grossSale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.netSale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.qty).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.sales).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.salesReturn).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.totalBills).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.averageBill).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                            <td className="text-center ind">{(item.gpMargin).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                                        </tr>
                                    ))}




                                </tbody>
                            </table>



                        </div>
                    </div>



                </div>

                {/* chart */}

                <div className='col-md-4 col-sm-12 mobile-margin '>
                    <div className=" mb-5" id="MobNone">
                        <Chart
                            type="bar"
                            width={375}
                            height={420}
                            series={[
                                {
                                    data: [previousYearMonthnetSale, monthlynetSale],
                                },
                            ]}
                            options={{
                                title: {
                                    style: { fontSize: 13 },
                                },
                                theme: { mode: "light" },
                                xaxis: {
                                    categories: [
                                        ChartDatePrevious,
                                        ChartDate
                                    ],
                                    colors: ["#87CEEB"],
                                },

                                yaxis: {
                                    labels: {

                                        formatter: (val) => {
                                            return `${val.toLocaleString()}`;
                                        },

                                        style: { fontSize: "10", colors: ["black"] },
                                    },

                                },

                                legend: {
                                    show: true,
                                    position: "right",
                                },

                                dataLabels: {
                                    formatter: (val) => {
                                        return `${val.toLocaleString()}`;
                                    },
                                    style: {
                                        colors: ["#f4f4f4"],
                                        fontSize: 13,
                                    },
                                },
                            }}
                        ></Chart>
                    </div>
                    <div className="container mb-5 " id="PcNone">
                        <br />
                        <Chart
                            type="bar"
                            width={420}
                            height={420}
                            series={[
                                {
                                    data: [previousYearMonthnetSale, monthlynetSale],
                                },
                            ]}
                            options={{
                                title: {
                                    style: { fontSize: 13 },
                                },
                                theme: { mode: "light" },
                                xaxis: {
                                    categories: [
                                        ChartDatePrevious,
                                        ChartDate
                                    ],
                                    colors: ["#87CEEB"],
                                },

                                yaxis: {
                                    labels: {

                                        formatter: (val) => {
                                            return `${val.toLocaleString()}`;
                                        },

                                        style: { fontSize: "12", fontWeight: "Bold", colors: ["black"] },
                                    },

                                },

                                legend: {
                                    show: true,
                                    position: "right",
                                },

                                dataLabels: {
                                    formatter: (val) => {
                                        return `${val.toLocaleString()}`;
                                    },
                                    style: {
                                        colors: ["#f4f4f4"],
                                        fontSize: 14,
                                    },
                                },
                            }}
                        ></Chart>
                    </div>
                </div>

            </div>



        </>
    )
}

export default Summary