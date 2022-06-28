import React, { useState } from "react";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from '../Loader'
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

function Department({ isLoading, itemsDepartment, DepartmentlabelHook }) {

  const options = {

    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },


    colors: ['#293462', '#216583', '#00818a', '#f7be16', '#454d66', '#009975', '#58b368', '#d9d872', '#ccc', '#aaa'],

    title: {
      text: 'Department Wise Detail Report'
    },

    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',

    },
    //colors: ['#25749a', '#ee6c01', '#ee6c01'],

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',

          style: {
            fontSize: '10px',
          },

        },
        showInLegend: false
      },

    },


    series: [
      {
        name: 'Location',
        data: DepartmentlabelHook
      }],

  };
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




  for (let i = 0; itemsDepartment && i < itemsDepartment.length; i++) {
    idSum += itemsDepartment[i].today;
    idSumTodayQty += itemsDepartment[i].todayQty;
    idSumYes += itemsDepartment[i].yesterday;
    idSumYesQty += itemsDepartment[i].yesterdayQty;
    idSumMon += itemsDepartment[i].monthly;
    idSumMonQty += itemsDepartment[i].monthlyQty;
    idSumpreMon += itemsDepartment[i].previous;
    idSumpreMonQty += itemsDepartment[i].previousQty;
    idSumGrossSale += itemsDepartment[i].grossSale;
    idSumGp += itemsDepartment[i].gpMargin;
  }

  // CSV
  const headers = [
    { label: "Department Name", key: "departmentName" },
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
    data: itemsDepartment,
    headers: headers,
    filename: 'Department Summary.csv'
  };
  //CSV
  // COPY TO CLIPBOARD
  const [CopyModal, setCopyModal] = useState('Hiding');
  const copyTable = () => {
    const elTable = document.getElementById('Department-table-to-xls');

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
    }, 2100);
  }
  const CopyModalData = itemsDepartment.length;
  return isLoading ? (   //Checkif if is loading
    <Loader />
  ) : (
    <>
      {/* COPY MODAL */}
      <div id="datatables_buttons_info" className={`dt-button-info ${CopyModal}`} style={{}}><h2>Copy to clipboard</h2><div>{`Copied ${CopyModalData} rows to clipboard`}</div></div>
      <h4 className='mt-4'>Department Summary</h4>
      <hr className="mx-1" />
      <div className="dt-buttons btn-group " style={{ marginTop: '20px' }}>
        <button className="btn btn-secondary buttons-copy buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0" onClick={copyTable}><span>Copy</span></button>
        <CSVLink {...csvReport}>  <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="DataTables_Table_0"><span>CSV</span></button></CSVLink>

        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button btn btn-secondary buttons-excel buttons-html5 ml-1"
          table="Department-table-to-xls"
          filename="Department Summary.xls"
          sheet="Department Summaryxls"
          buttonText="Excel" />



      </div>
      <div className='myTbl mt-5'>


        <div className="row">
          <div className="col-md-12 col-sm-12" >
            <div className="view">

              <table className="table  table-hover table-bordered" id="Department-table-to-xls">
                <thead id="tom">
                  <tr>
                    <th className="sticky-col first-col2 coltm4">Department&nbsp;Name</th>

                    <th className="coltm4">Today</th>

                    <th className="coltm4">Today&nbsp;Qty</th>

                    <th className="coltm4">Yesterday</th>

                    <th className="coltm4">Yesterday&nbsp;Qty</th>

                    <th className="coltm4">Monthly</th>

                    <th className="coltm4">Monthly&nbsp;Qty</th>

                    <th className="coltm4">Previous&nbsp;Month</th>

                    <th className="coltm4">Previous&nbsp;Month&nbsp;Qty</th>

                    <th className="coltm4">Gross&nbsp;Sale</th>

                    <th className="coltm4">Gp&nbsp;Margin</th>
                  </tr>
                </thead>
                <tbody className="some" id="dome" style={{}}>

                  {itemsDepartment.map((item, index) => (   //here we map through the items
                    <tr className='bg-white' key={index}>

                      <td className="sticky-col first-col">{item.departmentName}</td>


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

                    <td id="color" style={{ textAlign: "center" }}>{(idSumGrossSale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                    <td id="color" style={{ textAlign: "center" }}>{(idSumGp).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>

                  </tr>
                </tfoot>
              </table>


            </div>


            <hr className="new1" />

          </div>

        </div>
      </div>
      {/* Chart */}
      <div className="LocationChart">

        <PieChart highcharts={Highcharts} options={options} />
      </div>

    </>
  )

}

export default Department