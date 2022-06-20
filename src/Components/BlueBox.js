import React from "react";

import Loader from './Loader'
// import Loader from "./Loader";

const BlueBox = ({ isLoading, blueBoxData }) => {

    return isLoading ? (   //Checkif if is loading
        <Loader />
    ) : (
        <>
            {blueBoxData.map((item, index) => (
                < div className="row" key={item._todaySale}>
                    <div className="col-xl-4 col-12">

                        <div className="small-box box-info bg-info" data-overlay={5}>
                            <div className="inner">
                                <h4 style={{ fontSize: '2em', fontFamily: 'calibri', textDecoration: 'underline' }}>Today Sale</h4>
                                <h4 className="bottt mt-5" style={{ fontSize: '2em', fontFamily: 'calibri', fontWeight: 'bold' }}>{(item._todaySale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
                            </div>
                            <div className="p-15">
                                <div className="font-size-16 flexbox align-items-center">
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold"> Retail</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesRtAmount" cssclass="text-bold" />{(item._todayRt).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="font-size-16 flexbox align-items-center" style={{ marginTop: '3%' }}>
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold">Online</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesOnlAmount" cssclass="text-bold" />{(item._todayOn).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="font-size-16 flexbox align-items-center" style={{ marginTop: '3%' }}>
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold">Wholesale</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesWsAmount" cssclass="text-bold" />{(item._todayWs).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            <div className="icon text-white">
                                <i className="fa fa-bar-chart" />
                            </div>
                            <a href="#" className="small-box-footer">More info<i className="fa fa-arrow-right" /></a>
                        </div>
                    </div>

                    {/* yesterday sale box */}
                    <div className="col-xl-4 col-12">

                        <div className="small-box box-info bg-info" data-overlay={5}>
                            <div className="inner">
                                <h4 style={{ fontSize: '2em', fontFamily: 'calibri', textDecoration: 'underline' }}>Yesterday Sale</h4>
                                <h4 className="bottt mt-5" style={{ fontSize: '2em', fontFamily: 'calibri', fontWeight: 'bold' }}>{(item._yesterdaySale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
                            </div>
                            <div className="p-15">
                                <div className="font-size-16 flexbox align-items-center">
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold"> Retail</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesRtAmount" cssclass="text-bold" />{(item._yesterdayRt).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="font-size-16 flexbox align-items-center" style={{ marginTop: '3%' }}>
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold">Online</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesOnlAmount" cssclass="text-bold" />{(item._yesterdayOn).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="font-size-16 flexbox align-items-center" style={{ marginTop: '3%' }}>
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold">Wholesale</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesWsAmount" cssclass="text-bold" />{(item._yesterdayWs).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            <div className="icon text-white">
                                <i className="fa fa-bar-chart" />
                            </div>
                            <a href="#" className="small-box-footer">More info<i className="fa fa-arrow-right" /></a>
                        </div>
                    </div>

                    {/* month sale box */}
                    <div className="col-xl-4 col-12">

                        <div className="small-box box-info bg-info" data-overlay={5}>
                            <div className="inner">
                                <h4 style={{ fontSize: '2em', fontFamily: 'calibri', textDecoration: 'underline' }}>Month To Date Sale</h4>
                                <h4 className="bottt mt-5" style={{ fontSize: '2em', fontFamily: 'calibri', fontWeight: 'bold' }}>{(item._monthSale).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h4>
                            </div>
                            <div className="p-15">
                                <div className="font-size-16 flexbox align-items-center">
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold"> Retail</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesRtAmount" cssclass="text-bold" />{(item._monthRt).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="font-size-16 flexbox align-items-center" style={{ marginTop: '3%' }}>
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold">Online</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesOnlAmount" cssclass="text-bold" />{(item._monthOn).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="font-size-16 flexbox align-items-center" style={{ marginTop: '3%' }}>
                                    <span> <label style={{ fontSize: '1.4em' }} cssclass="text-bold">Wholesale</label></span>
                                    <span style={{ fontSize: '1.4em' }}> <label id="tdySalesWsAmount" cssclass="text-bold" />{(item._monthWs).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                            <div className="icon text-white">
                                <i className="fa fa-bar-chart" />
                            </div>
                            <a href="#" className="small-box-footer">More info<i className="fa fa-arrow-right" /></a>
                        </div>
                    </div>
                </div >
            ))}


        </>
    )




}

export default BlueBox