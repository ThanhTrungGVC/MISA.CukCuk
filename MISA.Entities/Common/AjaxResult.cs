using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class AjaxResult
    {
        public AjaxResult()
        {

        }

        /// <summary>
        /// Trạng thái
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Thông báo
        /// </summary>
        public string Messanger { get; set; }
    }
}
