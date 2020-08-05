using MISA.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public partial class Customer:Entity
    {
        #region "Constructor"
        /// <summary>
        /// hàm khởi tạo
        /// khởi tạo CustomerID tự động
        /// </summary>
        /// CreatedBy: NTT (28/07/2020)
        public Customer()
        {
            CustomerID = Guid.NewGuid();
        }
        #endregion

        #region Property
        /// <summary>
        /// khoá chính: ID nhân viên
        /// </summary>
        public Guid CustomerID { get; set; }

        /// <summary>
        /// mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; }

        /// <summary>
        /// Họ và tên khách hàng
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Giới tính (0-nữ; 1-nam; 2-khác)
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// tên công ty
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string TaxCode { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? Birthday { get; set; }

        /// <summary>
        /// email khách hàng
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// mã thẻ thành viên
        /// </summary>
        public string MemberCode { get; set; }

        /// <summary>
        /// số tiền nợ
        /// </summary>
        public int? DebitAmount { get; set; }

        /// <summary>
        /// có là thành viên 5food
        /// </summary>
        public bool? Is5FoodMember { get; set; }

        /// <summary>
        /// ghi chú
        /// </summary>
        public string Note { get; set; }

    }
    #endregion
}
