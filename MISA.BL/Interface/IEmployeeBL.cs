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
        /// <returns></returns>
        IEnumerable<Employee> SearchEmployees(Employee employee);

        /// <summary>
        /// Thêm mới nhân viên
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        int AddEntity(Employee employee);

        /// <summary>
        /// Sửa thông tin nhân viên
        /// </summary>
        /// <param name="entityID"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        int EditEntity(Guid entityID, Employee employee);
    }
}
