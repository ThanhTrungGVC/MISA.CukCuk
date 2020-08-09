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
        /// <returns></returns>
        IEnumerable<Employee> SearchEmployees(Employee employee);

        /// <summary>
        /// tìm kiếm nhân viên dựa vào mã nhân viên
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns></returns>
        Employee GetEmployeeByCode(string employeeCode);
    }
}
