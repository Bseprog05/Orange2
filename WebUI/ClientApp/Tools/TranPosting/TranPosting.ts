﻿$(document).ready(() => {
    TranPosting.InitalizeComponent();
})
namespace TranPosting {
    //System
    var sys: SystemTools = new SystemTools();
    var SysSession: SystemSession = GetSystemSession(Modules.TranPosting);
    var compcode: Number;
    var branch: Number;
    var startDate: string;
    var EndDate: string;


    var Selecteditem = new GQ_GetUsers;

    //GridView
    var SubSystemGrid: JsGrid = new JsGrid();
    var TransactionsGrid: JsGrid = new JsGrid();
    var VoucherDetailGrid: JsGrid = new JsGrid();

    //DropdownLists
    var ddlBranch: HTMLSelectElement;

    //textboxs
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;
    var txtFromNumber: HTMLInputElement;
    var txtToNumber: HTMLInputElement;
    var txtDebit: HTMLInputElement;
    var txtCedit: HTMLInputElement;
    var txtDesc: HTMLInputElement;
    var txtDiff: HTMLInputElement;

    //labels
    var lblVoucherNum: HTMLLabelElement;

    //buttons
    var btnLoad: HTMLButtonElement;
    var btnShowVouchers: HTMLButtonElement;
    var btnCreateVoucher: HTMLButtonElement;

    var btnSelectAll: HTMLButtonElement;
    var btnReverseSelection: HTMLButtonElement;
    var btnUnSelectAll: HTMLButtonElement;

    //Arrays
    var BranchDetails: Array<G_BRANCH> = new Array<G_BRANCH>();
    var SubSystemDetails: Array<G_LnkTrans> = new Array<G_LnkTrans>();
    var SubSystemDetailsRefreshed: Array<G_LnkTrans> = new Array<G_LnkTrans>();
    var LnkTransDetails: Array<G_LnkTrans_Temp> = new Array<G_LnkTrans_Temp>();
    var selectedLnkTransDetails: Array<G_LnkTrans_Temp> = new Array<G_LnkTrans_Temp>();
    var GetLnkVoucherDetail: Array<GQ_GetLnkVoucherDetail> = new Array<GQ_GetLnkVoucherDetail>();
    //var SelectedModuleCodes: Array<G_LnkTrans> = new Array<G_LnkTrans>();

    // global
    var debitTot: number = 0;
    var cerditTot: number = 0;
    var diffTot: number = 0;
    var lang: string;


    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);

    export function InitalizeComponent() {
        $('#dir_11').addClass('hidden_Control');

        InitalizeControls();
        //System
        (SysSession.CurrentEnvironment.ScreenLanguage == "ar") ? document.getElementById('Screen_name').innerHTML = "ترحيل الحسابات" : document.getElementById('Screen_name').innerHTML = "Receipt Voucher";
        compcode = Number(SysSession.CurrentEnvironment.CompCode);
        branch = Number(SysSession.CurrentEnvironment.BranchCode);
        lang = SysSession.CurrentEnvironment.ScreenLanguage;
        //Set Secial Values While Load
        txtFromDate.value = DateStartMonth();
        txtToDate.value = ConvertToDateDash(GetDate()) <= ConvertToDateDash(SysSession.CurrentEnvironment.EndDate) ? GetDate() : SysSession.CurrentEnvironment.EndDate;



        //Fill ddl
        fillddlBranch();

        InitializeEvents();

        // initialize Grids

        InitializeSubSystemGrid();
        // InitializePagesGrid();
        InitializeTransactionsGrid();
        InitializeVoucherDetailGrid();

        $("#btndiv_3").addClass("Actiev");
        $("#btndiv_1").removeClass("Actiev");
        $("#btndiv_2").removeClass("Actiev");

        $("#div_3").removeClass("display_none");
        $("#div_1").addClass("display_none");
        $("#div_2").addClass("display_none"); 

    }
    function InitalizeControls() {

        //DropdownLists
        ddlBranch = document.getElementById("ddlBranch") as HTMLSelectElement;

        //textboxs
        txtFromDate = document.getElementById("txtFromDate") as HTMLInputElement;
        txtToDate = document.getElementById("txtToDate") as HTMLInputElement;
        txtFromNumber = document.getElementById("txtFromNumber") as HTMLInputElement;
        txtToNumber = document.getElementById("txtToNumber") as HTMLInputElement;
        txtDebit = document.getElementById("txtDebit") as HTMLInputElement;
        txtCedit = document.getElementById("txtCedit") as HTMLInputElement;
        txtDesc = document.getElementById("txtDesc") as HTMLInputElement;
        txtDiff = document.getElementById("txtDiff") as HTMLInputElement;

        //labels
        lblVoucherNum = document.getElementById("lblVoucherNum") as HTMLLabelElement;

        //buttons
        btnLoad = document.getElementById("btnLoad") as HTMLButtonElement;
        btnShowVouchers = document.getElementById("btnShowVouchers") as HTMLButtonElement;
        btnCreateVoucher = document.getElementById("btnCreateVoucher") as HTMLButtonElement;
        btnSelectAll = document.getElementById("btnSelectAll") as HTMLButtonElement;
        btnReverseSelection = document.getElementById("btnReverseSelection") as HTMLButtonElement;
        btnUnSelectAll = document.getElementById("btnUnSelectAll") as HTMLButtonElement;

    }
    function InitializeEvents() {
        btnLoad.onclick = btnLoad_onclick;
        btnShowVouchers.onclick = btnShowVouchers_onclick;
        btnCreateVoucher.onclick = btnCreateVoucher_onclick;
        btnSelectAll.onclick = btnSelectAll_onclick;
        btnReverseSelection.onclick = btnReverseSelection_onclick;
        btnUnSelectAll.onclick = btnUnSelectAll_onclick;
    }

    //------------------------------------------------------ ButtonsRegion ----------------------------------
    function btnLoad_onclick() {

        if (!CheckDate(DateFormat(txtFromDate.value).toString(), DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), DateFormat(SysSession.CurrentEnvironment.EndDate).toString())) {
            WorningMessage('  التاريخ ليس متطابق مع تاريخ السنه (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', '  The date is not identical with the date of the year (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', "تحذير", "worning");
            Errorinput(txtFromDate);
            return
        }

        if (!CheckDate(DateFormat(txtToDate.value).toString(), DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), DateFormat(SysSession.CurrentEnvironment.EndDate).toString())) {
            WorningMessage('  التاريخ ليس متطابق مع تاريخ السنه (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', '  The date is not identical with the date of the year (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', "تحذير", "worning");
            Errorinput(txtToDate);
            return
        }

        var SelectFalg: boolean = false;
        if (ddlBranch.value == "null") {
            DisplayMassage("يجب اختيار الفرع", "you must Select Branch", MessageType.Error);
            Errorinput(ddlBranch);
            return;
        } else {
            var branchCode = Number(ddlBranch.value);
            var trType: string = "";
            for (let i = 0; i < SubSystemDetails.length; i++) {
                if (SubSystemDetails[i].Selected == true) {
                    if (trType != "") trType += " , ";
                    trType += "" + SubSystemDetails[i].TR_CODE + "";

                    SelectFalg = true;
                }
            }

            if (SelectFalg == false) {
                DisplayMassage("يجب اختيار الحركات", "you must Select Transactions", MessageType.Error);
                return;
            }

            var StartDate:string = DateFormatRep(txtFromDate.value);
            var EndDate:  string = DateFormatRep(txtToDate.value);
            var FromNum:  number =  0;
            var ToNum:    number =  0;
            if (txtFromNumber.value != "") {
                FromNum = Number(txtFromNumber.value);
            }
            if (txtToNumber.value != "") {
                ToNum = Number(txtToNumber.value);
            }
            Ajax.Callsync({
                type: "Get",
                url: sys.apiUrl("TranPosting", "LoadTransactions"),
                data: {
                    Comp: compcode, branchCode: branchCode, TrType: trType, StartDate: StartDate, EndDate: EndDate, FromNum: FromNum, ToNum: ToNum, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
                },
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        SubSystemDetails
                        LnkTransDetails = result.Response as Array<G_LnkTrans_Temp>;

                        LnkTransDetails = LnkTransDetails.filter(x => x.TR_NO != null).sort(function (a, b) { return a.TR_NO - b.TR_NO });
                        //LnkTransDetails = LnkTransDetails.filter(x => x.TR_NO != null && x.TR_CODE != null).sort(function (a, b) { return a.TR_CODE.localeCompare(b.TR_CODE) || b.TR_NO - a.TR_NO; });
                        //LnkTransDetails.sort(function (a, b) {
                        //    return a.TR_NO - b.TR_NO && Number(a.TR_CODE) - Number(b.TR_CODE);
                        //});
                        for (let i = 0; i < LnkTransDetails.length; i++) {
                            (LnkTransDetails[i].TR_DATE != null) ? LnkTransDetails[i].TR_DATE = DateFormatRep(LnkTransDetails[i].TR_DATE) : "";
                            if (lang == "ar")
                                (LnkTransDetails[i].IsGenerated == true) ? LnkTransDetails[i].IsGeneratedDesc = "تم " : "";
                            else
                                (LnkTransDetails[i].IsGenerated == true) ? LnkTransDetails[i].IsGeneratedDesc = "Done " : "";
                        }
                        InitializeTransactionsGrid();
                        TransactionsGrid.DataSource = LnkTransDetails;
                        TransactionsGrid.Bind();

                        $("#btndiv_3").removeClass("Actiev");
                        $("#btndiv_1").addClass("Actiev");
                        $("#btndiv_2").removeClass("Actiev");

                        $("#div_3").addClass("display_none");
                        $("#div_1").removeClass("display_none");
                        $("#div_2").addClass("display_none");
                    }

                }
            });
        }

    }
    function btnShowVouchers_onclick() {

        if (!CheckDate(DateFormat(txtFromDate.value).toString(), DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), DateFormat(SysSession.CurrentEnvironment.EndDate).toString())) {
            WorningMessage('  التاريخ ليس متطابق مع تاريخ السنه (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', '  The date is not identical with the date of the year (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', "تحذير", "worning");
            Errorinput(txtFromDate);
            return
        }

        if (!CheckDate(DateFormat(txtToDate.value).toString(), DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), DateFormat(SysSession.CurrentEnvironment.EndDate).toString())) {
            WorningMessage('  التاريخ ليس متطابق مع تاريخ السنه (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', '  The date is not identical with the date of the year (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', "تحذير", "worning");
            Errorinput(txtToDate);
            return
        }

        debitTot = 0;
        cerditTot = 0;
        diffTot = 0;
        debugger
        LnkTransDetails = new Array<G_LnkTrans_Temp>();
        LnkTransDetails = TransactionsGrid.DataSource;
        selectedLnkTransDetails = LnkTransDetails.filter(x => x.IsSelected == true)
        if (selectedLnkTransDetails.length != 0) {


            Ajax.Callsync({
                type: "POST",
                url: sys.apiUrl("TranPosting", "UpdateTransactions"),
                data: JSON.stringify(selectedLnkTransDetails),
                success: (d) => {
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        debugger;
                        GetLnkVoucherDetail = new Array<GQ_GetLnkVoucherDetail>();
                        VoucherDetailGrid.DataSource = new Array<GQ_GetLnkVoucherDetail>();
                        GetLnkVoucherDetail = result.Response as Array<GQ_GetLnkVoucherDetail>;
                        VoucherDetailGrid.DataSource = GetLnkVoucherDetail;
                        for (let i = 0; i < GetLnkVoucherDetail.length; i++) {
                            debitTot += GetLnkVoucherDetail[i].DEBIT;
                            cerditTot += GetLnkVoucherDetail[i].CREDIT;
                        }
                        diffTot = debitTot - cerditTot;

                        txtDebit.value = debitTot.RoundToSt(2).toLocaleString();
                        txtCedit.value = cerditTot.RoundToSt(2).toLocaleString();
                        txtDiff.value = diffTot.RoundToSt(2).toLocaleString();
                        var brID = Number(ddlBranch.value);
                        var txtBranch = BranchDetails.filter(s => s.BRA_CODE == brID);
                        if (lang == "ar")
                            txtDesc.value = "ملخص حركه  " + txtBranch[0].BRA_DESC + " الفتره من تاريخ " + txtFromDate.value + " الي تاريخ " + txtToDate.value;
                        else
                            txtDesc.value = "breif of transaction" + txtBranch[0].BRA_DESC + " period from date " + txtFromDate.value + " to date " + txtToDate.value;

                        VoucherDetailGrid.Bind();
                        RefreshTransactions();

                        $("#btndiv_3").removeClass("Actiev");
                        $("#btndiv_1").removeClass("Actiev");
                        $("#btndiv_2").addClass("Actiev");

                        $("#div_3").addClass("display_none");
                        $("#div_1").addClass("display_none");
                        $("#div_2").removeClass("display_none");

                    }

                }
            });
        }
        else {
            DisplayMassage("لا يوجد قيود لعرضها ", "There are no restrictions to display", MessageType.Error);
            return;
        }
    }
    function btnSelectAll_onclick() {
        for (let i = 0; i < LnkTransDetails.length; i++) {
            LnkTransDetails[i].IsSelected = true;
            updateselect(LnkTransDetails[i].ROW_ID, 1);
        }
        TransactionsGrid.DataSource = LnkTransDetails;
        TransactionsGrid.Bind();
    }
    function btnReverseSelection_onclick() {
        for (let i = 0; i < LnkTransDetails.length; i++) {
            if (LnkTransDetails[i].IsSelected == true) {
                LnkTransDetails[i].IsSelected = false;
                updateselect(LnkTransDetails[i].ROW_ID, 0)
            } else if (LnkTransDetails[i].IsSelected == false) {
                LnkTransDetails[i].IsSelected = true;
                updateselect(LnkTransDetails[i].ROW_ID, 1)
            }
        }
        TransactionsGrid.DataSource = LnkTransDetails;
        TransactionsGrid.Bind();


    }
    function btnUnSelectAll_onclick() {
        for (let i = 0; i < LnkTransDetails.length; i++) {
            LnkTransDetails[i].IsSelected = false;
            updateselect(LnkTransDetails[i].ROW_ID, 0);
        }
        TransactionsGrid.DataSource = LnkTransDetails;
        TransactionsGrid.Bind();

    }
    function btnCreateVoucher_onclick() {
        if (txtDesc.value == " ") {
            DisplayMassage("يجب ادخال الوصف", "you must enter description", MessageType.Error);
            Errorinput(txtDesc);
            return;
        }
        var isGeneratedFlag: boolean = false;
        for (let i = 0; i < LnkTransDetails.length; i++) {
            if (LnkTransDetails[i].IsGenerated == true) {
                isGeneratedFlag = true;
            }
        }
        if (isGeneratedFlag == false) {
            DisplayMassage("لا يوجد حركات للترحيل", "there is no transactions for posting", MessageType.Error);
            return;
        }

        if (!CheckDate(DateFormat(txtFromDate.value).toString(), DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), DateFormat(SysSession.CurrentEnvironment.EndDate).toString())) {
            WorningMessage('  التاريخ ليس متطابق مع تاريخ السنه (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', '  The date is not identical with the date of the year (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', "تحذير", "worning");
            Errorinput(txtFromDate);
            return
        }

        if (!CheckDate(DateFormat(txtToDate.value).toString(), DateFormat(SysSession.CurrentEnvironment.StartDate).toString(), DateFormat(SysSession.CurrentEnvironment.EndDate).toString())) {
            WorningMessage('  التاريخ ليس متطابق مع تاريخ السنه (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', '  The date is not identical with the date of the year (' + DateFormat(SysSession.CurrentEnvironment.StartDate).toString() + ')', "تحذير", "worning");
            Errorinput(txtToDate);
            return
        }

        var Desc: string = txtDesc.value;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("TranPosting", "GenerateVoucher"),
            data: {
                comp: compcode, branch: branch, Desc: Desc, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    if (result.Response != -1) {
                        lblVoucherNum.innerText = result.Response;

                        DisplayMassage("تم اصدار  سند قيد رقم  " + result.Response, "jouranl voucher number " + result.Response + "has been issued", MessageType.Succeed);
                        setTimeout(() => {
                            Clear();

                            $("#btndiv_3").removeClass("Actiev");
                            $("#btndiv_1").addClass("Actiev");
                            $("#btndiv_2").removeClass("Actiev");

                            $("#div_3").addClass("display_none");
                            $("#div_1").removeClass("display_none");
                            $("#div_2").addClass("display_none");
                        }, 5000);
                        RefreshTransactions();
                    }
                    else
                        DisplayMassage("لم تتم عملية الترحيل راجع اعدادات الربط  ", "Transposting process not accomplished please review connection settings", MessageType.Error);

                }
            }
        });

    }
    //------------------------------------------------------ Initialize Grid  Region ----------------------------------
    function InitializeSubSystemGrid() {

        let res: any = GetResourceList("");
        SubSystemGrid.ElementName = "SubSystemGrid";
        SubSystemGrid.PrimaryKey = "MODULE_CODE";
        SubSystemGrid.Paging = true;
        SubSystemGrid.PageSize = 10;
        SubSystemGrid.Sorting = true;
        SubSystemGrid.InsertionMode = JsGridInsertionMode.Binding;
        SubSystemGrid.Editing = false;
        SubSystemGrid.Inserting = false;
        SubSystemGrid.SelectedIndex = 1;
        SubSystemGrid.OnItemEditing = () => { };
        SubSystemGrid.Columns = [

            {
                title: res.TransSelect, css: "ColumPadding", name: "checkbox", width: "6%",
                itemTemplate: (s: string, item: G_LnkTrans): HTMLInputElement => {
                    let txt: HTMLInputElement = CreateElement("checkbox", "form-control checkbox", " ", " ", "", " ");
                    txt.style.height = "25px";
                    txt.style.width = "70px";
                    txt.onclick = (e) => {
                        if (txt.checked == true) {
                            item.Selected = true;

                        }
                        else {
                            item.Selected = false;
                        }
                    };

                    if (item.Selected == true) {
                        txt.checked = true;

                    }
                    else {
                        txt.checked = false;
                    }

                    return txt;
                }
            },
            { title: " ", name: "MODULE_CODE", type: "text", visible: false },
            { title: " ", name: "Statusflag", type: "text", visible: false },
            { title: res.TransSubSystem, name: "SUB_SYSTEM_CODE", type: "text", width: "5%" },
            { title: res.TransDesc, name: (lang == "ar" ? "TR_DESCA" : "TR_DESCE"), type: "text", width: "10%" },

        ];
        BindSubSystemGrid();
    }
    function BindSubSystemGrid() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("TranPosting", "GetAllTransactions"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    SubSystemDetails = result.Response as Array<G_LnkTrans>;
                    SubSystemGrid.DataSource = SubSystemDetails;
                    SubSystemGrid.Bind();
                }
            }
        });
    }
    function InitializeTransactionsGrid() {
        let res: any = GetResourceList("");
        TransactionsGrid.ElementName = "TransactionsGrid";
        TransactionsGrid.PrimaryKey = "ROW_ID";
        TransactionsGrid.Paging = true;
        TransactionsGrid.PageSize = 10;
        TransactionsGrid.Sorting = true;
        TransactionsGrid.InsertionMode = JsGridInsertionMode.Binding;
        TransactionsGrid.Editing = false;
        TransactionsGrid.Inserting = false;
        TransactionsGrid.SelectedIndex = 1;
        TransactionsGrid.OnItemEditing = () => { };
        TransactionsGrid.Columns = [
            { title: "ROW_ID", name: "ROW_ID", type: "text", width: "5%", visible: false },
            { title: res.TransTrType, name: "TR_CODE", type: "text", width: "17%" },
            { title: res.App_Number, name: "TR_NO", type: "text", width: "8%" },
            { title: res.App_date, name: "TR_DATE", type: "text", width: "10%" },
            { title: res.TransDesc, name: (lang == "ar" ? "TR_DESCA" : "TR_DESCE"), type: "text", width: "15%" },
            { title: res.value, name: "TR_AMOUNT", type: "text", width: "15%" },
            { title: res.User, name: "User_Code", type: "text", width: "15%" },
            {
                title: res.appSelect, css: "ColumPadding", name: "IsSelected", width: "6%",
                itemTemplate: (s: string, item: G_LnkTrans_Temp): HTMLInputElement => {
                    let txt: HTMLInputElement = CreateElement("checkbox", "form-control checkbox", " ", " ", "", " ");
                    txt.style.height = "25px";
                    txt.style.width = "70px";
                    txt.onclick = (e) => {
                        if (txt.checked == true) {
                            debugger
                            item.IsSelected = true;
                            updateselect(item.ROW_ID, 1)
                        } else {
                            updateselect(item.ROW_ID, 0)
                            item.IsSelected = false;
                        }
                    };
                    if (item.IsSelected == true) {
                        txt.checked = true;
                    } else
                        txt.checked = false;
                    return txt;
                }
            },
            { title: res.Trans_Generate, name: "IsGeneratedDesc", type: "text", width: "10%" },
            { title: res.App_Notes, name: "GenRemarks", type: "text", width: "15%" },
        ];

    }
    function updateselect(Rowid: string, isselect: number) {
        debugger
        let branchcode = Number(ddlBranch.value);
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("TranPosting", "Updateselect"),
            data: {
                Comp: compcode, branchCode: branchcode, ROW_ID: Rowid, Isselect: isselect, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;

            }
        });
    }
    function InitializeVoucherDetailGrid() {
        let res: any = GetResourceList("");
        VoucherDetailGrid.ElementName = "VoucherDetailGrid";
        VoucherDetailGrid.Paging = true;
        VoucherDetailGrid.PageSize = 10;
        VoucherDetailGrid.Sorting = true;
        VoucherDetailGrid.InsertionMode = JsGridInsertionMode.Binding;
        VoucherDetailGrid.Editing = false;
        VoucherDetailGrid.Inserting = false;
        VoucherDetailGrid.SelectedIndex = 1;
        VoucherDetailGrid.OnItemEditing = () => { };
        VoucherDetailGrid.Columns = [
            { title: res.App_serial, name: "Seq", type: "text", width: "5%" },
            { title: res.p_account_number, name: "ACC_CODE", type: "text", width: "14%" },
            { title: res.TransDesc, name: (lang == "ar" ? "ACC_DESCA" : "ACC_DESCL"), type: "text", width: "20%" },
            { title: res.App_Debtor, name: "DEBIT", type: "text", width: "15%" },
            { title: res.App_Creditor, name: "CREDIT", type: "text", width: "15%" },
            { title: res.menu_Costcenter, name: "CC_CODE", type: "text", width: "15%" },
            { title: res.TransCCDesc, name: (lang == "ar" ? "CC_DESCA" : "CC_DESCE"), type: "text", width: "15%" },
            { title: res.TransExplain, name: (lang == "ar" ? "LINE_DESCA" : "LINE_DESCE"), type: "text", width: "30%" },
            { title: res.Trns_TrNO, name: "Tr_No", type: "text", width: "15%" },
        ];
    }

    function RefreshTransactions() {
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("TranPosting", "GetTransactions"),
            data: { UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    LnkTransDetails = new Array<G_LnkTrans_Temp>();
                    LnkTransDetails = result.Response as Array<G_LnkTrans_Temp>;
                    for (let i = 0; i < LnkTransDetails.length; i++) {
                        (LnkTransDetails[i].TR_DATE != null) ? LnkTransDetails[i].TR_DATE = DateFormatRep(LnkTransDetails[i].TR_DATE) : "";
                        (LnkTransDetails[i].IsGenerated == true) ? LnkTransDetails[i].IsGeneratedDesc = "تم " : "";

                    }
                    InitializeTransactionsGrid();
                    TransactionsGrid.DataSource = LnkTransDetails;
                    TransactionsGrid.Bind();
                }
            }
        });
    }

    //------------------------------------------------------ Fill DropDownList Region ----------------------------------
    function fillddlBranch() {
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
                        DocumentActions.FillCombowithdefult(BranchDetails, ddlBranch, "BRA_CODE", "BRA_DESCL", "Select branch");
                    }
                    else {
                        DocumentActions.FillCombowithdefult(BranchDetails, ddlBranch, "BRA_CODE", "BRA_DESC", "اختر الفرع");
                    }

                }

            }
        });
    }

    //------------------------------------------------------ Date&& Clear Region ----------------------------------
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
    function Clear() {
        lblVoucherNum.innerText = "";
        txtDesc.value = "";
        txtCedit.value = "";
        txtDebit.value = "";
        txtDiff.value = "";
        txtFromNumber.value = "";
        txtToNumber.value = "";
        VoucherDetailGrid.DataSource = null;
        RefreshTransactions();
    }
}

