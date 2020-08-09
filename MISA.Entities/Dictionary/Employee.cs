using MISA.Entities.Base;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace MISA.Entities
{
    public partial class Employee:Entity
    {
        #region "Constructor"
        /// <summary>
        /// hàm khởi tạo
        /// khởi tạo EmployeeID tự động
        /// </summary>
        /// CreatedBy: NTT (28/07/2020)
        public Employee()
        {
            EmployeeID = Guid.NewGuid();
        }
        #endregion

        #region Properties
        /// <summary>
        /// khoá chính
        /// </summary>
        public Guid EmployeeID { get; set; }

        /// <summary>
        /// mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// họ
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// tên
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// họ và tên
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// giới tính (0-nữ; 1-nam; 2-khác)
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string TaxCode { get; set; }

        /// <summary>
        /// tên công ty
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// địa chỉ
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// ngày sinh
        /// </summary>
        public DateTime? Birthday { get; set; }

        /// <summary>
        /// trạng thái việc làm (1-đang làm việc, 2-nghỉ việc)
        /// </summary>
        public int? WorkState { get; set; }

        /// <summary>
        /// số Chứng minh nhân dân
        /// </summary>
        public string CitizenIdentityCode { get; set; }

        /// <summary>
        /// ngày cấp chứng minh nhân dân
        /// </summary>
        public DateTime? DateOfIdentity { get; set; }

        /// <summary>
        /// nơi cấp chứng minh nhân dân
        /// </summary>
        public string StateOfIdentity { get; set; }

        /// <summary>
        /// mã công việc
        /// </summary>
        public Guid PositionId { get; set; }

        /// <summary>
        /// phòng ban
        /// </summary>
        public string Department { get; set; }

        /// <summary>
        /// ngày bắt đầu làm việc
        /// </summary>
        public DateTime? StartWorkDate { get; set; }

        /// <summary>
        /// mức lương
        /// </summary>
        public int? Salary { get; set; }

        /// <summary>
        /// ảnh đại diện
        /// </summary>
        public string Image { get; set; }

        #endregion

        public virtual Position Position { get; set; }
        
    }
}
