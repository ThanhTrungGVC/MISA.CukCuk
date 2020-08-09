$(document).ready(function () {
    var customerJS = new CustomerJS();
});

class CustomerJS {
    constructor() {
        try {
            var me = this;
            me.initEvent();
            allCustomer = me.getAllCustomer();          // gọi đến hàm lấy thông tin -> gán cho biến toàn cục
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

        // close dialog
        $("#popup-close").click(this.closeDialog.bind(this));
        $("#btnCancel").click(this.hideDialog);

        // sự kiện khi click button Cất: lưu thông tin khách hàng mới thêm
        $("#btnSave").click(this.saveData.bind(this));

        // khi một dòng được click
        //$('#tbListCustomer tr').on('click', this.RowSelect.bind(this));
        $("#tbListCustomer").on("click", "tbody tr", 9999999, this.RowSelect);

        // khi nút xóa được click
        $("#btnDelete").click(this.deleteCustomer.bind(this));

        // các ô tìm kiếm được nhập
        $("#tbListCustomer input").on("keypress", this.searchCustomer.bind(this));

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
                    this.addCustomer();
                    break;
                case Enum.FormMode.Edit:
                    this.editCustomer();
                    break;
                case Enum.FormMode.Duplicate:
                    this.duplicateCustumer();
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
        $("#popup").show();
        $('#popup input')[0].focus();
    }

    /**
     * Ẩn dialog
     * CreatedBy: NTT (22/07/2020)
     * */
    hideDialog() {
        // xóa dữ liệu đang có trên dialog
        $('#popup input').val("");
        $("#cbIs5foodmember").prop("checked", false);
        $("#error-message").html("");

        $("#popup").hide();
    }

    /**
     * Đóng dialog 
     * nếu đang có dữ liệu: yêu cầu xác nhận trước khi đóng
     * khi click vào button đóng (hình dấu x) trên tiêu đề
     * CreatedBy: NTT (22/07/2020)
     * */
    closeDialog() {
        // kiểm tra nếu dữ liệu đang được nhập
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
    * Lấy vị trí hàng được chọn, gán vào indexRowSelected
    * Hàng được lựa chọn sẽ đổi màu
    * CreatedBy: NTT (23/07/2020)
    * */
    RowSelect() {
        commonJS.rowSelect(this);

        indexRowSelected = $(this).index();
    };

    /**
     * Lấy dữ liệu khách hàng khi chọn
     * CreatedBy: NTT (23/07/2020)
     * */
    getValueRow() {
        if (indexRowSelected == -1) {
            alert("Bạn chưa chọn nhân viên! Vui lòng lựa chọn!");
            return false;
        } else {
            var rowSelected = $("tr.row-selected");
            var customerID = rowSelected.data('id');
            debugger
            var customer = $.ajax({
                method: 'GET',
                url: "/api/Customers/" + customerID,
                async: false,
                dataType: 'json',
                data: {},
                contentType: "application/json",
                success: function (results) {
                    //JSON.parse(results);
                    //return results;
                    console.log(results.Messanger)
                },
                fail: function (results) {
                    console.log(results.Messanger);
                }
            }).responseJSON;
            debugger;

            return customer.Data;

        }
    }
//-------------------- End: CÁC HÀM XỬ LÝ KHI LỰA CHỌN MỘT BẢN GHI -------------------------//
    

//-------------------- Start: CÁC HÀM LẤY - THÊM - SỬA - XOÁ - NHÂN BẢN - TÌM KIẾM KHÁCH HÀNG --------------------//
    /**
     * lấy thông tin toàn bộ khách hàng trên scdl
     * CreatedBy: NTT (29/07/2020
     * */
    getAllCustomer() {
        debugger;
        var customer = $.ajax({
            method: 'GET',
            url: "/api/Customers",
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
        return customer.Data;
    }

    /**
     * hàm thêm dữ liệu khách hàng
     * CreatedBy: NTT (24/07/2020)
     * */
    addCustomer() {
        // đặt trạng thái
        status = "add";

        this.showDialog();
    }

    /**
     * Hàm sử thông tin khách hàng được lựa chọn
     * CreatedBy: NTT (24/07/2020)
     * */
    editCustomer() {
        // đặt trạng thái
        status = "edit";

        // lấy thông tin khách hàng được lựa chọn
        var customer = this.getValueRow();

        if (customer) {
            // mở dialog khách hàng
            this.showDialog();

            // in thông tin khách hàng lên dialog
            this.bindDataDialog(customer);
            debugger
        }
    }

    /**
     * hàm nhân bản khách hàng
     * CreatedBy: NTT (28/07/2020)
     * */
    duplicateCustumer() {
        // đặt trạng thái
        status = "duplicate";

        // lấy thông tin khách hàng được lựa chọn
        var customer = this.getValueRow();

        if (customer) {
            // mở dialog khách hàng
            this.showDialog();

            // in thông tin khách hàng lên dialog
            this.bindDataDialog(customer);

            // xoá mã khách hàng cũ
            $("#txtCustomerCode").val("");

            debugger
        }
    }

    /**
     * hàm xóa dữ liệu khách hàng
     * CreatedBy: NTT (24/07/2020)
     * */
    deleteCustomer() {

        var me = this;

        // lấy thông tin khách hàng được lựa chọn
        var rowSelected = $("tr.row-selected");
        var customerID = rowSelected.data('id');

        //xác nhận xóa
        if (customerID) {
            if (confirm(pageLanguage.ConfirmDelete)) {
                $.ajax({
                    url: "/api/Customers/" + customerID,
                    method: "DELETE",
                    data: {},
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                }).done(function (res) {
                    debugger
                    alert(res.Messanger);

                    // load lại dữ liệu - gọi lại api để lấy lại dữ liệu sau khi thay đổi
                    allCustomer = me.getAllCustomer();

                    // load lại dữ liệu - sửa đổi trực tiếp trên client
                    //allCustomer.splice(indexRowSelected, 1);

                    me.loadData();
                }).fail(function (res) {
                    debugger
                    alert(res.Messanger);
                });
            }
        } else {
            alert("Bạn cần chọn khách hàng trước khi xóa!");
        }
    }

    /**
     * tìm kiếm khách hàng theo chuỗi nhập vào
     * CreatedBy: NTT (04/08/2020)
     * */
    searchCustomer(e) {
        if (e.which == 13) {
            //lấy dữ liệu từ form
            var customer = {
                CustomerCode: $("#searchCusCode").val(),
                FullName: $("#searchCusName").val(),
                CompanyName: $("#searchCusCompany").val(),
                TaxCode: $("#searchTaxCode").val(),
                Address: $("#searchCusAddress").val(),
                Birthday: $("#searchCusBirthday").val(),
                Email: $("#searchEmail").val(),
            }

            debugger;
            var customers_search = $.ajax({
                method: 'POST',
                url: "/api/Customers/search",
                async: false,
                dataType: 'json',
                data: JSON.stringify(customer),
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
            allCustomer = customers_search.Data;

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
        if ($("#txtCustomerCode").val() || $("#txtCustomerName").val() || $("#txtMemberCode").val() || $("#txtCustomerPhone").val()
            || $("#dtCustomerBirthday").val() || $("#txtCustomerCompany").val() || $("#txtCustomerTaxCode").val()
            || $("#txtCustomerEmail").val() || $("#txtCustomerAddress").val() || $("#note").val()) { return true };

        return false;
    }

    /**
     * in dữ liệu khách hàng lên dialog
     * CreatedBy: NTT (01/08/2020)
     * */
    bindDataDialog(customer) {
        // xử lý thông tin thời gian
        var date = commonJS.formatDefaultDate(customer.Birthday);

        // in dữ liệu của khách hàng lên dialog
        $("#txtCustomerCode").val(customer.CustomerCode);
        $("#txtCustomerName").val(customer.FullName);
        $("#txtMemberCode").val(customer.MemberCode);
        $("#txtCustomerPhone").val(customer.PhoneNumber);
        $("#dtCustomerBirthday").val(date);
        $("#txtCustomerCompany").val(customer.CompanyName);
        $("#txtCustomerTaxCode").val(customer.TaxCode);
        $("#txtCustomerEmail").val(customer.Email);
        $("#txtCustomerAddress").val(customer.Address);
        $("#cbIs5foodmember").prop("checked", customer.Is5FoodMember);
        $("#note").val(customer.Note);
    }

    /**lấy dữ liệu từ form khách hàng   
     * CreatedBy: NTT (28/07/2020)
     * */
    getValueInDialog() {
        // lấy dữ liệu từ dialog
        var inputInfoCustomer = {
            customerID: "",
            customerCode: $("#txtCustomerCode").val(),
            fullName: $("#txtCustomerName").val(),
            memberCode: $("#txtMemberCode").val(),
            customerPhone: $("#txtCustomerPhone").val(),
            customerBirthday: $("#dtCustomerBirthday").val() || null,
            customerConpany: $("#txtCustomerCompany").val(),
            customerTaxCode: $("#txtCustomerTaxCode").val(),
            customerEmail: $("#txtCustomerEmail").val(),
            customerAddress: $("#txtCustomerAddress").val(),
            is5FoodMember: $("#cbIs5foodmember").prop("checked"),
            note: $("#note").val().trim(),
            gerder: 2,
            debitAmount: 0
        };

        return inputInfoCustomer;
    }
//-------------------- End: CÁC HÀM XỬ LÝ TRÊN DIALOG (check dữ liệu, lấy dữ liệu, in dữ liệu) --------------------//
   

//-------------------- Start: CÁC HÀM ĐIỀU HƯỚNG, PHÂN TRANG ----------------------//
    /**
     * Hàm lấy thông tin phân trang và in lên html
     * CreatedBy: NTT (28/07/2020)
     * */
    setValue() {
        var totalRow = allCustomer.length;
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
        commonJS.changeNextPage(this, allCustomer.length);
    }

    /**
     * chuyển đến trang cuối cùng
     * CreatedBy: NTT (28/07/2020)*/
    changeEndPage() {
        commonJS.changeEndPage(this, allCustomer.length);
    }
//-------------------- End: CÁC HÀM ĐIỀU HƯỚNG, PHÂN TRANG ----------------------//


//-------------------- Validate dữ liệu, load data -------------------//
    /**
     * Kiểm tra dữ liệu nhập vào
     * @param {Object(customer)} inputInfoCustomer
     * CreatedBy: NTT (24/07/2020)
     */
    validateForm(inputInfoCustomer) {
        // mặc định chưa có lỗi: errorMessage rỗng
        errorMessage = "";

        // kiểm tra định dạng email
        if (!commonJS.validateEmail(inputInfoCustomer.customerEmail)) {
            errorMessage = pageLanguage.ErrorEmail;
            $("#txtCustomerEmail").focus();
            $("#error-message").html(errorMessage);
        }

        // kiểm tra trường số điện thoại
        if (inputInfoCustomer.customerPhone == "") {
            errorMessage = pageLanguage.NullInputPhone;
            $("#txtCustomerPhone").focus();
            $("#error-message").html(errorMessage);
        }

        // kiểm tra trường tên khách hàng
        if (inputInfoCustomer.fullName == "") {
            errorMessage = pageLanguage.NullInputCustomerName;
            $("#txtCustomerName").focus();
            $("#error-message").html(errorMessage);
        }

        // kiểm tra trường mã khách hàng
        if (inputInfoCustomer.customerCode == "") {
            errorMessage = pageLanguage.NullInputCustomerCode;
            $("#txtCustomerCode").focus();
            $("#error-message").html(errorMessage);
        }

        // nếu không có lỗi: errorMessage rỗng
        if (errorMessage == "") {
            return true;
        }

        return false;
    }

    /**
     * Load thông tin dữ liệu ra bảng
     * CreatedBy: NTTRUNG (22/07/2020)
     * */
    loadData() {
        try {
            // reset dữ liệu
            $('table#tbListCustomer tbody').empty();
            indexRowSelected = -1;

            // lấy vị trí các hàng cần in dữ liệu
            var indexRowStart = commonJS.getIndexStartRow() - 1;
            var indexRowEnd = commonJS.getIndexEndRow(allCustomer) - 1;

            for (var i = indexRowStart; i <= indexRowEnd; i++) {
                debugger
                var item = allCustomer[i];
                var customerInfoHTML = $(`<tr>
                                <td class="td-first align-center">`+ item['CustomerCode'] + `</td>
                                <td>`+ item['FullName'] + `</td>
                                <td>`+ item['CompanyName'] + `</td>
                                <td class="align-center">`+ item['TaxCode'] + `</td>
                                <td>`+ item['Address'] + `</td>
                                <td class="align-center">`+ commonJS.formatDate(item['Birthday']) + `</td>
                                <td class="align-center">`+ commonJS.buildCheckBoxByValue(item['Is5FoodMember']) + `</td>
                                <td>`+ item['Email'] + `</td>
                            </tr>`);
                customerInfoHTML.data("id", item["CustomerID"]);

                $('table#tbListCustomer tbody').append(customerInfoHTML);
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
     * CreatedBy: NTTRUNG (22/07/2020)
     * */
    saveData() {

        var inputInfoCustomer = this.getValueInDialog();

        // kiểm tra dữ liệu
        var canSave = this.validateForm(inputInfoCustomer);

        if (canSave) {
            // chuyển dữ liệu thành 1 đối tượng customer
            var customer =
            {
                CustomerCode: inputInfoCustomer.customerCode,
                FullName: inputInfoCustomer.fullName,
                CompanyName: inputInfoCustomer.customerConpany,
                TaxCode: inputInfoCustomer.customerTaxCode,
                Address: inputInfoCustomer.customerAddress,
                Birthday: inputInfoCustomer.customerBirthday,
                Email: inputInfoCustomer.customerEmail,
                Gender: inputInfoCustomer.gerder,
                PhoneNumber: inputInfoCustomer.customerPhone,
                MemberCode: inputInfoCustomer.memberCode,
                DebitAmount: inputInfoCustomer.debitAmount,
                Is5FoodMember: inputInfoCustomer.is5FoodMember,
                Note: inputInfoCustomer.note,
                CreatedBy: "NTT"
            }

            // lưu lại trên csdl với customer
            this.databaseSave(customer);

        }

    }

    /**Lưu lại trên CSDL
     * CreatedBy: NTTRUNG (22/07/2020)
     * */
    databaseSave(customer) {
        var me = this;

        if (status == "add" || status == "duplicate") {
            //fakeData.push(customer);

            $.ajax({
                url: "/api/Customers",
                method: "POST",
                async: false,
                data: JSON.stringify(customer),
                dataType: "text",
                contentType: "application/json",
            }).done(function (res) {
                // thông báo trạng thái lưu: thành công/thất bại
                alert(res.Messanger);

                // đóng dialog
                me.hideDialog();

                // load lại dữ liệu (client)
                allCustomer.push(customer);

                // tải lại dữ liệu từ CSDL
                //allCustomer = me.getAllCustomer();
                me.loadData();

                //var item = jQuery.parseJSON(res);
                //var customerInfoHTML = $(`<tr>
                //                <td class="td-first align-center">`+ item['CustomerCode'] + `</td>
                //                <td>`+ item['FullName'] + `</td>
                //                <td>`+ item['CompanyName'] + `</td>
                //                <td class="align-center">`+ item['TaxCode'] + `</td>
                //                <td>`+ item['Address'] + `</td>
                //                <td class="align-center">`+ commonJS.formatDate(item['Birthday']) + `</td>
                //                <td class="align-center">`+ commonJS.buildCheckBoxByValue(item['Is5FoodMember']) + `</td>
                //                <td>`+ item['Email'] + `</td>
                //            </tr>`);
                //customerInfoHTML.data("id", item["CustomerID"]);

                //$('table#tbListCustomer tbody').append(customerInfoHTML);

            }).fail(function (res) {
                alert(res.Messanger);
                debugger;
            })


        }

        if (status == "edit") {

            var rowSelected = $("tr.row-selected");
            var customerID = rowSelected.data('id');
            customer.CustomerID = customerID;

            debugger;
            $.ajax({
                url: "/api/Customers/" + customerID,
                method: "PUT",
                async: false,
                data: JSON.stringify(customer),
                dataType: "json",
                contentType: "application/json",
            }).done(function (res) {
                // thông báo trạng thái lưu: thành công/thất bại
                alert(res.Messanger);

                // đóng dialog
                me.hideDialog();


                // thay đổi giá trị của mảng khách hàng (tại client)
                //allCustomer.splice(indexRowSelected, 1);
                //allCustomer.splice(indexRowSelected, 0, customer);

                // load lại dữ liệu
                allCustomer = me.getAllCustomer();
                me.loadData();

                // HTML ghi lại 1 dòng vừa sửa
                //rowSelected.empty();
                //var item = res;
                //var customerInfoHTML = $(`<tr>
                //                <td class="td-first align-center">`+ item['CustomerCode'] + `</td>
                //                <td>`+ item['FullName'] + `</td>
                //                <td>`+ item['CompanyName'] + `</td>
                //                <td class="align-center">`+ item['TaxCode'] + `</td>
                //                <td>`+ item['Address'] + `</td>
                //                <td class="align-center">`+ commonJS.formatDate(item['Birthday']) + `</td>
                //                <td class="align-center">`+ commonJS.buildCheckBoxByValue(item['Is5FoodMember']) + `</td>
                //                <td>`+ item['Email'] + `</td>
                //            </tr>`);
                //customerInfoHTML.data("id", item["CustomerID"]);

                //$('table#tbListCustomer tbody').append(customerInfoHTML);


                debugger;
            }).fail(function (res) {
                alert(res.Messanger);
                debugger;
            })

        }

        // đặt lại trạng thái
        status = "none";
    }
//-------------------- End: CÁC HÀM XỬ LÝ LƯU DỮ LIỆU -------------------//
}

var allCustomer;    // biến lưu lại dữ liệu khách hàng gọi về từ service
var errorMessage = '';  // biến lưu thông báo lỗi nhập liệu
var indexRowSelected = -1;  // vị trí bản ghi được lựa chọn
var status = "none";        // trạng thái (thêm / sửa / xóa / nhân bản / none)
var pageLanguage = Resource.Language.VI;    // dữ liệu ngôn ngữ của trang web
