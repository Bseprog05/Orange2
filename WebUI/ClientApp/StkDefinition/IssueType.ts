﻿
$(document).ready(() => {
    IssueType.InitalizeComponent();
})

namespace IssueType {

    var Details: Array<I_D_IssueType> = new Array<I_D_IssueType>();   
    var DisplayDetail: Array<I_D_IssueType> = new Array<I_D_IssueType>();   
    var btnsave: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var btnedite: HTMLButtonElement;
    var sys: SystemTools = new SystemTools();    
    var SysSession: SystemSession = GetSystemSession(Modules.IssueType);
    var Model: I_D_IssueType = new I_D_IssueType();
    var AccDataData: Array<A_ACCOUNT> = new Array<A_ACCOUNT>();
    var CountGrid = 0;
    var compcode: Number;//SharedSession.CurrentEnvironment.CompCode;
    var btnback: HTMLButtonElement;

    var lang = (SysSession.CurrentEnvironment.ScreenLanguage);

    export function InitalizeComponent() {

        if (SysSession.CurrentEnvironment.ScreenLanguage == "ar") {
            document.getElementById('Screen_name').innerHTML = "انواع الصرف";

        } else {
            document.getElementById('Screen_name').innerHTML = "Payment Type";

        }                
        compcode = Number(SysSession.CurrentEnvironment.CompCode);    
        InitalizeControls();
        InitalizeEvents();     
        GetddlAcc();
        Display();

    }
    
    

    function InitalizeControls() {
        ////debugger;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnedite = document.getElementById("btnedite") as HTMLButtonElement;
        btnsave = document.getElementById("btnsave") as HTMLButtonElement;
        btnback = document.getElementById("btnback") as HTMLButtonElement;

        // Buton privialges for single record page



    }

    function InitalizeEvents() {
        ////debugger;
        btnAddDetails.onclick = AddNewRow;//
        btnsave.onclick = btnsave_onClick;
        btnback.onclick = btnback_onclick;
        btnedite.onclick = btnedite_onclick;
    }

    function AddNewRow() {        

        if (!SysSession.CurrentPrivileges.AddNew) return; 
                               
        var CanAdd: boolean = true;
      
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {
                debugger
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
     
        if (CanAdd) {
            BuildControls(CountGrid);
            $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode         
            $("#txtDescA" + CountGrid).removeAttr("disabled");
            $("#txtDescE" + CountGrid).removeAttr("disabled");
            $("#ddlAcc" + CountGrid).removeAttr("disabled");
            $("#Txt_Remarks" + CountGrid).removeAttr("disabled");    
            $("#btn_minus" + CountGrid).removeClass("display_none");
            $("#btn_minus" + CountGrid).removeAttr("disabled");
            $("#btnedite").removeClass("display_none"); 
            CountGrid++;
        }
        $("#btnedite").addClass("display_none");
    }


    function BuildControls(cnt: number) {

        var html="";

        html = '<div id="No_Row' + cnt + '" class="col-lg-12"><div class="col-lg-12"><div class="col-lg-1 style_pading" style="width:1%;"><span id="btn_minus' + cnt + '" class="glyphicon glyphicon-remove-sign fontitm3AccDefBox  minus_btn"></span></div><div class="col-lg-3 style_pading"><input id="txtDescA' + cnt + '" type="text" class="form-control right3" disabled="disabled" /></div><div class="col-lg-3 style_pading"><input id="txtDescE' + cnt + '" type="text" class="form-control right3" disabled="disabled" /></div><div class="col-lg-2 style_pading "><select id="ddlAcc' + cnt + '" style="display: none; width:100%" disabled class="ddlAcc col-lg-2 col-md-2 col-sm-2 col-xl-2 col-xs-2 pading_2"><option value="Null">' + (lang == "ar" ? "اختر رقم الحساب" : "Choose Account Number") + '</option></select></div><div class="col-lg-3 style_pading" style="width:30%;"><input id="Txt_Remarks' + cnt + '" type="text" class="form-control right3" disabled="disabled" /></div><div class="col-lg-1"><input id="txt_StatusFlag' + cnt + '" name=" " type="hidden" disabled class="form-control" /></div><div class="col-lg-1"><input id="IssueTypeID' + cnt + '" name=" " type="hidden" class="form-control" /></div></div></div>';

      
        $("#div_Data").append(html);

        if (SysSession.CurrentPrivileges.Remove) { 
            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }
        else {
            $("#btn_minus" + cnt).addClass("display_none");
            $("#btn_minus" + cnt).attr("disabled", "disabled");
        }

        $(document).ready(function () {
            // Initialize select2
            $("#ddlAcc" + cnt).select2();  
            // Read selected option
            $('#but_read' + cnt).click(function () {
                var username = $('#ddlAcc' + cnt + ' option:selected').text();
                var userid = $('#ddlAcc' + cnt + '').val();  
                $('#result').html("id : " + userid + ", name : " + username);
            });
        });


        for (var i = 0; i < AccDataData.length; i++) {
            if (SysSession.CurrentEnvironment.ScreenLanguage == "ar")
                $('#ddlAcc' + cnt).append('<option value="' + AccDataData[i].ACC_CODE + '">' + AccDataData[i].ACC_DESCA + '</option>');
            else
                $('#ddlAcc' + cnt).append('<option value="' + AccDataData[i].ACC_CODE + '">' + AccDataData[i].ACC_DESCL + '</option>');
        }
        $("#btn_minus" + cnt).on('click', function () {  
            DeleteRow(cnt);
        }); 
        $("#txtDescA" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
        $("#txtDescE" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });
      
        $("#Txt_Remarks" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });    


        $("#ddlAcc" + cnt).on('change', function () {
            if ($("#txt_StatusFlag" + cnt).val() != "i")
                $("#txt_StatusFlag" + cnt).val("u");
        });   
        return;
    }

    function btnsave_onClick() {   
        loading('btnsave');     

        setTimeout(function () {

            finishSave('btnsave');

        var CanAdd: boolean = true;
        if (CountGrid == 0) {
            WorningMessage('يجب الاضافة للحفظ', 'Must Add for saving', 'خطاء', 'Erorr');
            Errorinput(btnAddDetails);
            CanAdd = false;
            return
        }
        if (CountGrid > 0) {
            for (var i = 0; i < CountGrid; i++) {
                debugger
                CanAdd = Validation_Grid(i);
                if (CanAdd == false) {
                    break;
                }
            }
        }
        if (CanAdd) {
            Update();
            }
        }, 100);
    }   
    
    function btnedite_onclick() {      
        if (!SysSession.CurrentPrivileges.EDIT) return;    

        $('#btnsave').removeClass("display_none");
        $('#btnback').removeClass("display_none");
        $("#div_ContentData :input").removeAttr("disabled");
        $("#btnedite").addClass("display_none");    
        $(".disable").attr("disabled", "disabled");   

        if (SysSession.CurrentPrivileges.Remove ==true) {
            $(".minus_btn").removeClass("display_none");    
        }
        else {  
            $(".minus_btn").addClass("display_none");   
        }
        debugger
        if (SysSession.CurrentPrivileges.AddNew == true) {
            $(".btnAddDetails").removeAttr("disabled");
            $('#btnAddDetails').removeClass("display_none");
        } else {
            $(".btnAddDetails").attr("disabled", "disabled");
            $('#btnAddDetails').addClass("display_none");
        }   
    }
         

    function Display() {
        debugger;
        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("Stk_TR_IssueToCC", "GetAllIssueTypes"),
            data: {
                CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DisplayDetail = result.Response as Array<I_D_IssueType>;
                    for (var i = 0; i < DisplayDetail.length; i++) {

                        debugger
                        BuildControls(i);  
                        $("#IssueTypeID" + i).val(DisplayDetail[i].IssueTypeID); 
                        $("#txtDescA" + i).val(DisplayDetail[i].DescA); 
                        $("#txtDescE" + i).val(DisplayDetail[i].DescE); 
                        $('#ddlAcc'+ i + '  option[value=' + DisplayDetail[i].GL_Acc_Code + ']').prop('selected', 'selected').change();
                        $("#Txt_Remarks" + i).val(DisplayDetail[i].Remarks);  
                        CountGrid++
                    }
                }
            }
        });
    }

    function GetddlAcc() {

        Ajax.Callsync({
            type: "Get",
            url: sys.apiUrl("GLDefAccount", "GetAccDetailByComp"),
            data: { CompCode: compcode, UserCode: SysSession.CurrentEnvironment.UserCode, Token: "HGFD-" + SysSession.CurrentEnvironment.Token },
            success: (d) => {
                let result = d as BaseResponse;
                AccDataData = result.Response as Array<A_ACCOUNT>;
            }
        });
    }
    function DeleteRow(RecNo: number) {

        if (!SysSession.CurrentPrivileges.Remove) return;
        WorningMessage("هل تريد الحذف؟", "Do you want to delete?", "تحذير", "worning", () => {
          
            $("#txt_StatusFlag" + RecNo).val() == 'i' ? $("#txt_StatusFlag" + RecNo).val('m') : $("#txt_StatusFlag" + RecNo).val('d');

            $("#No_Row" + RecNo).attr("hidden", "true"); 
            //$("#txtCode" + RecNo).val("000");
        });
    }

    function btnback_onclick() {   
         
        $('#btnsave').addClass("display_none");
        $('#btnback').addClass("display_none");
        $("#div_ContentData :input").attr("disabled", "true");
        $(".minus_btn").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");
        $(".btnAddDetails").attr("disabled", "disabled");      
        $("#btnAddDetails").addClass("display_none");
       // DisplayAccDefBox();
    }           
    function Validation_Grid(rowcount: number) {

        if ($("#txt_StatusFlag" + rowcount).val() == "d" || $("#txt_StatusFlag" + rowcount).val() == "m") {
            return true;
        }
        else {



            if ($("#txtDescA" + rowcount).val() == "") {
                $("#txtDescA" + rowcount).val($("#txtDescE" + rowcount).val());
            }
            if ($("#txtDescE" + rowcount).val() == "") {
                $("#txtDescE" + rowcount).val($("#txtDescA" + rowcount).val());
            }

            if ((lang == "ar" ? $("#txtDescA" + rowcount).val() : $("#txtDescE" + rowcount).val()) == '') {

                WorningMessage('ادخل الاسم العربي ', 'Enter The Arabic Name ', 'خطاء', 'Erorr');
                Errorinput((lang == "ar" ? $("#txtDescA" + rowcount) : $("#txtDescE" + rowcount)));
                return false;

            }

            if ($("#txtAcount" + rowcount).val() == 'Null') {
                WorningMessage('اختار رقم الحساب', 'Enter The code', 'خطاء', 'Erorr');     
                Errorinput($("#txtAcount" + rowcount));
                return false;

            }

            if ($("#txtAcount_Code" + rowcount).val() == 'Null') {
                WorningMessage('اختار رقم حساب الشبكة ', 'Enter The Network Account Number', 'خطاء', 'Erorr');     
                Errorinput($("#txtAcount_Code" + rowcount));
                return false;

            }

           

        }
        return true;
    }    

    function Assign() {
        debugger

        Details = new Array<I_D_IssueType>();
        var StatusFlag: string;
        for (var i = 0; i < CountGrid; i++) {
            Model = new I_D_IssueType(); 
            StatusFlag = $("#txt_StatusFlag" + i).val();  
            if (StatusFlag == "i") {
                Model.StatusFlag = StatusFlag;
                Model.IssueTypeID = 0;
                Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
                Model.DescA = $("#txtDescA" + i).val();
                Model.DescE = $("#txtDescE" + i).val();
                Model.GL_Acc_Code = $("#ddlAcc" + i).val();
                Model.Remarks = $("#Txt_Remarks" + i).val();
                Model.CreatedAt = GetDate();
                Model.CreatedBy = SysSession.CurrentEnvironment.UserCode;   
                Details.push(Model); 
            }
            if (StatusFlag == "u") {
                Model.StatusFlag = StatusFlag;
                Model.IssueTypeID = Number($("#IssueTypeID" + i).val());
                Model.CompCode = Number(SysSession.CurrentEnvironment.CompCode);
                Model.DescA = $("#txtDescA" + i).val();
                Model.DescE = $("#txtDescE" + i).val();
                Model.GL_Acc_Code = $("#ddlAcc" + i).val();
                Model.Remarks = $("#Txt_Remarks" + i).val();
                Model.CreatedAt = Details[i].CreatedAt;
                Model.CreatedBy = Details[i].CreatedBy;
                Model.UpdatedAt = GetDate();
                Model.UpdatedBy = SysSession.CurrentEnvironment.UserCode;

                Details.push(Model);  
            }
            if (StatusFlag == "d") {
                if ($("#IssueTypeID" + i).val() != "") {
                    var UpdatedDetail = Details.filter(x => x.CompCode == $("#IssueTypeID" + i).val())
                    UpdatedDetail[0].StatusFlag = StatusFlag.toString();
                } 
            }  
        }
    } 
    function Update() {
        Assign();

        Details[0].Token = "HGFD-" + SysSession.CurrentEnvironment.Token;
        Details[0].UserCode = SysSession.CurrentEnvironment.UserCode;
        console.log(Details); 
        var stringDetail: string = JSON.stringify(Details);
        Ajax.Callsync({

            type: "Get",
            url: sys.apiUrl("Stk_TR_IssueToCC", "UpdateLISTIssueTypes"),
            data: { stringDetail: stringDetail},
            success: (d) => {
                //debugger
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    WorningMessage("تم الحفظ!", "Saved!", "تحذير", "worning");
                    success();
                }
                else {
                    //debugger;
                    MessageBox.Show(result.ErrorMessage, "خطأ");
                }
            }
        });
    }     
    function success() {
        $('#btnsave').addClass("display_none");
        $('#btnback').addClass("display_none");
        $("#div_ContentData :input").attr("disabled", "true");
        $(".minus_btn").addClass("display_none");
        $("#btnedite").removeClass("display_none");
        $("#btnedite").removeAttr("disabled");
        $(".btnAddDetails").attr("disabled", "disabled");
        $("#btnAddDetails").addClass("display_none");
        Display();
    }

}           










