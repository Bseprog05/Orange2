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
    
    public partial class IProc_Rpt_ItemStockDetail_Result
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
        public string Par_BalTypeDSA { get; set; }
        public string Par_BalTypeDSE { get; set; }
        public string Par_CatDSA { get; set; }
        public string Par_CatDSE { get; set; }
        public string Par_FamilyDSA { get; set; }
        public string Par_FamilyDSE { get; set; }
        public string Par_ItemDSA { get; set; }
        public string Par_ItemDSE { get; set; }
        public string Par_FromDate { get; set; }
        public string Par_Todate { get; set; }
        public Nullable<int> branchcode { get; set; }
        public string itemCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public int OpType { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<decimal> InQty { get; set; }
        public Nullable<decimal> OutQty { get; set; }
        public Nullable<decimal> InCost { get; set; }
        public Nullable<decimal> OutCost { get; set; }
        public Nullable<decimal> StockUnitCost { get; set; }
        public Nullable<int> IsCash { get; set; }
        public Nullable<decimal> InVal { get; set; }
        public Nullable<decimal> OutVal { get; set; }
        public Nullable<decimal> Unitprice { get; set; }
        public Nullable<decimal> VatPrc { get; set; }
        public string Op_DescA { get; set; }
        public string Op_DescE { get; set; }
    }
}