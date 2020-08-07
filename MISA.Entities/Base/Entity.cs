using System;

namespace MISA.Entities.Base
{
    public class Entity
    {
        /// <summary>
        /// người khởi tạo
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// thời gian khởi tạo
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// thời gian sửa đổi cuối cùng
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
    }
}
