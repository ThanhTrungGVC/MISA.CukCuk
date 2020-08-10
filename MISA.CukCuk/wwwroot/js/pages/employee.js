var employeeJS;
$(document).ready(function () {
    employeeJS = new EmployeeJS();

    // bắt sự kiện lưu
    $(window).bind('keydown', function (event) {
        if (event.altKey || event.metaKey) {
            switch (String.fromCharCode(event.which).toLowerCase()) {
                case 'n':
                    event.preventDefault();
                    employeeJS.addEmployee();
                    break;
                case 'd':
                    event.preventDefault();
                    employeeJS.duplicateEmployee();
                    break;
                case 'e':
                    event.preventDefault();
                    employeeJS.editEmployee();
                    break;
            }
        } else {
            if (event.which == 46) {
                employeeJS.deleteEmployees();
            }
        }
    });
});

var listEmployees;            // biến lưu trữ thông tin nhân viên
var indexRowSelected = -1;      // biến lưu trữ vị trí bản ghi được click
var status = "none";            // trạng thái thêm sửa xóa
var pageLanguage = Resource.Language.VI;    // dữ liệu ngôn ngữ của trang web
var employeeAvatar = "/content/images/avatardefault.png";
var positions = commonJS.getAllPosition();
var maxCode = 0;

class EmployeeJS {
    constructor() {
        try {

            var positions = commonJS.getAllPosition();
            //in dữ liệu vị trí công việc
            $.each(positions, function (index, item) {
                $("#slPosition").append(new Option(item["PositionName"], item["PositionName"]));
            });

            var me = this;
            this.initEvent();
            listEmployees = this.getAllEmployees();          // gọi đến hàm lấy thông tin -> gán cho biến toàn cục
            me.loadData().bind(me);
        } catch (e) {
            
        }
    }

    /**
     * Thực hiện gán các sự kiện cho các thành phần trong trang
     * CreatedBy: NTT (28/07/2020)
     * */
    initEvent() {

        $("#btnAdd").on("click", 1, this.toolbarItemOnClick.bind(this));
        $("#btnDuplicate").on("click", 2, this.toolbarItemOnClick.bind(this));
        $("#btnEdit").on("click", 3, this.toolbarItemOnClick.bind(this));

        // khi nút xóa được click
        $("#btnDelete").click(this.deleteEmployees.bind(this));

        // close dialog
        $("#btn-close").click(this.closeDialog.bind(this));
        $("#btnCancel").click(this.hideDialog.bind(this));

        //// sự kiện khi click button Cất: lưu thông tin khách hàng mới thêm
        $("#btnSave").click(this.saveData.bind(this));
        $("#btnSaveAdd").click(this.saveAddData.bind(this));

        // khi một dòng được click
        $("#tbListEmployees").on("click", "tbody tr", 9999999, this.RowSelect);

        // các ô tìm kiếm được nhập
        $("#tbListEmployees input").on("keypress", this.searchEmployees.bind(this));

        // khi input thêm avatar có thay đổi
        $(".sp-add").on("change", this.previewFile);
        $("#close-avatar").on("click", this.closeAvatar);


        // khi số lượng hàng trên trang thay đổi (phần phân trang)
        $("#select-num-row").change(this.changeNumRow.bind(this));

        // khi trang thay đổi (phần phân trang)
        $("#page-number").change(this.loadData.bind(this));

        // hoạt động điều hướng trang
        $("#first-page").on("click", this.changeFirstPage.bind(this));      // trang đầu
        $("#pre-page").on("click", this.changePrePage.bind(this));          // trang trước
        $("#next-page").on("click", this.changeNextPage.bind(this));        // trang tiếp theo
        $("#end-page").on("click", this.changeEndPage.bind(this));          // trang cuối
    }

    toolbarItemOnClick(sender) {
        try {
            var formMode = sender.data;
            switch (formMode) {
                case Enum.FormMode.Add:
                    this.addEmployee();
                    break;
                case Enum.FormMode.Edit:
                    this.editEmployee();
                    break;
                case Enum.FormMode.Duplicate:
                    this.duplicateEmployee();
                    break;
                default:
            }

        } catch (e) {

        }
    }


//-------------------- Start: CÁC HÀM ĐÓNG MỞ DIALOG -------------------//
    /**
     * Hiển thị dialog
     * CreatedBy: NTT (22/07/2020)
     * */
    showDialog() {
        var me = this;
        var modal = $('#dialog');

        modal.show();
        
        var listEmlementFocus = 'input:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex="0"]';
        var listElements = modal.find(listEmlementFocus);
        listElements = Array.prototype.slice.call(listElements);

        var firstElement = listElements[0];
        var lastElement = listElements[listElements.length - 1];

        // Focus first child
        firstElement.focus();

        // Listen for and trap the keyboard
        modal.on('keydown', function (e) {
            // Check for TAB key press
            if (e.keyCode === 9) {

                // SHIFT + TAB
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }

                    // TAB
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            } else {
                // ESCAPE
                if (e.keyCode === 27) {
                    me.closeDialog();
                } else {
                    if (e.ctrlKey || e.metaKey) {
                        switch (String.fromCharCode(e.which).toLowerCase()) {
                            case 's':
                                e.preventDefault();
                                me.saveData();
                                break;
                            case 'q':
                                e.preventDefault();
                                me.hideDialog();
                                break;
                        }

                        if (e.shiftKey) {
                            if (String.fromCharCode(e.which).toLowerCase() == 's') {
                                me.saveAddData();
                            }
                        }
                    }
                }
            }
        });

        //bắt sự kiện nhập tiền lương
        $("#txtSalary").on("keypress keyup blur", function (event) {
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }

            var value = parseInt($(this).val().replace(/[\,]/g, ''))
            $(this).val(commonJS.formatMoney(value));
        });

        
    }

    /**
     * Ẩn dialog
     * CreatedBy: NTT (22/07/2020)
     * */
    hideDialog() {
        // xóa dữ liệu đang có trên dialog
        $('#dialog input').val("");
        $('#dialog select').val("");

        //avatar về mặc định
        this.closeAvatar();

        $("#dialog").hide();
    }

    /**
     * Đóng dialog 
     * nếu đang có dữ liệu: yêu cầu xác nhận trước khi đóng
     * khi click vào button đóng (hình dấu x) trên tiêu đề
     * CreatedBy: NTT (22/07/2020)
     * */
    closeDialog() {
        // kiểm tra nếu dữ liệu đang được nhập: this.hasDataDialog()
        if (this.hasDataDialog()) {
            if (confirm(pageLanguage.ConfirmCloseDialog)) {
                this.hideDialog();
            }
        } else {
            this.hideDialog();
        }
    }

//-------------------- End: CÁC HÀM ĐÓNG MỞ DIALOG -------------------//


//-------------------- Start: CÁC HÀM XỬ LÝ KHI LỰA CHỌN MỘT BẢN GHI -------------------------//
    /**
    * Lấy vị trí hàng được chọn
    * Hàng được lựa chọn sẽ đổi màu
    * CreatedBy: NTT (23/07/2020)
    * */
    RowSelect(e) {
        if (e.ctrlKey) {
            if ($(this).hasClass("row-selected")) {
                $(this).removeClass("row-selected");
            } else {
                $(this).addClass("row-selected");
            }
            
        } else {
            if ($(this).hasClass("row-selected")) {
                $(this).removeClass("row-selected");
            } else {
                commonJS.rowSelect(this);
            }
        }

        
    };

    /**
     * Lấy dữ liệu khách hàng khi chọn
     * CreatedBy: NTT (23/07/2020)
     * */
    getEmployeeSelected() {
        // lấy dòng được chọn
        var rowSelected = $("tr.row-selected");

        if (rowSelected.length > 0) {
            //lấy ID
            var employeeID = rowSelected.data('id');
            debugger
            var employee = $.ajax({
                method: 'GET',
                url: "/api/Employees/" + employeeID,
                async: false,
                dataType: 'json',
                data: {},
                contentType: "application/json",
                success: function (results) {
                    debugger
                    console.log(results.Messanger)
                },
                fail: function (results) {
                    debugger
                    console.log(results.Messanger);
                }
            }).responseJSON;
            debugger;

            return employee.Data;
        }
        else {
            alert("Bạn chưa chọn nhân viên! Vui lòng lựa chọn!");
            return false;
        }
    }
//-------------------- End: CÁC HÀM XỬ LÝ KHI LỰA CHỌN MỘT BẢN GHI -------------------------//


   


//-------------------- Start: CÁC HÀM LẤY - THÊM - SỬA - XOÁ - NHÂN BẢN - TÌM KIẾM KHÁCH HÀNG --------------------//
    /**
     * lấy thông tin toàn bộ khách hàng trên scdl
     * CreatedBy: NTT (29/07/2020
     * */
    getAllEmployees() {
        debugger;
        var employees = $.ajax({
            method: 'GET',
            url: "/api/Employees",
            async: false,
            dataType: 'json',
            data: {},
            contentType: "application/json",
            success: function (results) {
                debugger;
                //JSON.parse(results);
                //return results;
            },
            fail: function (jqXHR, textStatus, errorThrown) {
                debugger;
                console.log('Could not get posts, server response: ' + textStatus + ': ' + errorThrown);
            }
        }).responseJSON;
        debugger
        return employees.Data;
    }

    /**
     * hàm thêm dữ liệu khách hàng
     * CreatedBy: NTT (24/07/2020)
     * */
    addEmployee() {
        // đặt trạng thái
        status = "add";

        // hiện thị dialog
        this.showDialog();

        //set code
        var code = (maxCode+1).toString();
        while (code.length < 6) {
            code = "0" + code;
        }
        $("#txtEmployeeCode").val("NV" + code);
    }

    /**
     * Lưu thông tin và thêm mới form nhân viên
     * CreatedBy: NTTRUNG (08/08/2020)
     * */
    saveAddData() {
        // đặt trạng thái
        status = "add";

        //lưu thông tin
        this.saveData();

        // mở dialog
        this.showDialog();
    }

    /**
     * Hàm sử thông tin khách hàng được lựa chọn
     * CreatedBy: NTT (24/07/2020)
     * */
    editEmployee() {
        // đặt trạng thái
        status = "edit";

        if ($("tr.row-selected").length == 1) {
            // lấy thông tin khách hàng được lựa chọn
            var employee = this.getEmployeeSelected();

            if (employee) {
                // mở dialog khách hàng
                this.showDialog();

                // in thông tin khách hàng lên dialog
                this.bindDataDialog(employee);
                debugger
            }
        }

        if ($("tr.row-selected").length < 1) {
            alert("Bạn chưa chọn nhân viên! Vui lòng lựa chọn!");
        }

        if ($("tr.row-selected").length > 1) {
            alert("Bạn chỉ có thể sửa thông tin của từng nhân viên! Vui lòng lựa chọn lại!");
        }
    }

    /**
     * hàm nhân bản khách hàng
     * CreatedBy: NTT (28/07/2020)
     * */
    duplicateEmployee() {
        if ($("tr.row-selected").length == 1) {
            // đặt trạng thái
            status = "duplicate";

            // lấy thông tin khách hàng được lựa chọn
            var employee = this.getEmployeeSelected();

            if (employee) {
                // mở dialog khách hàng
                this.showDialog();

                // in thông tin khách hàng lên dialog
                this.bindDataDialog(employee);

                // xoá mã khách hàng cũ
                $("#txtEmployeeCode").val("");
            }
        }

        if ($("tr.row-selected").length < 1) {
            alert("Bạn chưa chọn nhân viên! Vui lòng lựa chọn!");
        }

        if ($("tr.row-selected").length > 1) {
            alert("Phiên bản hiện tại chỉ hỗ trợ nhân bản thông tin của một nhân viên! Vui lòng lựa chọn lại!");
        }
        
    }

    /**
     * hàm xóa dữ liệu nhân viên
     * CreatedBy: NTT (24/07/2020)
     * */
    deleteEmployees() {

        var me = this;
        var mesess;

        // lấy thông tin khách hàng được lựa chọn
        var rowSelected = $("tr.row-selected");

        if (rowSelected.length > 0) {
            if (confirm(pageLanguage.ConfirmDelete)) {
                $.each(rowSelected, function (index, item) {
                    var employeeID = $(item).data("id");
                    debugger;
                    $.ajax({
                        url: "/api/Employees/" + employeeID,
                        method: "DELETE",
                        data: {},
                        async: false,
                        dataType: "json",
                        contentType: "application/json",
                    }).done(function (res) {
                        debugger
                        mesess = res.Messanger;
                    }).fail(function (res) {
                        debugger
                        alert(res.Messanger);
                    });
                });

                alert(mesess);
                

                // load lại dữ liệu - gọi lại api để lấy lại dữ liệu sau khi thay đổi
                listEmployees = me.getAllEmployees();

                me.loadData();
            }
        } else {
            alert("Bạn cần chọn nhân viên trước khi xóa!");
        }
    }

    /**
     * tìm kiếm khách hàng theo chuỗi nhập vào
     * CreatedBy: NTT (04/08/2020)
     * */
    searchEmployees(e) {
        if (e.which == 13) {
            //lấy dữ liệu từ form
            var employee = {
                EmployeeCode: $("#s_EmployeeCode").val(),
                FullName: $("#s_EmployeeName").val(),
                CompanyName: $("#s_Company").val(),
                TaxCode: $("#s_TaxCode").val(),
                Address: $("#s_Address").val(),
                //Birthday: $("#s_Birthday").val(),
                //WorkState: $("#s_WorkSate").val(),
            }

            debugger;
            var employee_search = $.ajax({
                method: 'POST',
                url: "/api/Employees/search",
                async: false,
                dataType: 'json',
                data: JSON.stringify(employee),
                contentType: "application/json",
                success: function (results) {
                    debugger;
                    console.log(results.Messanger);
                    //JSON.parse(results);
                    //return results;
                },
                fail: function (results) {
                    debugger;
                    console.log(results.Messanger);
                }
            }).responseJSON;
            debugger

            //truyền ra biến
            listEmployees = employee_search.Data;

            this.loadData();
        }
    }
//-------------------- End: CÁC HÀM LẤY - THÊM - SỬA - XOÁ - NHÂN BẢN - TÌM KIẾM KHÁCH HÀNG --------------------//


//-------------------- Start: CÁC HÀM XỬ LÝ TRÊN DIALOG (check dữ liệu, lấy dữ liệu, in dữ liệu) --------------------//
    /**
     * hàm kiểm tra dialog có dữ liệu
     * CreatedBy: NTT (01/08/2020)
     * */
    hasDataDialog() {
        // in dữ liệu của khách hàng lên dialog
        if ($("#txtEmployeeCode").val() || $("#txtFullName").val() || $("#dtBirthday").val() || $("#txtEmail").val()
            || $("#txtPhoneNumber").val() || $("#txtIdentityCode").val() || $("#dtIdentityDate").val()
            || $("#txtIdentitySate").val() || $("#txtDepartmand").val() || $("#txtTaxCode").val() || $("#txtSalary").val() || $("#dtStartWorkDate").val()) { return true };

        return false;
    }

    /**
     * in dữ liệu nhân viên lên dialog
     * CreatedBy: NTT (01/08/2020)
     * */
    bindDataDialog(employee) {
        // xử lý dữ liệu
        var birthday = commonJS.formatDefaultDate(employee.Birthday);
        var identityDate = commonJS.formatDefaultDate(employee.DateOfIdentity);
        var startWorkDate = commonJS.formatDefaultDate(employee.StartWorkDate);

        var gender = commonJS.genderToValue(employee.Gender);
        var stateWorlk = commonJS.workStateToValue(employee.WorkState);
        var position = commonJS.positionToValue(employee.PositionId);

        // in dữ liệu của khách hàng lên dialog
        $("#txtEmployeeCode").val(employee.EmployeeCode);
        $("#txtFullName").val(employee.FullName);
        $("#txtEmail").val(employee.Email);
        $("#txtPhoneNumber").val(employee.PhoneNumber);
        $("#txtIdentityCode").val(employee.CitizenIdentityCode);
        $("#txtIdentitySate").val(employee.StateOfIdentity);
        $("#txtDepartmand").val(employee.Department);
        $("#txtTaxCode").val(employee.TaxCode);
        $("#txtSalary").val(commonJS.formatMoney(employee.Salary) + "  (VNĐ)");

        $("#dtBirthday").val(birthday);
        $("#dtIdentityDate").val(identityDate);
        $("#dtStartWorkDate").val(startWorkDate);

        $("#slGender").val(gender);
        $("#slStateWork").val(stateWorlk);
        $("#slPosition").val(position);

        const preview = document.querySelector('.img img');
        preview.src = employee.Image;
    }

    /**
     * lấy dữ liệu từ form nhân viên
     * CreatedBy: NTT (28/07/2020)
     * */
    getValueInDialog() {
        // lấy dữ liệu từ dialog
        var inputInfoEmployee = {
            employeeID: "",
            employeeCode: $("#txtEmployeeCode").val(),
            fullName: $("#txtFullName").val(),
            email: $("#txtEmail").val(),
            phoneNumber: $("#txtPhoneNumber").val(),
            citizenIdentityCode: $("#txtIdentityCode").val(),
            stateOfIdentity: $("#txtIdentitySate").val(),
            department: $("#txtDepartmand").val(),
            taxCode: $("#txtTaxCode").val(),
            salary: parseInt($("#txtSalary").val().replace(/[\,]/g, '')) || 0,
            birthday: $("#dtBirthday").val() || null,
            dateOfIdentity: $("#dtIdentityDate").val() || null,
            startWorkDate: $("#dtStartWorkDate").val() || null,
            gender: $("#slGender").val(),
            workState: $("#slStateWork").val(),
            positionCode: $("#slPosition").val(),
            image: $("#avatar-img")[0].src,
        };

        if (inputInfoEmployee.positionCode == "") {
            inputInfoEmployee.positionCode = "default";
        }
        debugger;
        return inputInfoEmployee;
    }

    /**
     * load ảnh lên dialog
     * CreatedBy: NTT (28/07/2020)
     * */
    previewFile() {
        const preview = document.querySelector('.img img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            preview.src = reader.result;
            employeeAvatar = reader.result;
            debugger;
        }, false);

        if (file) {
            debugger
            reader.readAsDataURL(file);
            debugger
        }
    }

    /**
     * đưa avatar về mặc định
     * 
     * */
    closeAvatar() {
        employeeAvatar = "/content/images/avatardefault.png";
        const preview = document.querySelector('.img img');
        preview.src = employeeAvatar;
    }
//-------------------- End: CÁC HÀM XỬ LÝ TRÊN DIALOG (check dữ liệu, lấy dữ liệu, in dữ liệu) --------------------//


//-------------------- Validate dữ liệu, load data -------------------//

    /**
     * Kiểm tra dữ liệu nhập vào
     * @param {Object(customer)} inputInfoCustomer
     * CreatedBy: NTT (24/07/2020)
     */
    validateForm(inputInfoEmployee) {

        // kiểm tra trường mã nhân viên
        if (inputInfoEmployee.employeeCode == "") {
            alert("Mã nhân viên không được để trống!");
            $("#txtEmployeeCode").focus();
            return false;
        }

        // kiểm tra trường tên nhân viên
        if (inputInfoEmployee.fullName == "") {
            alert(pageLanguage.NullInputCustomerName);
            $("#txtFullName").focus();
            return false;
        }

        // kiểm tra trường số điện thoại
        if (inputInfoEmployee.phoneNumber == "") {
            alert(pageLanguage.NullInputPhone);
            $("#txtPhoneNumber").focus();
            return false;
        }

        // kiểm tra định dạng email
        if (!commonJS.validateEmail(inputInfoEmployee.email)) {
            alert(pageLanguage.ErrorEmail);
            $("#txtEmail").focus();
            return false;
        }
        

        return true;
    }

    /**
     * Load thông tin dữ liệu ra bảng
     * CreatedBy: NTTRUNG (22/07/2020)
     * */
    loadData() {
        try {
            // reset dữ liệu
            $('table#tbListEmployees tbody').empty();

            // lấy vị trí các hàng cần in dữ liệu
            var indexRowStart = commonJS.getIndexStartRow() - 1;
            var indexRowEnd = commonJS.getIndexEndRow(listEmployees.length) - 1;
            
            for (var i = indexRowStart; i <= indexRowEnd; i++) {
                debugger
                var item = listEmployees[i];
                item['Department'] = item['Department'] || "";
                item['TaxCode'] = item['TaxCode'] || "";
                item['Email'] = item['Email'] || "";

                var code = parseInt(item['EmployeeCode'].replace("NV", ""));
                if (code > maxCode) maxCode = code;

                var employeeInfoHTML = $(`<tr>
                                <td class="td-first">`+ item['EmployeeCode'] + `</td>
                                <td>`+ item['FullName'] + `</td>
                                <td>`+ item['Department'] + `</td>
                                <td>`+ positions.find(x => x.PositionID == item['PositionId']).PositionName  + `</td>
                                <td>`+ item['TaxCode'] + `</td>
                                <td class="align-center">`+ commonJS.formatDate(item['Birthday']) + `</td>
                                <td class="align-right">`+ commonJS.formatMoney(item["Salary"]) + `</td>
                                <td>`+ commonJS.workStateToValue(item['WorkState']) + `</td>
                                <td>`+ item['Email'] + `</td>
                            </tr>`);
                if ($("tr td").val() == "null") {
                    $("tr td").val("");
                }
                employeeInfoHTML.data("id", item["EmployeeID"]);

                $('table#tbListEmployees tbody').append(employeeInfoHTML);
            }

            this.setValue();
        } catch (e) {
            //console.log(e);
        }
    }
//-------------------- Validate dữ liệu, load data -------------------//


//-------------------- Start: CÁC HÀM XỬ LÝ LƯU DỮ LIỆU ------------------//

    /**
     * Lưu lại thông tin khách hàng
     * CreatedBy: NTTRUNG (08/08/2020)
     * */
    saveData() {

        var inputInfoEmployee = this.getValueInDialog();

        // kiểm tra dữ liệu
        var canSave = this.validateForm(inputInfoEmployee);
        debugger
        if (canSave) {
            // chuyển dữ liệu thành 1 đối tượng customer
            var employee =
            {
                EmployeeCode: inputInfoEmployee.employeeCode,
                FullName: inputInfoEmployee.fullName,
                Gender: commonJS.valueToGender(inputInfoEmployee.gender),
                TaxCode: inputInfoEmployee.taxCode,
                CompanyName: "Công ty cổ phần MISA",
                Email: inputInfoEmployee.email,
                PhoneNumber: inputInfoEmployee.phoneNumber,
                Address: "",
                Birthday: inputInfoEmployee.birthday,
                WorkState: commonJS.valueToWorkState(inputInfoEmployee.workState),
                CitizenIdentityCode: inputInfoEmployee.citizenIdentityCode,
                DateOfIdentity: inputInfoEmployee.dateOfIdentity,
                StateOfIdentity: inputInfoEmployee.stateOfIdentity,
                PositionId: commonJS.valueToPosition(inputInfoEmployee.positionCode),
                Department: inputInfoEmployee.department,
                StartWorkDate: inputInfoEmployee.startWorkDate,
                Salary: inputInfoEmployee.salary,
                Image: inputInfoEmployee.image,
            };
            debugger
            // lưu lại trên csdl với employee
            this.databaseSave(employee);

        }

    }

    /**Lưu lại trên CSDL
     * CreatedBy: NTTRUNG (22/07/2020)
     * */
    databaseSave(employee) {
        var me = this;

        if (status == "add" || status == "duplicate") {
            //fakeData.push(customer);

            $.ajax({
                url: "/api/Employees",
                method: "POST",
                async: false,
                data: JSON.stringify(employee),
                dataType: "text",
                contentType: "application/json",
            }).done(function (res) {
                res = jQuery.parseJSON(res);
                debugger
                if (parseInt(res.Data) == 1) {
                    // thông báo trạng thái lưu: thành công/thất bại
                    alert(res.Messanger);

                    // đóng dialog
                    me.hideDialog();

                    // tải lại dữ liệu từ CSDL
                    listEmployees = me.getAllEmployees();
                    me.loadData();
                } else {
                    alert("Mã nhân viên đã tồn tại! Vui lòng thử lại!");
                    $('#dialog input')[0].focus();
                }
                

            }).fail(function (res) {
                alert(res.Messanger);
                debugger;
            })


        }

        if (status == "edit") {

            var rowSelected = $("tr.row-selected");
            var employeeID = rowSelected.data('id');
            employee.EmployeeID = employeeID;

            debugger;
            $.ajax({
                url: "/api/Employees/" + employeeID,
                method: "PUT",
                async: false,
                data: JSON.stringify(employee),
                dataType: "json",
                contentType: "application/json",
            }).done(function (res) {
                debugger
                if (parseInt(res.Data) == 1) {
                    debugger
                    // thông báo trạng thái lưu: thành công/thất bại
                    alert(res.Messanger);

                    // đóng dialog
                    me.hideDialog();

                    // load lại dữ liệu
                    listEmployees = me.getAllEmployees();
                    me.loadData();

                    debugger;
                } else {
                    alert("Bạn không thể nhập trùng mã nhân viên! Vui lòng thử lại!");
                    $('#dialog input')[0].focus();
                }
            }).fail(function (res) {
                alert(res.Messanger);
                debugger;
            })

        }

        // đặt lại trạng thái
        status = "none";
    }
//-------------------- End: CÁC HÀM XỬ LÝ LƯU DỮ LIỆU -------------------//

//-------------------- Start: CÁC HÀM ĐIỀU HƯỚNG, PHÂN TRANG ----------------------//
    /**
     * Hàm lấy thông tin phân trang và in lên html
     * CreatedBy: NTT (28/07/2020)
     * */
    setValue() {
        var totalRow = listEmployees.length;
        var totalPage = commonJS.getTotalPage(totalRow);
        var indexRowStart = commonJS.getIndexStartRow();
        var indexRowEnd = commonJS.getIndexEndRow(totalRow);
        debugger;


        $("#number-row-total").html(totalRow);
        $("#number-row-start").html(indexRowStart);
        $("#number-row-end").html(indexRowEnd);
        $("#total-page").html("trên " + totalPage);
    }

    /**
     * hàm xử lý khi số lượng hàng trên 1 trang thay đổi, chuyển về trang 1
     * CreatedBy: NTT (28/07/2020)
     * */
    changeNumRow() {
        // chuyển về trang 1
        commonJS.setPageFirst(this);
    }

    /**
     * chuyển về trang đầu tiên
     * CreatedBy: NTT (28/07/2020)
     * */
    changeFirstPage() {
        commonJS.setPageFirst(this);
    }

    /**
     * chuyển về trang trước
     * CreatedBy: NTT (28/07/2020)
     * */
    changePrePage() {
        commonJS.changePrePage(this);
    }

    /**
     * chuyển đến trang kế tiếp
     * CreatedBy: NTT (28/07/2020)
     * */
    changeNextPage() {
        commonJS.changeNextPage(this, listEmployees.length);
    }

    /**
     * chuyển đến trang cuối cùng
     * CreatedBy: NTT (28/07/2020)*/
    changeEndPage() {
        commonJS.changeEndPage(this, listEmployees.length);
    }
//-------------------- End: CÁC HÀM ĐIỀU HƯỚNG, PHÂN TRANG ----------------------//
}