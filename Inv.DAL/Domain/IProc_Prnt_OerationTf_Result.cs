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
    
    public partial class IProc_Prnt_OerationTf_Result
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
        public Nullable<int> Tr_No { get; set; }
        public int OperationTFID { get; set; }
        public Nullable<int> TrType { get; set; }
        public string RefNO { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string TrDateH { get; set; }
        public int OperationID { get; set; }
        public Nullable<int> FromSalesmanID { get; set; }
        public Nullable<int> ToSalesmanID { get; set; }
        public string Remark { get; set; }
        public string RequestedBy { get; set; }
        public string SendBy { get; set; }
        public string ReceivedBy { get; set; }
        public string VerfiedBy { get; set; }
        public Nullable<bool> IsPosted { get; set; }
        public Nullable<decimal> Total { get; set; }
        public Nullable<int> VoucherNo { get; set; }
        public Nullable<byte> VoucherType { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<int> BranchCode { get; set; }
        public Nullable<bool> IsSent { get; set; }
        public Nullable<bool> IsReceived { get; set; }
        public Nullable<bool> IsRequested { get; set; }
        public Nullable<int> Op_TRNo { get; set; }
        public string Op_RefNo { get; set; }
        public Nullable<System.DateTime> Op_TrDate { get; set; }
        public string Op_TruckNo { get; set; }
        public string Op_VendorCode { get; set; }
        public string Vnd_nameA { get; set; }
        public string Vnd_NameE { get; set; }
        public Nullable<byte> Op_Status { get; set; }
        public string FromSls_Code { get; set; }
        public string FromSls_NameA { get; set; }
        public string FromSls_NameE { get; set; }
        public string ToSls_Code { get; set; }
        public string ToSls_NameA { get; set; }
        public string Tosls_NameE { get; set; }
        public Nullable<decimal> SendQty { get; set; }
        public Nullable<decimal> RecQty { get; set; }
        public string ItemCode { get; set; }
        public string IT_DescA { get; set; }
        public string IT_DescE { get; set; }
        public string FamilyCode { get; set; }
        public string FamDescA { get; set; }
        public string Fam_DescE { get; set; }
    }
}