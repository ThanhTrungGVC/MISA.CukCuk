var commonJS = {
    LanguageCode: "VI",

//--------------------Start: CÁC HÀM CHUẨN HOÁ DỮ LIỆU -------------------------//
    /**
     * Hàm định dạng tiền tệ
     * @param {Number} money
     * CreatedBy: NTTRUNG (22/07/2020)
     */
    formatMoney(money) {
        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    },

    /**
     * Tạo chuỗi checkbox tương ứng với giá trị True/False
     * @param {Boolean} value
     * value = true: <input type="checkbox" checked="checked" />
     * value = flase: <input type="checkbox" />
     */
    buildCheckBoxByValue(value) {
        var checkBoxHTML = $(`<input type="checkbox" />`);
        if (value) {
            checkBoxHTML = checkBoxHTML.attr("checked", true);
        }
        return checkBoxHTML[0].outerHTML;
    },

    /**
     * Hàm định dạng ngày tháng dd/MM/YYYY
     * @param {Date} date
     * CreatedBy: NTTRUNG (22/07/2020)
     */
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year].join('/');
    },

    /**
     * chuyển thời gian về dạng mặc định YYYY-MM-dd
     * @param {Date} date
     * CreatedBy: NTTRUNG (24/07/2020)
     */
    formatDefaultDate(date) {
        if (date != null) {
            var d = new Date(date.split("/").reverse().join("-"));
            var dd = '' + d.getDate();
            var mm = '' + (d.getMonth() + 1);
            var yy = d.getFullYear();

            if (mm.length < 2) mm = '0' + mm;
            if (dd.length < 2) dd = '0' + dd;

            var newdate = yy + "-" + mm + "-" + dd;
            return newdate;
        }
        return null;
    },
//--------------------End: CÁC HÀM CHUẨN HOÁ DỮ LIỆU -------------------------//


//--------------------Start: CÁC HÀM KIỂM TRA DỮ LIỆU ------------------------//
    /**
     * Kiểm tra định dạng email
     * @param {string} email
     * CreatedBY: NTTRUNG (22/07/2020)
     */
    validateEmail(email) {
        if (email) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    },
//--------------------End: CÁC HÀM KIỂM TRA DỮ LIỆU ------------------------//


//---------------------Start: Đổi màu bản ghi được click------------------------//
    /**
    * Lấy vị trí hàng được chọn, gán vào indexRowSelected
    * Hàng được lựa chọn sẽ đổi màu
    * CreatedBy: NTT (23/07/2020)
    * */
    rowSelect(me) {
        me.classList.add("row-selected");
        $(me).siblings().removeClass("row-selected");
    },
//---------------------End: Đổi màu bản ghi được click------------------------//


//---------------------Start: CÁC HÀM TÍNH TOÁN SỐ LIỆU HIỆN THỊ (số trang, số bản ghi trên trang, ... --------------------//
    /**
    * chuyển về trang đầu tiên khi số lượng bản ghi trên trang được chọn lại
    * CreatedBy: NTT (23/07/2020)
    * */
    setPageFirst(me) {
        // chuyển về trang 1
        $("#page-number").val(1);

        // set lại dữ liệu cho trang
        me.loadData();
    },

    /**
    * hàm lấy số tổng số trang
    * CreatedBy: NTT (28/07/2020)
    * */
    getTotalPage(list) {
        var totalRow = list.length;
        var numRowInOnePage = $("#select-num-row").val();

        var totalPage;
        if (Math.floor(totalRow % numRowInOnePage) == 0) {
            totalPage = Math.floor(totalRow / numRowInOnePage);
        } else {
            totalPage = (Math.floor(totalRow / numRowInOnePage) + 1);
        }
        // giới hạn cho input chọn trang
        $("#page-number").attr("max", totalPage);

        return totalPage;
    },

    /**
    * hàm tính toán giá trị vị trí hàng đầu tiên
    * CreatedBy: NTT (28/07/2020)
    * */
    getIndexStartRow() {
        var page = $("#page-number").val();
        var numRowInOnePage = $("#select-num-row").val();

        return ((page - 1) * numRowInOnePage + 1);
    },

    /**
    * hàm tính toán vị trí kết thúc của hàng trong trang
    * CreatedBy: NTT (28/07/2020)
    * */
    getIndexEndRow(list) {
        var numRow = $("#select-num-row").val();
        var numPage = $("#page-number").val();
        var totalRow = list.length;

        if (numRow * numPage >= totalRow) {
            return totalRow;
        } else {
            return (numRow * numPage);
        }
    },
//----------------End: CÁC HÀM TÍNH TOÁN SỐ LIỆU HIỆN THỊ (số trang, số bản ghi trên trang, ... --------------------//


//----------------Start: CÁC HÀM ĐIỀU HƯỚNG TRANG (first, pre, next, end) ----------------------//
    /**
     * chuyển về trang đầu tiên
     * CreatedBy: NTT (28/07/2020)
     * */
    changeFirstPage(me) {
        $("#page-number").val(1);
        me.loadData();
    },

    /**
     * chuyển về trang trước
     * CreatedBy: NTT (28/07/2020)
     * */
    changePrePage(me) {
        var page = $("#page-number").val();
        if (page > 1) {
            var prePage = parseInt(page) - 1;
            $("#page-number").val(prePage);
            me.loadData();
        }
    },

    /**
     * chuyển đến trang kế tiếp
     * CreatedBy: NTT (28/07/2020)
     * */
    changeNextPage(me, list) {
        var page = $("#page-number").val();
        var endPage = this.getTotalPage(list);

        if (page < endPage) {
            var nextpage = parseInt(page) + 1;
            $("#page-number").val(nextpage);
            me.loadData();
        }
    },

    /**
     * chuyển đến trang cuối cùng
     * CreatedBy: NTT (28/07/2020)*/
    changeEndPage(me, list) {
        var endPage = this.getTotalPage(list);
        $("#page-number").val(endPage);
        me.loadData();
    }
//----------------End: CÁC HÀM ĐIỀU HƯỚNG TRANG (first, pre, next, end) ----------------------//
}