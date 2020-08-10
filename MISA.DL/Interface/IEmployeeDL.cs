using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Interface
{
    public interface IEmployeeDL
    {
        /// <summary>
        /// tìm kiếm nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns>List Employees</returns>
        /// CreatedBy: NTT (10/08/2020)
        IEnumerable<Employee> SearchEmployees(Employee employee);

        /// <summary>
        /// tìm kiếm nhân viên dựa vào mã nhân viên
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns>Employee</returns>
        /// CreatedBy: NTT (10/08/2020)
        Employee GetEmployeeByCode(string employeeCode);

        /// <summary>
        /// lấy nhân viên có mã Code lớn nhất
        /// </summary>
        /// <returns>Employee</returns>
        /// CreatedBy: NTT (10/08/2020)
        Employee GetLastEmployee();
    }
}
