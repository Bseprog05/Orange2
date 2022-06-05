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
    
    public partial class A_RecPay_Tr_Adjustment
    {
        public int AdjustmentID { get; set; }
        public Nullable<int> AdustmentTypeID { get; set; }
        public Nullable<bool> IsDebit { get; set; }
        public Nullable<bool> IsCustomer { get; set; }
        public Nullable<int> VendorId { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public string TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string TrDateH { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public Nullable<int> VatType { get; set; }
        public Nullable<decimal> VatAmount { get; set; }
        public Nullable<decimal> NetAfterVAT { get; set; }
        public string AdjustDescA { get; set; }
        public string AdjustDescE { get; set; }
        public Nullable<bool> IsPosted { get; set; }
        public Nullable<int> VoucherNo { get; set; }
        public Nullable<byte> VoucherType { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<int> BranchCode { get; set; }
        public Nullable<int> InvoiceID { get; set; }
        public Nullable<decimal> InvTotalAmount { get; set; }
        public Nullable<decimal> InvVatAmount { get; set; }
        public Nullable<decimal> InvDiscountAmount { get; set; }
        public Nullable<decimal> InvDiscountPrc { get; set; }
        public Nullable<decimal> InvNetAfterVat { get; set; }
        public string DocNo { get; set; }
        public string DocUUID { get; set; }
        public Nullable<System.TimeSpan> TrTime { get; set; }
        public string CryptographicStamp { get; set; }
        public Nullable<int> CRDBReasoncode { get; set; }
        public string PrevInvoiceHash { get; set; }
    }
}