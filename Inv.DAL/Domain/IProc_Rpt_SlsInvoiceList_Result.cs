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
    
    public partial class IProc_Rpt_SlsInvoiceList_Result
    {
        public Nullable<int> Comp { get; set; }
        public Nullable<int> Bra { get; set; }
        public string CompNameA { get; set; }
        public string CompNameE { get; set; }
        public string BraNameA { get; set; }
        public string BraNameE { get; set; }
        public string LoginUser { get; set; }
        public System.DateTime PrintDate { get; set; }
        public Nullable<int> Par_RepType { get; set; }
        public string Par_StatusDSA { get; set; }
        public string Par_StatusDSE { get; set; }
        public string Par_CashTypeDSA { get; set; }
        public string Par_CashTypeDSE { get; set; }
        public string Par_CustDSA { get; set; }
        public string Par_CustDSE { get; set; }
        public string Par_SalesmanDSA { get; set; }
        public string Par_SalesmanDSE { get; set; }
        public string Par_FromDate { get; set; }
        public string Par_Todate { get; set; }
        public string par_op_TRNo { get; set; }
        public string par_op_shipno { get; set; }
        public int InvoiceID { get; set; }
        public Nullable<int> TrNo { get; set; }
        public string RefNO { get; set; }
        public Nullable<int> RefTrID { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string TrDateH { get; set; }
        public Nullable<int> TrType { get; set; }
        public Nullable<bool> IsCash { get; set; }
        public Nullable<int> SlsInvType { get; set; }
        public Nullable<int> SlsInvSrc { get; set; }
        public Nullable<int> CashBoxID { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public string Cust_nameA { get; set; }
        public string Cust_nameE { get; set; }
        public Nullable<int> SalesmanId { get; set; }
        public Nullable<int> StoreId { get; set; }
        public Nullable<int> OperationId { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<decimal> VatAmount { get; set; }
        public Nullable<int> VatType { get; set; }
        public Nullable<decimal> DiscountAmount { get; set; }
        public Nullable<decimal> DiscountPrc { get; set; }
        public Nullable<decimal> NetAfterVat { get; set; }
        public Nullable<decimal> CommitionAmount { get; set; }
        public Nullable<decimal> CashAmount { get; set; }
        public Nullable<decimal> CardAmount { get; set; }
        public Nullable<decimal> BankTfAmount { get; set; }
        public string BankAccount { get; set; }
        public Nullable<decimal> TotalPaidAmount { get; set; }
        public Nullable<decimal> RemainAmount { get; set; }
        public string Remark { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<bool> IsPosted { get; set; }
        public Nullable<int> VoucherNo { get; set; }
        public Nullable<byte> VoucherType { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<int> BranchCode { get; set; }
        public string Slsm_Code { get; set; }
        public string Slsm_DescA { get; set; }
        public string Slsm_DescE { get; set; }
        public string Cus_Code { get; set; }
        public string Box_DescA { get; set; }
        public string Box_DescE { get; set; }
        public Nullable<int> Line_Count { get; set; }
        public Nullable<int> Item_Count { get; set; }
        public Nullable<decimal> Tot_Qty { get; set; }
        public Nullable<decimal> Tot_Amount { get; set; }
        public Nullable<decimal> Tot_VAT { get; set; }
        public Nullable<decimal> Tot_Net { get; set; }
        public Nullable<decimal> tot_RetQty { get; set; }
        public Nullable<int> Ref_TrNo { get; set; }
        public Nullable<System.DateTime> Ref_TrDate { get; set; }
        public Nullable<int> op_TrNo { get; set; }
        public Nullable<System.DateTime> Op_TrDate { get; set; }
        public string Op_TruckNo { get; set; }
        public string Op_RefNo { get; set; }
        public string RefNO1 { get; set; }
        public string Sper_code { get; set; }
        public string Sper_nameE { get; set; }
        public string SPer_NameA { get; set; }
    }
}