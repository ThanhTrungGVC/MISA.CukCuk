using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Interface
{
    public interface IEmployeeBL
    {
        /// <summary>
        /// Tìm kiếm thông tin nhân viên
        /// </summary>
        /// <param name="cus"></param>
        /// <returns>List Employee</returns>
        IEnumerable<Employee> SearchEmployees(Employee employee);

        /// <summary>
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>int</returns>
        /// CreatedBy: NTT (10/08/2020)
        int AddEntity(Employee employee);

        /// <summary>
        /// Sửa thông tin nhân viên
        /// </summary>
        /// <param name="entityID"></param>
        /// <param name="entity"></param>
        /// <returns>(1-thành công, -1-thất bại)</returns>
        /// CreatedBy: NTT (10/08/2020)
        int EditEntity(Guid entityID, Employee employee);

        /// <summary>
        /// Lấy nhân viên có mã Code lớn nhất
        /// </summary>
        /// <returns>Employee</returns>
        /// CreatedBy: NTT (10/08/2020)
        Employee GetLastEmployee();
    }
}
