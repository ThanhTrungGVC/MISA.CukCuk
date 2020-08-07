using MISA.Entities.Base;
using System;
using System.Collections.Generic;

namespace MISA.Entities
{
    public partial class Position: Entity
    {

        #region "Constructor"
        /// <summary>
        /// hàm khởi tạo
        /// khởi tạo EmployeeID tự động
        /// </summary>
        /// CreatedBy: NTT (28/07/2020)
        public Position()
        {
            PositionID = Guid.NewGuid();
            Employee = new HashSet<Employee>();
        }
        #endregion

        #region Properties
        /// <summary>
        /// khoá chính
        /// </summary>
        public Guid PositionID { get; set; }

        /// <summary>
        /// mã vị trí
        /// </summary>
        public string PositionCode { get; set; }

        /// <summary>
        /// tên vị trí công việc
        /// </summary>
        public string PositionName { get; set; }

        #endregion

        public virtual ICollection<Employee> Employee { get; set; }
    }
}
