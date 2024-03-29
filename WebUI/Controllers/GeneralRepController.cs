﻿using Inv.DAL.Domain;
using Inv.DAL.Repository;
using Inv.WebUI.Reports.Forms;
using Inv.WebUI.Reports.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Web.Configuration;
using System;

namespace Inv.WebUI.Controllers
{//eslam 1 dec 2020
    public class GeneralRepController : ReportsPagePrintController
    {
        private readonly StdParamters CurrentReportParameters;
        private readonly ReportsDetails ReportsDetail = new ReportsDetails();
        private readonly ReportInfo Rep = new ReportInfo();
        private readonly ClassPrint Printer = new ClassPrint();

        protected InvEntities db = UnitOfWork.context(BuildConnectionString());

        public static string BuildConnectionString()
        {
            HttpClient httpClient = new HttpClient();
            string res = httpClient.GetStringAsync(WebConfigurationManager.AppSettings["ServiceUrl"] + "SystemTools/BuildConnection").Result;
            return res;
        }
         
        public string GetHtml(string DocPDFFolder , int success)
        {
             
            string Str = "";
            if (DocPDFFolder == "")
            {
                Str = Server.MapPath("/SavePath/");

            }
            else
            {
                Str = DocPDFFolder;

            }
            try
            {
                string html;
                if (success == 1)
                {
                    html = System.IO.File.ReadAllText(Str + "Result.html");
                }
                else
                {
                  html = System.IO.File.ReadAllText(Str + "HtmlErorr.html");

                }
                return html;
            }
            catch (Exception)
            {
                Str = Server.MapPath("/SavePath/"); 
                string html = System.IO.File.ReadAllText(Str + "HtmlErorr.html");
                return html;
            }
       

        } 

        //-----------------------------------------------------*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*----
         
             

        public string rptReceiptNote(RepFinancials rp)
        {  
             IEnumerable<IProc_Prnt_AccReceive_Result> que = Rpt_Prnt_AccReceive(rp);
             return buildReport(que);
        }
         
        public string rptAdjustNote(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_AccAdjust_Result> que = Rpt_Prnt_AccAdjust(rp);
            return buildReport(que);

        }

        public string IProc_Prnt_OperationCharges(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_OperationCharges_Result> que = Prnt_OperationCharges(rp);
            return buildReport(que);

        }

        public string rptInvoiceNote(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_SlsInvoice_Result> que = Rpt_Prnt_SlsInvoice(rp);
            return buildReport(que);

        }

        public string Prnt_OperationInvoice(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_SlsInvoice_Result> que = Rpt_Prnt_OperationInvoice(rp);
            return buildReport(que);

        }

        public string IProc_Prnt_OperationItems(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_OperationItems_Result> que = Prnt_OperationItems(rp);
            return buildReport(que); 
        }

        public string IProc_Prnt_OperationSalesmanItem(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_OperationSalesmanItem_Result> que = Prnt_OperationSalesmanItem(rp);
            return buildReport(que);

        }

        public string IProc_Rep_OperationSum(RepFinancials rp)
        { 
            IEnumerable<IProc_Rep_OperationSum_Result> que = Rep_OperationSum(rp);
            return buildReport(que);

        }

        public string IProc_Rep_salesrecord(RepFinancials rp)
        { 
            IEnumerable<IProc_Rep_OperationItemSales_Result> que = Rep_salesrecord(rp);
            return buildReport(que);

        }

        public string IProc_Prnt_OperationDeposit(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_OperationDeposit_Result> que = Prnt_OperationDeposit(rp);
            return buildReport(que);

        }

        public string rptInvoiceNoteRet(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_SlsInvoice_Result> que = Rpt_Prnt_SlsInvReturn(rp);
            return buildReport(que);

        }

        public string IProc_Prnt_PurReceive(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_PurReceive_Result> que = Rpt_Prnt_PurReceive(rp);
            return buildReport(que);

        }

        public string IProc_Prnt_PurReceiveRet(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_PurReceiveRet_Result> que = Prnt_PurReceiveRet(rp);
            return buildReport(que);

        }

        public string IProc_Prnt_PurReceivePrice(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_PurReceive_Result> que = Prnt_PurReceivePrice(rp);
            return buildReport(que); 
        }

        public string IProc_Prnt_VATPurReturn(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_VATPurReturn_Result> que = Prnt_VATPurReturn(rp);
            return buildReport(que); 
        }

        public string IProc_Prnt_SlsInvoice(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_SlsInvoice_Result> que = Rpt_Prnt_SlsInvoicepr(rp);
            return buildReport(que);
        }

        public string IProc_Rpt_AccCustomerSummary(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_AccCustomerSummary_Result> que = Rpt_AccCustomerSummary(rp);
            return buildReport(que);

        }

        public string IProc_Rpt_AccCustomerDetail(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_AccCustomerDetail_Result> que = Rpt_AccCustomerDetail(rp);
            return buildReport(que); 
        }

        public string IProc_Rpt_AccVendorDetail(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_AccVendorDetail_Result> que = Rpt_AccVendorDetail(rp);
            return buildReport(que);

        }

        public string IProc_Rpt_AccVendorSummary(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_AccVendorSummary_Result> que = Rpt_AccVendorSummary(rp);
            return buildReport(que);

        }

        public string IProc_Rpt_ItemStockSummary(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_ItemStockSummary_Result> que = Rpt_ItemStockSummary(rp);
            return buildReport(que); 
        }

        public string IProc_Rpt_ItemStockValue(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_ItemStockValue_Result> que = Rpt_ItemStockValue(rp);
            return buildReport(que);

        }

        public string IProc_Rpt_ItemStockIncome(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_ItemStockIncome_Result> que = Rpt_ItemStockIncome(rp);
            return buildReport(que); 
        } 

        public string AProc_Rpt_GLFinancialStatment(RepFinancials rp)
        { 
            if (rp.check == 0)
            {
                IEnumerable<AProc_Rpt_GLFinancialStatment_Result> que = Rpt_GLFinancialStatment(rp);
                return buildReport(que);
            } 
            else {  
            IEnumerable<AProc_Rpt_GLFinancialStatment_Result> que = Rpt_GLFinancialStatment_Lndscp(rp);
            return buildReport(que);
            } 
        } 

        public string AProc_Rpt_GLGeneralLedger(RepFinancials rp)
        { 
            IEnumerable<AProc_Rpt_GLGeneralLedger_Result> que = Rpt_GLGeneralLedger(rp);
            return buildReport(que);
        }

        public string AProc_Rpt_GLAccountStatment(RepFinancials rp)
        { 
            IEnumerable<AProc_Rpt_GLAccountStatment_Result> que = Rpt_GLAccountStatment(rp);
            return buildReport(que);
        }

        public string AProc_Prnt_JournalVoucher(RepFinancials rp)
        { 
            IEnumerable<AProc_Prnt_JournalVoucher_Result> que = Prnt_JournalVoucher(rp);
            return buildReport(que); 

        }

        public string IProc_Prnt_VATPurInvoice(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_VATPurInvoice_Result> que = Prnt_VATPurInvoice(rp);
            return buildReport(que);
        } 

        public string IProc_Prnt_PurPurchaseOrder(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_PurPurchaseOrder_Result> que = Prnt_PurPurchaseOrder(rp);
            return buildReport(que);
        }

        public string IProc_Prnt_StkTransfer(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_StkTransfer_Result> que = Prnt_StkTransfer(rp);
            return buildReport(que);
        }

        public string IProc_Prnt_StkAdjust(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_StkAdjust_Result> que = Prnt_StkAdjust(rp);
            return buildReport(que);
        }

        public string IProc_Prnt_OerationTf(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_OerationTf_Result> que = Prnt_OerationTf(rp);
            return buildReport(que); 
        }

        public string IProc_Prnt_VATSlsInvoice(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_VATSlsInvoice_Result> que = Prnt_VATSlsInvoice(rp);
            return buildReport(que);

        }

        public string IProc_Prnt_VATSlsInvoicePriceshow(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_VATSlsInvoice_Result> que = Prnt_VATSlsInvoice(rp);
            return buildReport(que);

        } 

        public string IProc_Rpt_AccVendorCollDetail(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_AccVendorCollDetail_Result> que = Rpt_AccVendorCollDetail(rp);
            return buildReport(que);

        } 

        public string IProc_Rpt_AccVendorCollSummary(RepFinancials rp)
        {  
            IEnumerable<IProc_Rpt_AccVendorCollSummary_Result> que = Rpt_AccVendorCollSummary(rp);
            return buildReport(que);
        } 

        public string IProc_Rpt_VatSalesSummary(RepFinancials rp)
        { 
            if (rp.check == 1)
            { 
                IEnumerable<IProc_Rpt_VatSalesSummary_Result> que = Rpt_VatSalesSummary(rp);
                return buildReport(que);
            }
            else
            { 
                IEnumerable<IProc_Rpt_VatSalesDetail_Result> que = Rpt_VatSalesDetail(rp);
                return buildReport(que);
            } 
        } 

        public string IProc_Rpt_VatPurchaseSummary(RepFinancials rp)
        { 
            if (rp.check == 1)
            { 
                IEnumerable<IProc_Rpt_VatPurchaseSummary_Result> que = Rpt_VatPurchaseSummary(rp);
                return buildReport(que);

            }
            else
            { 
                IEnumerable<IProc_Rpt_VatPurchaseDetail_Result> que = Rpt_VatPurchaseDetail(rp);
                return buildReport(que);

            }
        } 

        public string AProc_Prnt_CashVoucher(RepFinancials rp)
        { 
            IEnumerable<AProc_Prnt_CashVoucher_Result> que = Prnt_CashVoucher(rp);
            return buildReport(que);
        } 

        public string AProc_Rpt_GLDtCCenterStatmentSummary(RepFinancials rp)
        { 
            if (rp.check == 1)
            { 
                IEnumerable<AProc_Rpt_GLDtCCenterStatmentSummary_Result> que = Rpt_GLDtCCenterStatmentSummary(rp);
                return buildReport(que);
            }
            else
            { 
                IEnumerable<AProc_Rpt_GLDtCCenterStatmentDetail_Result> que = Rpt_GLDtCCenterStatmentDetail(rp);
                return buildReport(que);
            }

        } 

        public string IProc_Prnt_VATReport(RepFinancials rp)
        {  
            IEnumerable<IProc_Prnt_VATReport_Result> que = Prnt_VATReport(rp);
            return buildReport(que);
        }

        public string IProc_Rpt_AccBoxSummary(RepFinancials rp)
        {  
            IEnumerable<IProc_Rpt_AccBoxSummary_Result> que = Rpt_AccBoxSummary(rp);
            return buildReport(que);
        }

        public string IProc_Rpt_AccBoxDetail(RepFinancials rp)
        { 
            IEnumerable<IProc_Rpt_AccBoxDetail_Result> que = Rpt_AccBoxDetail(rp);
            return buildReport(que);
        }

        public string IProc_Rep_OperationScrap(RepFinancials rp)
        { 
            IEnumerable<IProc_Rep_OperationScrap_Result> que = Rep_OperationScrap(rp);
              return buildReport(que);
        }

        public string IProc_Prnt_Collect(RepFinancials rp)
        { 
            IEnumerable<IProc_Prnt_Collect_Result> que = Prnt_Collect(rp);
            return buildReport(que);
        }

        public string IProc_Prnt_StkIssue(RepFinancials rp)
        {
            IEnumerable<IProc_Prnt_StkIssue_Result> que = Prnt_StkIssue(rp);
            return buildReport(que);
        }


    }
}