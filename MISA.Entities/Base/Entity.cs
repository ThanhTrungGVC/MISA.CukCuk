using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
