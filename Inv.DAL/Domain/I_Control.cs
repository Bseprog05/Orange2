//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inv.DAL.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class I_Control
    {
        public int CompCode { get; set; }
        public Nullable<int> DefSlsVatType { get; set; }
        public Nullable<int> DefPurVatType { get; set; }
        public Nullable<bool> IsVat { get; set; }
        public Nullable<int> MobileLength { get; set; }
        public Nullable<int> IDLength { get; set; }
        public Nullable<bool> SendSMS { get; set; }
        public Nullable<bool> SendPublicSMS { get; set; }
        public Nullable<int> NotePeriodinSec { get; set; }
        public Nullable<int> DashBoardPeriodinSec { get; set; }
        public Nullable<int> MaxYearlyMSGs { get; set; }
        public Nullable<int> UsedMSGs { get; set; }
        public Nullable<int> UserTimeZoneUTCDiff { get; set; }
        public Nullable<int> ServerTimeZoneUTCDiff { get; set; }
        public Nullable<int> SaudiNationID { get; set; }
        public Nullable<bool> WebCustomerWebsite { get; set; }
        public Nullable<System.DateTime> MembeshiptStartDate { get; set; }
        public Nullable<System.DateTime> MembeshipEndDate { get; set; }
        public Nullable<int> MembershipAllanceDays { get; set; }
        public Nullable<int> MembershipreadOnlyDays { get; set; }
        public Nullable<bool> IsFreePurchaseReturn { get; set; }
        public Nullable<bool> IsFreeSalesReturn { get; set; }
        public string ExceedMinPricePassword { get; set; }
        public Nullable<int> GL_VoucherCCType { get; set; }
        public Nullable<int> Gl_JournalOpenType { get; set; }
        public Nullable<bool> GL_JournalMonthlyNo { get; set; }
        public Nullable<int> GL_JournalMonthlyNoWidth { get; set; }
        public Nullable<bool> GL_JournalSaveUnbalanced { get; set; }
        public Nullable<bool> IsLocalBranchCustomer { get; set; }
        public Nullable<int> SysTimeOut { get; set; }
        public Nullable<int> NationalityID { get; set; }
        public Nullable<int> Currencyid { get; set; }
        public Nullable<int> InvoiceTypeCode { get; set; }
        public Nullable<int> InvoiceTransCode { get; set; }
        public Nullable<bool> InvoiceWithoutCust { get; set; }
        public Nullable<bool> IvoiceDateEditable { get; set; }
        public Nullable<bool> InvoiceLineDiscount { get; set; }
        public Nullable<bool> InvoiceLineAllowance { get; set; }
        public Nullable<bool> InvoiceTotalAllowance { get; set; }
        public Nullable<bool> InvoiceTotalCharge { get; set; }
        public Nullable<bool> OperationPriceWithVAT { get; set; }
        public Nullable<bool> SalesPriceWithVAT { get; set; }
        public string DocPDFFolder { get; set; }
        public Nullable<int> GL_VoucherCCDT_Type { get; set; }
        public Nullable<bool> ISCustVendorInGL { get; set; }
        public Nullable<bool> AutoupdateSalesPrice { get; set; }
        public Nullable<decimal> SalePriceAddPerc { get; set; }
        public Nullable<decimal> SalePriceMinAddPerc { get; set; }
        public Nullable<bool> IsLocalSalePrice { get; set; }
        public Nullable<bool> IsLocalCost { get; set; }
        public Nullable<bool> IsRetailCashInvoiceDefAuth { get; set; }
        public Nullable<bool> IsRetailCreditInvoiceDefAuth { get; set; }
        public Nullable<bool> IsProcessCashInvoiceDefAuth { get; set; }
        public Nullable<bool> IsProcessCreditInvoiceDefAuth { get; set; }
        public Nullable<bool> IsAccPeriodClose { get; set; }
        public Nullable<bool> IsInvPeriodClose { get; set; }
        public Nullable<bool> IsFasPeriodClose { get; set; }
    }
}