var commonJS = {
    LanguageCode: "VI",

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
            month = '' + (d.getMonth()+1),
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
    }
}