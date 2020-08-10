using Microsoft.EntityFrameworkCore;
using MISA.DL.Base;
using MISA.DL.Interface;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    public class EmployeeDL:BaseDL1<Employee>, IEmployeeDL
    {
        /// <summary>
        /// contructor
        /// </summary>
        public EmployeeDL() : base()
        {

        }

        /************************** CÁC HÀM RIÊNG CỦA EMPLOYEE DL ***************************/

        /// <summary>
        /// tìm kiếm nhân viên dựa vào mã nhân viên
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns>Employee</returns>
        /// CreatedBy: NTT (10/08/2020)
        public virtual Employee GetEmployeeByCode(string employeeCode)
        {
            var data = _context.Employee.Where(i => i.EmployeeCode == employeeCode).FirstOrDefault();
            return data;
        }

        /// <summary>
        /// lấy nhân viên có mã Code lớn nhất
        /// </summary>
        /// <returns>Employee</returns>
        /// CreatedBy: NTT (10/08/2020)
        public virtual Employee GetLastEmployee()
        {
            var data = _context.Employee.OrderBy(e => e.EmployeeCode).FirstOrDefault();
            return data;
        }

        /// <summary>
        /// Tìm kiếm khách hàng
        /// </summary>
        /// <param name="cus"></param>
        /// <returns>List Employees</returns>
        /// CreatedBy: NTT (10/08/2020)
        public virtual IEnumerable<Employee> SearchEmployees(Employee em)
        {
            string query = "SELECT * FROM Employee e ";

            var check_first = 0;

            if (em.EmployeeCode != "")
            {
                check_first = 1;
                query = query + "WHERE e.EmployeeCode LIKE \'%" + em.EmployeeCode + "%\' ";
            }

            if (em.FullName != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE e.FullName LIKE \'%" + em.FullName + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND e.FullName LIKE \'%" + em.FullName + "%\' ";
                }
            }

            if (em.TaxCode != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE e.TaxCode LIKE \'%" + em.TaxCode + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND e.TaxCode LIKE \'%" + em.TaxCode + "%\' ";
                }
            }

            if (em.Department != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE e.Department LIKE \'%" + em.Department + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND e.Department LIKE \'%" + em.Department + "%\' ";
                }
            }

            if (em.Address != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE e.Address LIKE \'%" + em.Address + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND e.Address LIKE \'%" + em.Address + "%\' ";
                }
            }

            if (em.WorkState == 0)
            {
                if (check_first == 0)
                {
                    query = query + "WHERE e.WorkState = " + em.WorkState;
                    check_first = 1;
                }
                else
                {
                    query = query + "AND e.WorkState = " + em.WorkState;
                }
            }

            return _context.Employee.FromSqlRaw(query).ToList();
        }
    }
}
