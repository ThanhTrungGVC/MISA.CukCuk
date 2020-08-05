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
                method: 'PUT',
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

    /**hàm xử lý khi số lượng hàng trên 1 trang thay đổi
     * CreatedBy: NTT (28/07/2020)
     * */
    changeNumRow() {
        // chuyển về trang 1
        $("#page-number").val(1);

        // set lại dữ liệu cho trang
        this.loadData();
    }

    /**
    * Lấy vị trí hàng được chọn, gán vào indexRowSelected
    * Hàng được lựa chọn sẽ đổi màu
    * CreatedBy: NTT (23/07/2020)
    * */
    RowSelect() {
        this.classList.add("row-selected");
        $(this).siblings().removeClass("row-selected");

        indexRowSelected = $(this).index();
    };

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
            alert("Bạn cần chọn nhân viên trước khi xóa!");
        }
    }

    /**
     * hàm kiểm tra dialog có dữ liệu
     * CreatedBy: NTT (01/08/2020)
     * */
    hasDataDialog() {
        // in dữ liệu của khách hàng lên dialog
        if ($("#txtCustomerCode").val() || $("#txtCustomerName").val() || $("#txtMemberCode").val() || $("#txtCustomerPhone").val()
            || $("#dtCustomerBirthday").val() || $("#txtCustomerCompany").val() || $("#txtCustomerTaxCode").val()
            || $("#txtCustomerEmail").val() || $("#txtCustomerAddress").val() || $("#note").val())
        { return true };

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

    /**hàm lấy độ dài (số lượng hàng) của bảng khách hàng
     * CreatedBy: NTT (28/07/2020)
     * */
    getTotalRow() {
        return allCustomer.length;
    }


    /**
     * Hàm lấy số lượng hàng trên 1 trang
     * CreatedBy: NTT (28/07/2020)
     * */
    getNumRowInOnePage() {
        var numRow = $("#select-num-row").val();
        return numRow;
    }

    /**
     * hàm lấy số tổng số trang
     * CreatedBy: NTT (28/07/2020)
     * */
    getTotalPage() {
        var totalRow = this.getTotalRow();
        var numRowInOnePage = this.getNumRowInOnePage();

        var totalPage;
        if (Math.floor(totalRow % numRowInOnePage) == 0) {
            totalPage = Math.floor(totalRow / numRowInOnePage);
        } else {
            totalPage = (Math.floor(totalRow / numRowInOnePage) + 1);
        }
        // giới hạn cho input chọn trang
        $("#page-number").attr("max", totalPage);

        return totalPage;
    }

    /**
     * hàm lấy trang hiện tại đang hiển thị
     * CreatedBy: NTT (28/07/2020)
     * */
    getNumPage() {
        var page = $("#page-number").val();
        return page;
    }

    /**
     * hàm tính toán giá trị vị trí hàng đầu tiên
     * CreatedBy: NTT (28/07/2020)
     * */
    getIndexStartRow() {
        return ((this.getNumPage() - 1) * this.getNumRowInOnePage() + 1);
    }

    /**
     * hàm tính toán vị trí kết thúc của hàng trong trang
     * CreatedBy: NTT (28/07/2020)
     * */
    getIndexEndRow() {
        var numRow = this.getNumRowInOnePage();
        var numPage = this.getNumPage();
        var totalRow = this.getTotalRow();

        if (numRow * numPage >= totalRow) {
            return totalRow;
        } else {
            return (numRow * numPage);
        }
    }

    /**
     * Hàm lấy thông tin phân trang và in lên html
     * CreatedBy: NTT (28/07/2020)
     * */
    setValue() {
        var totalRow = this.getTotalRow();
        var totalPage = this.getTotalPage();
        var indexRowStart = this.getIndexStartRow();
        var indexRowEnd = this.getIndexEndRow();
        debugger;
        

        $("#number-row-total").html(totalRow);
        $("#number-row-start").html(indexRowStart);
        $("#number-row-end").html(indexRowEnd);
        $("#total-page").html("trên " + totalPage);

        //this.loadData();
    }

    /**
     * chuyển về trang đầu tiên
     * CreatedBy: NTT (28/07/2020)
     * */
    changeFirstPage() {
        $("#page-number").val(1);
        this.loadData();
    }

    /**
     * chuyển về trang trước
     * CreatedBy: NTT (28/07/2020)
     * */
    changePrePage() {
        var page = this.getNumPage();
        if (page > 1) {
            var prePage = parseInt(page) - 1;
            $("#page-number").val(prePage);
            this.loadData();
        }
    }

    /**
     * chuyển đến trang kế tiếp
     * CreatedBy: NTT (28/07/2020)
     * */
    changeNextPage() {
        var page = this.getNumPage();
        var endPage = this.getTotalPage();

        if (page < endPage) {
            var nextpage = parseInt(page) + 1;
            $("#page-number").val(nextpage);
            this.loadData();
        }
    }

    /**
     * chuyển đến trang cuối cùng
     * CreatedBy: NTT (28/07/2020)*/
    changeEndPage() {
        var endPage = this.getTotalPage();
        $("#page-number").val(endPage);
        this.loadData();
    }

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
     * Load thông tin dữ liệu ra bảng
     * CreatedBy: NTTRUNG (22/07/2020)
     * */
    loadData() {
        try {
            // reset dữ liệu
            $('table#tbListCustomer tbody').empty();
            indexRowSelected = -1;

            // lấy vị trí các hàng cần in dữ liệu
            var indexRowStart = this.getIndexStartRow() - 1;
            var indexRowEnd = this.getIndexEndRow() - 1;

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
        } catch(e){
            //console.log(e);
        }
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
}

var allCustomer;    // biến lưu lại dữ liệu khách hàng gọi về từ service
var errorMessage = '';  // biến lưu thông báo lỗi nhập liệu
var indexRowSelected = -1;  // vị trí bản ghi được lựa chọn
var status = "none";        // trạng thái (thêm / sửa / xóa / nhân bản / none)
var pageLanguage = Resource.Language.VI;    // dữ liệu ngôn ngữ của trang web
