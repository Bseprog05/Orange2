﻿
$(document).ready(() => {
    ReceiveTransfer.InitalizeComponent();
})


namespace ReceiveTransfer {

    //System
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession(Modules.ReceiveTransfer);
    var compcode: Number;
    var Branch: Number;
    var startDate: string;
    var EndDate: string;
    var FinYear: number;

    //GridView
    var Grid: JsGrid = new JsGrid();

    //Arrays
    var BranchDetails: Array<G_BRANCH> = new Array<G_BRANCH>();
    var StatesFilterDetailsAr: Array<string> = new Array<string>();
    var StatesFilterDetailsEn: Array<string> = new Array<string>();
    var StoreSourceDetails: Array<G_STORE> = new Array<G_STORE>();
    var StoreToDetails: Array<G_STORE> = new Array<G_STORE>();
    var IQ_DirectTransferDetail: Array<IQ_GetTransfer> = new Array<IQ_GetTransfer>();
    var SearchDetails: Array<IQ_GetTransfer> = new Array<IQ_GetTransfer>();
    var ItemsListDetails: Array<IQ_GetItemStoreInfo> = new Array<IQ_GetItemStoreInfo>();
    var ItemsSourceListDetails: Array<IQ_GetItemStoreInfo> = new Array<IQ_GetItemStoreInfo>();
    var ItemsToListDetails: Array<IQ_GetItemStoreInfo> = new Array<IQ_GetItemStoreInfo>();

    //Models
    var MasterDetailModel: DirectTransferMasterDetails = new DirectTransferMasterDetails();
    var TranferHeaderModel: I_Stk_TR_Transfer = new I_Stk_TR_Transfer();
    var TransferDetailModel: Array<I_Stk_TR_TransferDetails> = new Array<I_Stk_TR_TransferDetails>();
    var TransferDetailSingleModel: I_Stk_TR_TransferDetails = new I_Stk_TR_TransferDetails();
    var TransferDetailModelFiltered: Array<IQ_GetTransferDetail> = new Array<IQ_GetTransferDetail>();
    var IQTransferDetailModel: Array<IQ_GetTransferDetail> = new Array<IQ_GetTransferDetail>();
    var IQTransferDetailSingleModel: IQ_GetTransferDetail = new IQ_GetTransferDetail();
    var SrchHeaderWithDetail: IQ_DirectTransferWithDetail = new IQ_DirectTransferWithDetail();
    var HeaderWithDetail: IQ_DirectTransferWithDetail = new IQ_DirectTransferWithDetail();
    var SelectedTransferModel: Array<IQ_GetTransfer> = new Array<IQ_GetTransfer>();

    //textboxs
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;
    var txtTransferDate: HTMLInputElement;
    var txtTrNo: HTMLInputElement;
    var txtRefNumber: HTMLInputElement;
    var txtCreatedBy: HTMLInputElement;
    var txtCreatedAt: HTMLInputElement;
    var txtUpdatedBy: HTMLInputElement;
    var txtUpdatedAt: HTMLInputElement;
    var txtSearch: HTMLInputElement;
    var txtApprovedBy: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtSenderTrNO: HTMLInputElement;


    //DropdownLists
    var ddlStatusFilter: HTMLSelectElement;
    var ddlSourceBranch: HTMLSelectElement;
    var ddlSourceStore: HTMLSelectElement;
    var ddlToBranch: HTMLSelectElement;
    var ddlToStore: HTMLSelectElement;

    var ddlSourceBranchAdd: HTMLSelectElement;
    var ddlSourceStoreAdd: HTMLSelectElement;
    var ddlToBranchAdd: HTMLSelectElement;
    var ddlToStoreAdd: HTMLSelectElement;



    //buttons
    var btnShow: HTMLButtonElement;
    var btnAdd: HTMLButtonElement;
    var btnEdit: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnSearchSendTransfer: HTMLButtonElement;

    //check box
    var chkApproved: HTMLInputElement;

    // Flages
    var FlagAddOrEdit: number = 0;//1 Add 2 Edit
    var showFlag: boolean = false;
    var AfterInsertOrUpdateFlag: boolean = false;

    //global
    var CountGrid: number = 0;
    var GlobalTransferID: number = 0;
    var TransferIDfromSearch: boolean = false;
    // printButton
    var btnPrintTrview: HTMLButtonElement;
    var btnPrintTrPDF: HTMLButtonElement;
    var btnPrintTrEXEL: HTMLButtonElement;
    var btnPrint: HTMLButtonElement;
    var btnPrintTransaction: HTMLButtonElement;

    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);
    export function InitalizeComponent() {

        //System
        (SysSession.CurrentEnvironment.ScreenLanguage == "ar") ? document.getElementById('Screen_name').innerHTML = "استلام تحويل" : document.getElementById('Screen_name').innerHTML = "Receipt Voucher";
        
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        Branch = Number(SysSession.CurrentEnvironment.BranchCode);
        FinYear = Number(SysSession.CurrentEnvironment.CurrentYear);
        InitalizeControls();

        // Call Fill Dropdownlists Functions
        fillddlStatusFilter();
        $("#ddlStatusFilter").prop("value", "2");
        fillddlBranchFilter();

        //Set Secial Values While Load
        txtFromDate.value = DateStartMonth();
        txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;

        txtTransferDate.value = GetDate();
        InitalizeEvents();
        $('#btnPrint').addClass('display_none');    
    }
    //------------------------------------------------------ Main Region -----------------------------------
    function InitalizeControls() {

        //textboxs
        txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
        txtTrNo = document.getElementById("txtTrNo") as HTMLInputElement;
        txtTransferDate = document.getElementById("txtTransferDate") as HTMLInputElement;
        txtApprovedBy = document.getElementById("txtApprovedBy") as HTMLInputElement;
        txtRemarks = document.getElementById("txtRemarks") as HTMLInputElement;
        txtRefNumber = document.getElementById("txtRefNumber") as HTMLInputElement;
        txtCreatedBy = document.getElementById("txtCreatedBy") as HTMLInputElement;
        txtCreatedAt = document.getElementById("txtCreatedAt") as HTMLInputElement;
        txtUpdatedBy = document.getElementById("txtUpdatedBy") as HTMLInputElement;
        txtUpdatedAt = document.getElementById("txtUpdatedAt") as HTMLInputElement;
        txtSearch = document.getElementById("txtSearch") as HTMLInputElement;
        txtSenderTrNO = document.getElementById("txtSenderTrNO") as HTMLInputElement;


        //DropdownLists
        ddlStatusFilter = document.getElementById("ddlStatusFilter") as HTMLSelectElement;
        ddlSourceBranch = document.getElementById("ddlSourceBranch") as HTMLSelectElement;
        ddlSourceStore = document.getElementById("ddlSourceStore") as HTMLSelectElement;
        ddlToBranch = document.getElementById("ddlToBranch") as HTMLSelectElement;
        ddlToStore = document.getElementById("ddlToStore") as HTMLSelectElement;
        ddlSourceBranchAdd = document.getElementById("ddlSourceBranchAdd") as HTMLSelectElement;
        ddlSourceStoreAdd = document.getElementById("ddlSourceStoreAdd") as HTMLSelectElement;
        ddlToBranchAdd = document.getElementById("ddlToBranchAdd") as HTMLSelectElement;
        ddlToStoreAdd = document.getElementById("ddlToStoreAdd") as HTMLSelectElement;

        //buttons
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        btnEdit = document.getElementById("btnEdit") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnSearchSendTransfer = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchSendTransfer");

        //checkBox
        chkApproved = document.getElementById("chkApproved") as HTMLInputElement;


        //printButton
        btnPrintTrview = document.getElementById("btnPrintTrview") as HTMLButtonElement;
        btnPrintTrPDF = document.getElementById("btnPrintTrPDF") as HTMLButtonElement;
        btnPrintTrEXEL = document.getElementById("btnPrintTrEXEL") as HTMLButtonElement;
        btnPrint = document.getElementById("btnPrint") as HTMLButtonElement;
        btnPrintTransaction = document.getElementById("btnPrintTransaction") as HTMLButtonElement;

    }
    function InitalizeEvents() {
        ddlSourceBranch.onchange = fillddlSourceStore;
        ddlToBranch.onchange = fillddlToStore;
        ddlSourceBranchAdd.onchange = fillddlSourceStoreAdd;
        ddlToBranchAdd.onchange = fillddlToStoreAdd;
        btnAdd.onclick = btnAdd_onclick;
        btnShow.onclick = btnShow_onclick;
        ddlSourceStoreAdd.onchange = ddlSourceStoreAdd_onchange;
        ddlToStoreAdd.onchange = ddlToStoreAdd_onchange;
        btnSave.onclick = btnSave_onClick;
        btnBack.onclick = btnBack_onclick;
        btnEdit.onclick = btnEdit_onclick;
       // btnAddDetails.onclick = AddNewRow;
        txtSearch.onkeyup = txtSearch_onKeyup;
        chkApproved.onclick = chkApproved_checked;
        btnSearchSendTransfer.onclick = btnSearchSendTransfer_onclick;


        // printButton
        btnPrintTrview.onclick = () => { PrintReport(1); }
        btnPrintTrPDF.onclick = () => { PrintReport(2); }
        btnPrintTrEXEL.onclick = () => { PrintReport(3); }
        btnPrint.onclick = () => { PrintReport(4); }
        btnPrintTransaction.onclick = btnPrintTransaction_onclick
    }
    //------------------------------------------------------ Buttons Region -----------------------------------
    function btnEdit_onclick() {
        debugger
        if (!SysSession.CurrentPrivileges.EDIT) return;

        FlagAddOrEdit = 2;
        txtUpdatedAt.value = DateTimeFormat(Date().toString());
        txtUpdatedBy.value = SysSession.CurrentEnvironment.UserCode;
        //ddlSourceStoreAdd_onchange();
        //ddlToStoreAdd_onchange();
        chkApproved.disabled = false;
        ddlSourceBranchAdd.disabled = true;
        txtTransferDate.disabled = true;
        $('#btnPrintTransaction').addClass('display_none');
        DisableDiv();
        EnableControls();
        HideButtons();
        btnSearchSendTransfer.disabled = true;
    }
    function btnBack_onclick() {
        $("#div_hedr").removeClass("disabledDiv");
        $("#divGridShow").removeClass("disabledDiv");
        ShowButons();

        if (FlagAddOrEdit == 2) {
            GridRowDoubleClick();
        } else {
            $("#divTransferDetails").addClass("display_none");
            $("#div_Approve").addClass("display_none");
            $("#btnEdit").addClass("display_none");
            DisableControls();
            Clear();
        }

    }
    function btnAdd_onclick() {
        if (!SysSession.CurrentPrivileges.AddNew) return;

        CountGrid = 0;
        Clear();
        DisableDiv();
        HideButtons();
        EnableControls();

        showFlag = false;
        FlagAddOrEdit = 1;

        txtCreatedAt.value = DateTimeFormat(GetDate().toString());
        txtCreatedBy.value = SysSession.CurrentEnvironment.UserCode;
        fillddlSourceStoreAdd();
        $("#ddlToBranchAdd").prop("value", Branch.toString());
        ddlToBranchAdd.disabled = true;
        fillddlToStoreAdd(); 
        $("#div_Approve").removeClass("display_none");
        chkApproved.disabled = !SysSession.CurrentPrivileges.CUSTOM1;
        btnSearchSendTransfer.disabled = false;

    }
    function btnShow_onclick() {
        $("#div_Approve").addClass("display_none");
        $("#btnEdit").addClass("display_none");

        $("#divTransferDetails").addClass("display_none");
        $("#divGridShow").removeClass("display_none");

        InitializeGrid();
    }
    function btnSave_onClick() {
        loading('btnsave');

        setTimeout(function () {

            finishSave('btnsave');

        if (!Validation_Header())
            return;
        
     if (!Validation_Grid())
                return;

        Assign();
        if (FlagAddOrEdit == 1) {
            Insert();
        } else {
            Update();
        }
        $('#btnPrintTransaction').removeClass('display_none');

        }, 100);
    }
    function chkApproved_checked() {
        if (!SysSession.CurrentPrivileges.CUSTOM2) return;

        if (txtTransferDate.disabled == true) {
            Open();
        }
    }
    function btnSearchSendTransfer_onclick() {
        let sys: SystemTools = new SystemTools();
        if (ddlToStoreAdd.value == "null" ) {
            DisplayMassage("يجب اختيار المستودع المستقبل للتحويل ", "You must choose the received store", MessageType.Error);
        } else {
            var storeId = Number(ddlToStoreAdd.value);
            sys.FindKey(Modules.ReceiveTransfer, "btnSearchSendTransfer", "ReceiverStoreID=" + storeId + " and TrType=1 and TFType = 1 and IsSent=1 and IsReceived = 0 and CompCode  = " + compcode + " and ReceiverBranchCode  = " + Branch, () => {
                let id = Number( SearchGrid.SearchDataGrid.SelectedKey);
                Ajax.Callsync({
                    type: "Get",
                    url: sys.apiUrl("DirectTransfer", "GetTransferByID"),
                    data: {
                        TransferID: id, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
                    },
                    success: (d) => {
                        let result = d as BaseResponse;
                        if (result.IsSuccess) {
                            SrchHeaderWithDetail = result.Response as IQ_DirectTransferWithDetail;
                            TransferIDfromSearch = true;
                            GlobalTransferID = SrchHeaderWithDetail.IQ_GetTransfer[0].TransfareID;
                            GridRowDoubleClick();
                            chkApproved.disabled = false;
                            ddlSourceBranchAdd.disabled = true;
                            DisableDiv();
                            EnableControls();
                            HideButtons();
                            TransferIDfromSearch = false;
                            txtTrNo.value = "";
                            txtTransferDate.value = GetDate();
                        }
                    }
                });

            });
        }
    }
    //------------------------------------------------------ Normal Grid Region -----------------------------------
    function InitializeGrid() { 
        let res: any = GetResourceList("");  
        Grid.OnRowDoubleClicked = GridRowDoubleClick;
        Grid.ElementName = "divGridDetails_View";
        Grid.PrimaryKey = "TransfareID";
        Grid.Paging = true;
        Grid.PageSize = 10;
        Grid.Sorting = true;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Editing = false;
        Grid.Inserting = false;
        Grid.SelectedIndex = 1;
        Grid.OnItemEditing = () => { };
        Grid.Columns = [
            { title: res.Trns_RefNum, name: "TransfareID", type: "text", width: "1%", visible: false },
            { title: res.Trns_ReceiveNo, name: "Tr_No", type: "text", width: "7.5%" },
            { title: res.Trns_RefNum, name: "RefNO", type: "text", width: "7.5%" },
            { title: res.App_date, name: "TrDate", type: "text", width: "9%" },
            { title: res.App_Receipt_Type, name: "TrType_Desc", type: "text", width: "7.5%" },
            { title: res.Branch_Transferred_from, name: (lang == "ar" ? "SBr_DescA" : "SBr_DescE"), type: "text", width: "15%" },
            { title: res.Store_Transferred_from, name: (lang == "ar" ? "SSt_DescA" : "SSt_DescE"), type: "text", width: "15%" },
            { title: res.Trns_ToBranch, name: (lang == "ar" ? "RBr_DescA" : "RBr_DescE"), type: "text", width: "15%" },
            { title: res.Store_Transferred_To, name: (lang == "ar" ? "RSt_DescA" : "RSt_DescE"), type: "text", width: "15%" }, 
            { title: res.Done_Received, name: "IsReceived_Desc", type: "text", width: "7.5%" }, 
        ]; 
        BindGridData();
    }
    function BindGridData() {
        
        $("#divGridShow").removeClass("display_none");

        var FromDate = DateFormatRep(txtFromDate.value).toString();
        var toDate = DateFormatRep(txtToDate.value).toString();
        var status = 0;

        var sourcrBR = 0;
        var ToBR = 0;
        var sourcrStore = 0;
        var ToStore = 0;

        status = Number(ddlStatusFilter.value.toString());


        if (ddlSourceBranch.value != "null") {
            sourcrBR = Number(ddlSourceBranch.value.toString());
        }

        if (ddlToBranch.value != "null") {
            ToBR = Number(ddlToBranch.value.toString());
        }

        if (ddlSourceStore.value != "null") {
            sourcrStore = Number(ddlSourceStore.value.toString());
        }

        if (ddlToStore.value != "null") {
            ToStore = Number(ddlToStore.value.toString());
        }


        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("DirectTransfer", "GetAllDirectTransferHeaderWithDetail"),
            data: { compcode: compcode, TrType: 1, TFType: 2, FromDate: FromDate, toDate: toDate, status: status, sourcrBR: sourcrBR, ToBR: ToBR, sourcrStore: sourcrStore, ToStore: ToStore, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    //IQ_DirectTransferDetail =new IQ_DirectTransferWithDetail();
                    IQ_DirectTransferDetail = result.Response as Array<IQ_GetTransfer>;
                    for (let i = 0; i < IQ_DirectTransferDetail.length; i++) {
                        IQ_DirectTransferDetail[i].TrDate = DateFormat(IQ_DirectTransferDetail[i].TrDate.toString());
                        IQ_DirectTransferDetail[i].IsReceived_Desc = IQ_DirectTransferDetail[i].IsReceived == true ? (lang == "ar" ? "نعم" : "yes") : (lang == "ar" ? "لا" : "No");

                        if (IQ_DirectTransferDetail[i].TFType == 1)
                            IQ_DirectTransferDetail[i].TrType_Desc = (lang == "ar" ? "ارسال" : "send");
                        else if (IQ_DirectTransferDetail[i].TFType == 2)
                            IQ_DirectTransferDetail[i].TrType_Desc = (lang == "ar" ? "استلام" : "Receipt");

                    }
                    Grid.DataSource = IQ_DirectTransferDetail;
                    Grid.Bind();
                }
            }
        });

    }
    function GridRowDoubleClick() {
        showFlag = true;
        Clear();
        $("#divTransferDetails").removeClass("display_none");
        $("#btnEdit").removeClass("display_none");
        $("#btnPrintTransaction").removeClass("display_none");
        $("#div_Approve").removeClass("display_none");
        if (TransferIDfromSearch == true) {
            SelectedTransferModel = SrchHeaderWithDetail.IQ_GetTransfer.filter(x => x.TransfareID == GlobalTransferID);
            txtSenderTrNO.value = SelectedTransferModel[0].Tr_No.toString();
        } else {
            if (AfterInsertOrUpdateFlag == true) {
                SelectedTransferModel = IQ_DirectTransferDetail.filter(x => x.TransfareID == GlobalTransferID);
                AfterInsertOrUpdateFlag = false;
            } else {
                SelectedTransferModel = IQ_DirectTransferDetail.filter(x => x.TransfareID == Number(Grid.SelectedKey));
            }
            txtSenderTrNO.value = "";
        }
        if (SelectedTransferModel.length > 0)
        {
            GlobalTransferID = Number(SelectedTransferModel[0].TransfareID);
            txtTrNo.value = SelectedTransferModel[0].Tr_No.toString();
            txtTransferDate.value = SelectedTransferModel[0].TrDate;
            txtApprovedBy.value = SelectedTransferModel[0].VerfiedBy;
            txtRemarks.value = SelectedTransferModel[0].Remark;

            if (SelectedTransferModel[0].RefNO != null)
                txtRefNumber.value = SelectedTransferModel[0].RefNO;

            fillddlBranchFilter();

            if (SelectedTransferModel[0].ReceiverBranchCode != null)
                ddlToBranchAdd.value = SelectedTransferModel[0].ReceiverBranchCode.toString();

            if (SelectedTransferModel[0].SenderBranchCode != null)
                ddlSourceBranchAdd.value = SelectedTransferModel[0].SenderBranchCode.toString();

            fillddlSourceStoreAdd();
            fillddlToStoreAdd();

            if (SelectedTransferModel[0].SenderStoreID != null) {
                ddlSourceStoreAdd.value = SelectedTransferModel[0].SenderStoreID.toString();
                GetAllStoreItems(SelectedTransferModel[0].SenderBranchCode, SelectedTransferModel[0].SenderStoreID);
            }

            if (SelectedTransferModel[0].ReceiverStoreID != null)
                ddlToStoreAdd.value = SelectedTransferModel[0].ReceiverStoreID.toString();

            if (SelectedTransferModel[0].IsReceived == true) {
                chkApproved.checked = true;
                btnEdit.disabled = true;
                chkApproved.disabled = !SysSession.CurrentPrivileges.CUSTOM2;
            } else {
                chkApproved.checked = false;
                chkApproved.disabled = true;
                btnEdit.disabled = false;
            }
            // creation
            txtCreatedBy.value = SelectedTransferModel[0].CreatedBy;
            txtCreatedAt.value = SelectedTransferModel[0].CreatedAt;

            // Edit
            if (SelectedTransferModel[0].UpdatedBy != null) {
                txtUpdatedBy.value = SelectedTransferModel[0].UpdatedBy;
                txtUpdatedAt.value = SelectedTransferModel[0].UpdatedAt;
            }
            if (TransferIDfromSearch == true) {
                txtUpdatedBy.value = "";
                txtUpdatedAt.value = "";
            }

            //Details
            TransferDetailModelFiltered = new Array<IQ_GetTransferDetail>();
            ///////////
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("DirectTransfer", "GetTransferByID"),
                data: {
                    TransferID: GlobalTransferID, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
                },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        HeaderWithDetail = result.Response as IQ_DirectTransferWithDetail;
                    }
                }
            });
            //////////
            TransferDetailModelFiltered = HeaderWithDetail.IQ_GetTransferDetail.filter(s => s.TransfareID == GlobalTransferID);
            if (TransferIDfromSearch == true) {
                for (let i = 0; i < TransferDetailModelFiltered.length; i++) {
                    if (TransferDetailModelFiltered[i].SendQty - TransferDetailModelFiltered[i].RecQty > 0) {
                        BuildControls(i);
                    }
                }
            } else {
                for (let i = 0; i < TransferDetailModelFiltered.length; i++) {
                    BuildControls(i);
                }
            }

            CountGrid = TransferDetailModelFiltered.length;
            DisableControls();
        }
    }
    //------------------------------------------------------ Validation Region -----------------------------------
    function Validation_Header() {
        var newCount: number = 0;
        for (let i = 0; i < CountGrid; i++) {
            if ($("#txt_StatusFlag" + i).val() != "d" && $("#txt_StatusFlag" + i).val() != "m") {
                newCount++;
            }
        } 
        if (!CheckDate(DateFormat(txtTransferDate.value).toString(), DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), DateFormat(SysSession.CurrentEnvironment.EndDate).toString())) {
            DisplayMassage(' لا توجد صلاحيه للاستلام في هذا التاريخ (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', 'There is no authority date on this date' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), MessageType.Error);
            Errorinput(txtTransferDate);
            return false
        } else if (ddlSourceBranchAdd.value == "null") {
            DisplayMassage('برجاء اختيار الفرع المحول منه', 'Please choose the branch you are transferring from', MessageType.Error);
            Errorinput(ddlSourceBranchAdd);
            return false
        } else if (ddlSourceStoreAdd.value == "null") {
            DisplayMassage('برجاء اختيار المستودع المحول منه', 'Please select the store you are transferring from', MessageType.Error);
            Errorinput(ddlSourceStoreAdd);
            return false
        }
        else if (ddlToBranchAdd.value == "null") {
            DisplayMassage('برجاء اختيار الفرع المحول اليه', 'Please choose the branch you are transferring to', MessageType.Error);
            Errorinput(ddlToBranchAdd);
            return false
        }
        else if (ddlToStoreAdd.value == "null") {
            DisplayMassage('برجاء اختيار المستودع المحول اليه', 'Please select the store you are transferring to', MessageType.Error);
            Errorinput(ddlToStoreAdd);
            return false
        }
        else if ((ddlToStoreAdd.value == ddlSourceStoreAdd.value) && (ddlToBranchAdd.value == ddlSourceBranchAdd.value)) {
            DisplayMassage(' لايمكن ان يحول المستودع و الفرع لنفسه ', 'The store and branch cannot be transferred to itself', MessageType.Error);
            Errorinput(ddlToStoreAdd);
            return false
        }
        else if (txtApprovedBy.value == "") {
            DisplayMassage('برجاء ادخال اعتماد بواسطه', 'Please enter approved By', MessageType.Error);
            Errorinput(txtApprovedBy);
            return false
        }
        else if (newCount == 0) {
            DisplayMassage('يجب ادخال اصناف الاستلام', 'Items of receive must be entered', MessageType.Error);
            return false
        }
        else if (!CheckPeriodDate(txtTransferDate.value, "I")) {
            debugger
            DisplayMassage("لا يمكنك الاضافه او التعديل في هذة الفتره المغلقه ", "Please select a Invoice data", MessageType.Error);
            Errorinput(txtTransferDate);
            return false
        }
        return true;
    }
    function Validation_Grid(): boolean {
        var flag: boolean = false;

        for (let i = 0; i < CountGrid; i++) {
            var RecQty: number = Number($("#txtReceivedQnty" + i).val()); 
            if (RecQty == 0 && ($("#txt_StatusFlag" + i).val() != "d" && $("#txt_StatusFlag" + i).val() != "m")) {
                flag = true;
            }
        }

            if (flag == false)
            {
                DisplayMassage('برجاء ادخال الكمية المستلمه لاي صنف', 'please enter recevied quantity', MessageType.Error);
                return false;
            }
            return true;
    }
    //-----------------------------------------------------------------------  DropDownList Region ----------------------------------
    function fillddlStatusFilter() {
        StatesFilterDetailsAr = ["جديد", " مستلم", "الجميع"];
        StatesFilterDetailsEn = ["New", " Returned", "All"];

        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
            for (let i = 0; i < StatesFilterDetailsEn.length; i++) {
                let newoption = document.createElement("option");
                newoption.value = i.toString();
                newoption.text = StatesFilterDetailsEn[i];
                ddlStatusFilter.options.add(newoption);
            }
        }
        else {
            for (let i = 0; i < StatesFilterDetailsAr.length; i++) {
                let newoption = document.createElement("option");
                newoption.value = i.toString();
                newoption.text = StatesFilterDetailsAr[i];
                ddlStatusFilter.options.add(newoption);
            }
        }
    }
    function fillddlBranchFilter() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GBranch", "GetAll"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    BranchDetails = result.Response as Array<G_BRANCH>;
                    if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                        DocumentActions.FillCombowithdefult(BranchDetails, ddlSourceBranch, "BRA_CODE", "BRA_DESCL", "Select branch");
                        DocumentActions.FillCombowithdefult(BranchDetails, ddlToBranch, "BRA_CODE", "BRA_DESCL", "Select branch");

                        DocumentActions.FillCombowithdefult(BranchDetails, ddlSourceBranchAdd, "BRA_CODE", "BRA_DESCL", "Select branch");
                        DocumentActions.FillCombowithdefult(BranchDetails, ddlToBranchAdd, "BRA_CODE", "BRA_DESCL", "Select branch");
                    }
                    else {
                        DocumentActions.FillCombowithdefult(BranchDetails, ddlSourceBranch, "BRA_CODE", "BRA_DESC", "اختر الفرع");
                        DocumentActions.FillCombowithdefult(BranchDetails, ddlToBranch, "BRA_CODE", "BRA_DESC", "اختر الفرع");

                        DocumentActions.FillCombowithdefult(BranchDetails, ddlSourceBranchAdd, "BRA_CODE", "BRA_DESC", "اختر الفرع");
                        DocumentActions.FillCombowithdefult(BranchDetails, ddlToBranchAdd, "BRA_CODE", "BRA_DESC", "اختر الفرع");
                    }

                }

            }
        });
    }
    function fillddlSourceStore() {
        if (ddlSourceBranch.value != "null") {
            var Branch: number = Number(ddlSourceBranch.value);
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("StkDefStore", "GetAll"),
                data: {
                    CompCode: compcode, BranchCode: Branch, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
                },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        StoreSourceDetails = result.Response as Array<G_STORE>;
                        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                            DocumentActions.FillCombowithdefult(StoreSourceDetails, ddlSourceStore, "StoreId", "DescL", "Select Store");
                        }
                        else {
                            DocumentActions.FillCombowithdefult(StoreSourceDetails, ddlSourceStore, "StoreId", "DescA", "اختر المستودع");
                        }
                    }
                }
            });
        }
    }
    function fillddlToStore() {
        if (ddlToBranch.value != "null") {
            var Branch: number = Number(ddlToBranch.value);
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("StkDefStore", "GetAll"),
                data: {
                    CompCode: compcode, BranchCode: Branch, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
                },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        StoreToDetails = result.Response as Array<G_STORE>;
                        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                            DocumentActions.FillCombowithdefult(StoreToDetails, ddlToStore, "StoreId", "DescL", "Select Store");
                        }
                        else {
                            DocumentActions.FillCombowithdefult(StoreToDetails, ddlToStore, "StoreId", "DescA", "اختر المستودع");
                        }
                    }
                }
            });
        }
    }
    function fillddlSourceStoreAdd() {
        if (ddlSourceBranchAdd.value != "null") {
            var Branch: number = Number(ddlSourceBranchAdd.value);
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("StkDefStore", "GetAll"),
                data: {
                    CompCode: compcode, BranchCode: Branch, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
                },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        StoreSourceDetails = result.Response as Array<G_STORE>;
                        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                            DocumentActions.FillCombowithdefult(StoreSourceDetails, ddlSourceStoreAdd, "StoreId", "DescL", "Select Store");
                        }
                        else {
                            DocumentActions.FillCombowithdefult(StoreSourceDetails, ddlSourceStoreAdd, "StoreId", "DescA", "اختر المستودع");
                        }
                    }
                }
            });
        }
    }
    function fillddlToStoreAdd() {
        if (ddlToBranchAdd.value != "null") {
            var Branch: number = Number(ddlToBranchAdd.value);
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("StkDefStore", "GetAll"),
                data: {
                    CompCode: compcode, BranchCode: Branch, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
                },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        StoreToDetails = result.Response as Array<G_STORE>;
                        if (SysSession.CurrentEnvironment.ScreenLanguage == "en") {
                            DocumentActions.FillCombowithdefult(StoreToDetails, ddlToStoreAdd, "StoreId", "DescL", "Select Store");
                        }
                        else {
                            DocumentActions.FillCombowithdefult(StoreToDetails, ddlToStoreAdd, "StoreId", "DescA", "اختر المستودع");
                        }
                    }
                }
            });
        }
    }
    function ddlSourceStoreAdd_onchange() {
        if (ddlSourceStoreAdd.value != "null" && ddlSourceBranchAdd.value != "null") {
            var BranchID = Number(ddlSourceBranchAdd.value);
            var StoreID = Number(ddlSourceStoreAdd.value);
            GetAllStoreItems(BranchID, StoreID);
            ItemsSourceListDetails = new Array<IQ_GetItemStoreInfo>();
            ItemsSourceListDetails = ItemsListDetails;
        }

    }
    function ddlToStoreAdd_onchange() {
        if (ddlToStoreAdd.value != "null" && ddlToBranchAdd.value != "null") {
            if ((ddlToStoreAdd.value == ddlSourceStoreAdd.value) && (ddlToBranchAdd.value == ddlSourceBranchAdd.value)) {
                DisplayMassage(' لايمكن ان يحول المستودع و الفرع لنفسه ', 'The store and branch cannot be transferred to itself', MessageType.Error);
                ddlToStoreAdd.focus();
                ddlToStoreAdd.value = "null";
            } else {
                var BranchID = Number(ddlToBranchAdd.value);
                var StoreID = Number(ddlToStoreAdd.value);
                GetAllStoreItems(BranchID, StoreID);
                ItemsToListDetails = new Array<IQ_GetItemStoreInfo>();
                ItemsToListDetails = ItemsListDetails;
            }
        }
    }
    //------------------------------------------------------ Clear && Search && Enable && Disabled Region -----------------------------------
    function Clear() {
        $("#div_Data").html("");

        txtTransferDate.value = GetDate();

        txtUpdatedBy.value = "";
        txtUpdatedAt.value = "";
        txtCreatedBy.value = "";
        txtCreatedAt.value = "";

        txtRefNumber.value = "";
        txtTrNo.value = "";
        txtSenderTrNO.value = "";
        txtApprovedBy.value = "";
        txtRemarks.value = "";

        ddlSourceBranchAdd.value = 'null';
        ddlSourceStoreAdd.value = 'null';
        ddlToBranchAdd.value = 'null';
        ddlToStoreAdd.value = 'null';
        chkApproved.checked = false;

    }
    function txtSearch_onKeyup() {
        
        if (txtSearch.value != "") {
            let search: string = txtSearch.value.toLowerCase();
            SearchDetails = IQ_DirectTransferDetail.filter(x => x.RBr_DescA.toString().toLowerCase().search(search) >= 0 ||  x.RBr_DescE.toString().toLowerCase().search(search) >= 0
                || x.SBr_DescA.toLowerCase().search(search) >= 0 || x.SBr_DescE.toLowerCase().search(search) >= 0
                || x.RSt_DescA.toLowerCase().search(search) >= 0  || x.RSt_DescE.toLowerCase().search(search) >= 0
                || x.SSt_DescA.toString().search(search) >= 0 || x.SSt_DescE.toString().search(search) >= 0
                || x.Tr_No.toString().search(search) >= 0 || x.RefNO.toString().search(search) >= 0);
            Grid.DataSource = SearchDetails;
            Grid.Bind();
        } else {
            Grid.DataSource = IQ_DirectTransferDetail;
            Grid.Bind();
        }
    }
    function GetDate() {
        var today: Date = new Date();
        var dd: string = today.getDate().toString();
        var ReturnedDate: string;
        var mm: string = (today.getMonth() + 1).toString();
        var yyyy = today.getFullYear();
        if (Number(dd) < 10) {
            dd = ('0' + dd);
        }
        if (Number(mm) < 10) {
            mm = ('0' + mm);
        }
        ReturnedDate = yyyy + '-' + mm + '-' + dd;
        return ReturnedDate;
    }
    function EnableControls() {
        $("#divTransferDetails :input").removeAttr("disabled");
     //   $("#btnAddDetails").removeClass("display_none");

        for (let i = 0; i < CountGrid; i++) {

            $("#btnSearchItems" + i).removeAttr("disabled");
            $("#txtReceivedQnty" + i).removeAttr("disabled");

            $("#txtItemCode" + i).attr("disabled", "disabled");
            $("#txtConvertedQnty" + i).attr("disabled", "disabled");
            $("#txtItemName" + i).attr("disabled", "disabled");
            $("#txtUntitName" + i).attr("disabled", "disabled"); 
            $("#txtSrcQty" + i).attr("disabled", "disabled"); 
            $("#txtToQty" + i).attr("disabled", "disabled"); 
            
            $("#btn_minus" + i).removeClass("display_none");
        }
        txtCreatedAt.disabled = true;
        txtCreatedBy.disabled = true;
        txtUpdatedAt.disabled = true;
        txtUpdatedBy.disabled = true;
        
        ddlSourceStoreAdd.disabled = true;
        ddlSourceBranchAdd.disabled = true;

        txtTrNo.disabled = true;
        txtSenderTrNO.disabled = true;
    }
    function DisableControls() {
        $("#divTransferDetails :input").attr("disabled", "disabled");
        //$("#btnAddDetails").addClass("display_none");

        for (let i = 0; i < CountGrid; i++) {
            //$("#btnSearchItems" + i).attr("disabled", "disabled");
            $("#txtItemCode" + i).attr("disabled", "disabled");
            $("#txtReceivedQnty" + i).attr("disabled", "disabled");
            $("#txtConvertedQnty" + i).attr("disabled", "disabled");
            $("#txtItemName" + i).attr("disabled", "disabled");
            $("#txtUntitName" + i).attr("disabled", "disabled");
            $("#txtSrcQty" + i).attr("disabled", "disabled");
            $("#txtToQty" + i).attr("disabled", "disabled"); 

            $("#btn_minus" + i).addClass("display_none");
        }
        txtTrNo.disabled = true;
        txtSenderTrNO.disabled = true;
    }
    function HideButtons() {
        $("#btnEdit").addClass("display_none");

        $("#btnSave").removeClass("display_none");
        $("#btnBack").removeClass("display_none");
    }
    function ShowButons() {
        $("#btnEdit").removeClass("display_none");

        $("#btnSave").addClass("display_none");
        $("#btnBack").addClass("display_none");
    }
    function DisableDiv() {
        $("#div_hedr").addClass("disabledDiv");
        $("#divTransferDetails").removeClass("disabledDiv");
        $("#divTransferDetails").removeClass("display_none");
    }
    //------------------------------------------------------ Controls Grid Region -----------------------------------
    function BuildControls(cnt: number) {
        var html = "";
        html = '<div id= "No_Row' + cnt + '" class="container-fluid style_border" > <div class="row" ><div class="col-lg-12">' +
            '<input id="TransfareDetailID' + cnt + '" name="" disabled type="hidden" value=" " class="form-control  text_Display" />' +
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1" style="width:1.5%!important">' +
            '<span id="btn_minus' + cnt + '" class=" glyphicon glyphicon-minus-sign fontitm3ReceiveTransfer "></span>' +
            '</div>' +
            '<input id="txtSerial' + cnt + '" name="FromDate" disabled type="hidden" value="' + (CountGrid + 1) + '" class="form-control  text_Display" />' +
         '<input id="txtItemNumber' + cnt + '" name="" disabled type="hidden" class="col-lg-9  form-control  text_Display" />'+
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 Acc" >' +
            '<input id="txtItemCode' + cnt + '" name="" disabled type="text" class="form-control  text_Display" /></div>' +
            '<div class="col-lg-3 col-md-3 col-sm-3 col-xl-3 col-xs-3 Acc" >' +
            '<input id="txtItemName' + cnt + '" name="" disabled type="text" class="form-control  text_Display" /></div>' +
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1" >' +
            '<input id="txtUntitName' + cnt + '" name="" disabled type="text" class="form-control  text_Display" /></div>' +
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 Acc" style=" ">' +
            '<input id="txtSrcQty' + cnt + '" name="" disabled type="text" class="form-control  text_Display" /></div>' +
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1 Acc" style=" ">' +
            '<input id="txtToQty' + cnt + '" name="" disabled type="text" class="form-control  text_Display" /></div>' +
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1" >' +
            '<input id="txtConvertedQnty' + cnt + '" name="" disabled type="number" value="0"  min="0" class="form-control  text_Display" /></div>' +
            '<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1 col-xs-1" >' +
            '<input id="txtReceivedQnty' + cnt + '" name="" disabled type="number" value="0"  min="0" class="form-control  text_Display" /></div>' +
            '<input  id="txtUnitID' + cnt + '" name = " " type ="hidden"  />' +
            '<input  id="txt_StatusFlag' + cnt + '" name = " " type ="hidden"  />' +
            '<input  id="txt_OnhandQty' + cnt + '" name = " " type ="hidden"  />' +
            '<input  id="UnitCost' + cnt + '" name = " " type ="hidden"  />' +
            '</div>';
        $("#div_Data").append(html);

    
        //Quintity on change  
        $("#txtReceivedQnty" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
            var txtConvertedQntyVal = Number($('#txtConvertedQnty' + cnt).val());
            var txtReceivedQntyVal = Number($('#txtReceivedQnty' + cnt).val());

            if (txtReceivedQntyVal >txtConvertedQntyVal) {
                DisplayMassage("لا يمكن استلام كمية اكبر من الكمية المحولة ", 'It is not possible to receive a quantity larger than the converted quantity', MessageType.Error);
                $('#txtReceivedQnty' + cnt).val(TransferDetailModelFiltered[cnt].SendQty - TransferDetailModelFiltered[cnt].RecQty);
            }
        });

        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });


        if (showFlag == true) {
            $('#UnitCost' + cnt).val(TransferDetailModelFiltered[cnt].UnitCost);

            $('#txtSerial' + cnt).val(TransferDetailModelFiltered[cnt].Serial);
            $('#TransfareDetailID' + cnt).val(TransferDetailModelFiltered[cnt].TransfareDetailID);
            $('#txtItemNumber' + cnt).val(TransferDetailModelFiltered[cnt].ItemID);
            (lang == "ar" ? $('#txtItemName' + cnt).val(TransferDetailModelFiltered[cnt].Itm_DescA) : $('#txtItemName' + cnt).val(TransferDetailModelFiltered[cnt].Itm_DescE))
            if (TransferDetailModelFiltered[cnt].StockSendQty != null) $('#txtConvertedQnty' + cnt).val(TransferDetailModelFiltered[cnt].SendQty.toString());
            if (TransferDetailModelFiltered[cnt].StockRecQty != null) $('#txtReceivedQnty' + cnt).val(TransferDetailModelFiltered[cnt].RecQty.toString());
            $('#txtItemCode' + cnt).val(TransferDetailModelFiltered[cnt].ItemCode);
            $('#txtUnitID' + cnt).val(TransferDetailModelFiltered[cnt].UnitID);
            (lang == "ar" ? $('#txtUntitName' + cnt).val(TransferDetailModelFiltered[cnt].uom_DescA) : $('#txtUntitName' + cnt).val(TransferDetailModelFiltered[cnt].uom_DescE));
            $('#txtSrcQty' + cnt).val(TransferDetailModelFiltered[cnt].SrcOhnandQty);
            $('#txtToQty' + cnt).val(TransferDetailModelFiltered[cnt].RecOnhandQty);
            $('#txt_StatusFlag' + cnt).val("u");
            if (TransferIDfromSearch == true) {
                $('#txtConvertedQnty' + cnt).val(TransferDetailModelFiltered[cnt].SendQty - TransferDetailModelFiltered[cnt].RecQty);
               $('#txtReceivedQnty' + cnt).val("");

            }
        }

    }
    function DeleteRow(RecNo: number) {
        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {

            var statusFlag = $("#txt_StatusFlag" + RecNo).val();
            if (statusFlag == "i")
                $("#txt_StatusFlag" + RecNo).val("m");
            else
                $("#txt_StatusFlag" + RecNo).val("d");

            // ComputeTotals();
            $("#txtItemNumber" + RecNo).val("99");
            $("#txtItemName" + RecNo).val("1");
            $("#txtConvertedQnty" + RecNo).val("1");
            $("#txtUntitName" + RecNo).val("1");
            $("#txtItemCode" + RecNo).val("1");
            $("#txtSrcQty" + RecNo).val("1");
            $("#txtToQty" + RecNo).val("1");
            $("#txtUnitID" + RecNo).val("1");
            $("#txtReceivedQnty" + RecNo).val("1");

            $("#No_Row" + RecNo).attr("hidden", "true");

            var counter = 0;
            for (let i = 0; i < CountGrid; i++) {
                var flagvalue = $("#txt_StatusFlag" + i).val();
                if (flagvalue != "d" && flagvalue != "m") {
                    if ($("#txt_StatusFlag" + i).val() != "i")
                        $("#txt_StatusFlag" + i).val("u");

                    $("#txtSerial" + i).prop("value", counter + 1);
                    counter = counter + 1;
                }
            }
        });

    }
    //---------------------------------------------- get By id  functions ----------------------------------------
    function GetAllStoreItems(BranchID: number, StoreID: number) {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("DirectTransfer", "GetAllItemsInStore"),
            data: { branch: BranchID, comp: compcode, Store: StoreID, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    ItemsListDetails = result.Response as Array<IQ_GetItemStoreInfo>;
                }
            }
        });
    }
    //--------------------------------------------------- Main Functions-----------------------------------------------
    function Assign() {

        MasterDetailModel = new DirectTransferMasterDetails();
        TranferHeaderModel = new I_Stk_TR_Transfer();
        TransferDetailModel = new Array<I_Stk_TR_TransferDetails>();

        // Header Data
        if (FlagAddOrEdit == 1) {
            TranferHeaderModel.SendTransferID = GlobalTransferID;
        }
        TranferHeaderModel.Tr_No = Number(txtTrNo.value);
        TranferHeaderModel.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
        TranferHeaderModel.BranchCode = Number(Branch);
        TranferHeaderModel.TrDate = txtTransferDate.value;
        TranferHeaderModel.RefNO = txtRefNumber.value;
        TranferHeaderModel.TrType = 1;
        TranferHeaderModel.TFType= 2;

        if (chkApproved.checked == true) { TranferHeaderModel.IsReceived = true; } else { TranferHeaderModel.IsReceived = false; }

        TranferHeaderModel.SenderBranchCode = Number(ddlSourceBranchAdd.value);
        TranferHeaderModel.ReceiverBranchCode = Number(ddlToBranchAdd.value);

        TranferHeaderModel.SenderStoreID = Number(ddlSourceStoreAdd.value);
        TranferHeaderModel.ReceiverStoreID = Number(ddlToStoreAdd.value);

        TranferHeaderModel.VerfiedBy = txtApprovedBy.value;
        TranferHeaderModel.Remark = txtRemarks.value;


        var StatusFlag: String;
        // Details
        for (var i = 0; i < CountGrid; i++) {
            TransferDetailSingleModel = new I_Stk_TR_TransferDetails();
            StatusFlag = $("#txt_StatusFlag" + i).val();
             
            TransferDetailSingleModel.StatusFlag = StatusFlag.toString();

            var RecevQty = Number($("#txtReceivedQnty" + i).val());

            if (RecevQty == 0 && StatusFlag == "u")
                StatusFlag = "d";

            if (StatusFlag == "i" && RecevQty>0) {
                TransferDetailSingleModel.TransfareDetailID = 0;

                TransferDetailSingleModel.Serial = $("#txtSerial" + i).val();
                TransferDetailSingleModel.ItemID = $("#txtItemNumber" + i).val();
                TransferDetailSingleModel.StockSendQty = $("#txtConvertedQnty" + i).val();
                TransferDetailSingleModel.SendQty = $("#txtConvertedQnty" + i).val();
                TransferDetailSingleModel.RecQty = $("#txtReceivedQnty" + i).val();
                TransferDetailSingleModel.StockRecQty = $("#txtReceivedQnty" + i).val();
                TransferDetailSingleModel.UnitID = $("#txtUnitID" + i).val();
                TransferDetailSingleModel.RecOnhandQty =  Number($("#txtToQty" + i).val());
                TransferDetailSingleModel.SrcOhnandQty = Number($("#txtSrcQty" + i).val());
                TransferDetailSingleModel.UnitCost = Number($("#UnitCost" + i).val());

                TransferDetailModel.push(TransferDetailSingleModel);

            } else if (StatusFlag == "u") {
                TransferDetailSingleModel.TransfareDetailID = $("#TransfareDetailID" + i).val();
                TransferDetailSingleModel.Serial = $("#txtSerial" + i).val();
                TransferDetailSingleModel.ItemID = $("#txtItemNumber" + i).val();
                TransferDetailSingleModel.StockSendQty = $("#txtConvertedQnty" + i).val();
                TransferDetailSingleModel.SendQty = $("#txtConvertedQnty" + i).val();
                TransferDetailSingleModel.RecQty = $("#txtReceivedQnty" + i).val();
                TransferDetailSingleModel.StockRecQty = $("#txtReceivedQnty" + i).val();
                TransferDetailSingleModel.UnitID = $("#txtUnitID" + i).val();
                TransferDetailSingleModel.RecOnhandQty = Number($("#txtToQty" + i).val());
                TransferDetailSingleModel.SrcOhnandQty = Number($("#txtSrcQty" + i).val());
                TransferDetailSingleModel.UnitCost = Number($("#UnitCost" + i).val());
                TransferDetailModel.push(TransferDetailSingleModel);

            }
            else if (StatusFlag == "d") {
                if (FlagAddOrEdit == 2) {
                    if ($("#TransfareDetailID" + i).val() != "") {
                        var deletedID = $("#TransfareDetailID" + i).val();
                        TransferDetailSingleModel.TransfareDetailID = deletedID;
                        TransferDetailModel.push(TransferDetailSingleModel);
                    }
                }
            }

        }
        MasterDetailModel.I_Stk_TR_Transfer = TranferHeaderModel;
        MasterDetailModel.I_Stk_TR_TransferDetails = TransferDetailModel;

        MasterDetailModel.Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        MasterDetailModel.UserCode = SysSession.CurrentEnvironment.UserCode;
    }
    function Insert() {
        MasterDetailModel.I_Stk_TR_Transfer.CreatedBy = SysSession.CurrentEnvironment.UserCode;
        MasterDetailModel.I_Stk_TR_Transfer.CreatedAt = DateTimeFormat(Date().toString());
        MasterDetailModel.I_Stk_TR_Transfer.TransfareID = 0;


        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("DirectTransfer", "InsertDirectTransferMasterDetail"),
            data: JSON.stringify(MasterDetailModel),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    let res = result.Response as I_Stk_TR_Transfer;
                    DisplayMassage("تم اصدار  استلام رقم " + res.Tr_No, 'Receipt number ' + res.Tr_No +' has been issued', MessageType.Succeed);
                    txtTrNo.value = res.Tr_No.toString();
                    GlobalTransferID = res.TransfareID;
                    Save();
                    AfterInsertOrUpdateFlag = true;
                    GridRowDoubleClick();
                } else {
                    DisplayMassage("هناك خطــأ ", '(Error)', MessageType.Error);
                }
            }
        });
    }
    function Update() {
        MasterDetailModel.I_Stk_TR_Transfer.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
        MasterDetailModel.I_Stk_TR_Transfer.UpdatedAt = DateTimeFormat(Date().toString());

        MasterDetailModel.I_Stk_TR_Transfer.TransfareID = GlobalTransferID;
        // creation
        if (SelectedTransferModel.length > 0) {
            MasterDetailModel.I_Stk_TR_Transfer.CreatedBy = SelectedTransferModel[0].CreatedBy;
            MasterDetailModel.I_Stk_TR_Transfer.CreatedAt = SelectedTransferModel[0].CreatedAt;
        } else {
            MasterDetailModel.I_Stk_TR_Transfer.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            MasterDetailModel.I_Stk_TR_Transfer.CreatedAt = DateTimeFormat(Date().toString());
        }

        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("DirectTransfer", "UpdateDirectTransferDetail"),
            data: JSON.stringify(MasterDetailModel),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    let res = result.Response as I_Stk_TR_Transfer;
                    DisplayMassage("تم التعديل بنجاح " + res.Tr_No, 'editied Successfully' + res.Tr_No, MessageType.Succeed);
                    GlobalTransferID = res.TransfareID;
                    Save();
                    AfterInsertOrUpdateFlag = true;
                    GridRowDoubleClick();
                } else {
                    DisplayMassage("هناك خطــأ ", '(Error)', MessageType.Error);
                }
            }
        });

    }
    function Open() {

        if (!CheckPeriodDate(txtTransferDate.value, "I")) {
            debugger
            DisplayMassage("لا يمكنك الاضافه او التعديل في هذة الفتره المغلقه ", "Please select a Invoice data", MessageType.Error);
            Errorinput(txtTransferDate);
            chkApproved.checked = true;
            return false
        }

        Assign();

        MasterDetailModel.I_Stk_TR_Transfer.UpdatedBy = SysSession.CurrentEnvironment.UserCode;
        MasterDetailModel.I_Stk_TR_Transfer.UpdatedAt = DateTimeFormat(Date().toString());

        MasterDetailModel.I_Stk_TR_Transfer.TransfareID = GlobalTransferID;
        // creation
        if (SelectedTransferModel.length > 0) {
            MasterDetailModel.I_Stk_TR_Transfer.CreatedBy = SelectedTransferModel[0].CreatedBy;
            MasterDetailModel.I_Stk_TR_Transfer.CreatedAt = SelectedTransferModel[0].CreatedAt;
        } else {
            MasterDetailModel.I_Stk_TR_Transfer.CreatedBy = SysSession.CurrentEnvironment.UserCode;
            MasterDetailModel.I_Stk_TR_Transfer.CreatedAt = DateTimeFormat(Date().toString());
        }

        MasterDetailModel.I_Stk_TR_Transfer.IsSent = false;

        Ajax.Callsync({
            type: "POST",
            url: sys.apiUrl("DirectTransfer", "Open"),
            data: JSON.stringify(MasterDetailModel),
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    let res = result.Response as I_Stk_TR_Transfer;
                    DisplayMassage("تم فك الاستلام " + res.Tr_No, 'receive' + res.Tr_No +" has been decoded", MessageType.Succeed);
                    InitializeGrid();
                    chkApproved.disabled = true;
                    btnEdit.disabled = false;
                } else {
                    DisplayMassage("هناك خطــأ ", '(Error)', MessageType.Error);
                }
            }
        });

    }
    function Save() {
        InitializeGrid();
        $("#div_hedr").removeClass("disabledDiv");
        $("#divGridShow").removeClass("disabledDiv");
        ShowButons();
        DisableControls();
    }
    //----------------------------------------------------------Print Report---------------------------------------
    export function PrintReport(OutType: number) {
        ////debugger;
        let FromStore = $('#ddlSourceStore').val();
        let ToStore = $('#ddlToStore').val();
        let FromBra = $('#ddlSourceBranch').val();
        let ToBra = $('#ddlToBranch').val();
        let status = $('#ddlStatusFilter').val();
        if (!SysSession.CurrentPrivileges.PrintOut) return;
        let rp: ReportParameters = new ReportParameters();

        rp.RepType = OutType;//output report as View
        rp.FromDate = DateFormatRep(txtFromDate.value);
        rp.ToDate = DateFormatRep(txtToDate.value);
        rp.CompCode = SysSession.CurrentEnvironment.CompCode;
        rp.BranchCode = SysSession.CurrentEnvironment.BranchCode;
        rp.CompNameA = SysSession.CurrentEnvironment.CompanyNameAr;
        rp.CompNameE = SysSession.CurrentEnvironment.CompanyName;
        rp.UserCode = SysSession.CurrentEnvironment.UserCode;
        rp.Tokenid = SysSession.CurrentEnvironment.Token;
        rp.BraNameA = SysSession.CurrentEnvironment.BranchName;
        rp.BraNameE = SysSession.CurrentEnvironment.BranchNameEn;
        rp.ScreenLanguage = SysSession.CurrentEnvironment.ScreenLanguage;
        rp.SystemCode = SysSession.CurrentEnvironment.SystemCode;
        rp.SubSystemCode = SysSession.CurrentEnvironment.SubSystemCode;
        if (rp.BraNameA == null || rp.BraNameE == null) {

            rp.BraNameA = " ";
            rp.BraNameE = " ";
        }
        rp.LoginUser = SysSession.CurrentEnvironment.UserCode;
        rp.TrType = 1;
        rp.TfType = 2;

        if (FromBra == "null") {
            rp.FromBra = -1;
            rp.FromstoreID = -1;
        } else {
            rp.FromBra = FromBra;
            rp.FromstoreID = FromStore;
        }
        if (ToBra == "null") {
            rp.ToBra = -1;
            rp.ToStoreID = -1;
        }
        else {
            rp.ToBra = ToBra;
            rp.ToStoreID = ToStore;
        }





        if (status == "0") {
            rp.Status = 1;         //-------جديد
        }
        else if (status == "1") {
            rp.Status = 0;        //------  محول    
        }
        else {
            rp.Status = 2;       //-------الجميع
        }


        Ajax.Callsync({
            url: Url.Action("IProc_Rpt_StkTransferList", "GeneralReports"),
            data: rp,
            success: (d) => {

                let result = d.result as string;


                window.open(result, "_blank");
            }
        })
    }

    function btnPrintTransaction_onclick() {
        if (!SysSession.CurrentPrivileges.PrintOut) return;

        let rp: ReportParameters = new ReportParameters();
      
        rp.FromDate = DateFormatRep(txtFromDate.value);
        rp.ToDate = DateFormatRep(txtToDate.value);
       
        rp.TRId = GlobalTransferID;
        rp.Type = 0;                                                       

            rp.Name_function = "IProc_Prnt_StkTransfer";
            localStorage.setItem("Report_Data", JSON.stringify(rp));

            localStorage.setItem("result", '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
             window.open(Url.Action("ReportsPopup", "Home"), "_blank");

    }
}












