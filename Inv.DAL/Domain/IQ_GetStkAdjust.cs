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
    
    public partial class IQ_GetStkAdjust
    {
        public int AdjustID { get; set; }
        public Nullable<int> Tr_No { get; set; }
        public string RefNO { get; set; }
        public Nullable<int> TrType { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string TrDateH { get; set; }
        public string Remark { get; set; }
        public Nullable<int> StoreID { get; set; }
        public string CountedBy { get; set; }
        public Nullable<decimal> TotalCost { get; set; }
        public string VerfiedBy { get; set; }
        public Nullable<bool> IsPosted { get; set; }
        public Nullable<int> VoucherNo { get; set; }
        public Nullable<byte> VoucherType { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<int> BranchCode { get; set; }
        public string St_DEscA { get; set; }
        public string ST_DescE { get; set; }
        public string Type_DescA { get; set; }
        public string type_DescE { get; set; }
        public Nullable<int> Status { get; set; }
    }
}