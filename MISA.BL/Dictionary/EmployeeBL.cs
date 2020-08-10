using MISA.BL.Base;
using MISA.BL.Interface;
using MISA.DL.Base;
using MISA.DL.Interface;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL
{
    public class EmployeeBL:BaseBL1<Employee>, IEmployeeBL
    {
        protected readonly IEmployeeDL _employeeDL;

        /// <summary>
        /// contructor
        /// </summary>
        public EmployeeBL(IBaseDL<Employee> baseDL, IEmployeeDL employeeDL) : base(baseDL)
        {
            _employeeDL = employeeDL;
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public override int AddEntity(Employee employee)
        {
            //check trùng mã
            var search = _employeeDL.GetEmployeeByCode(employee.EmployeeCode);
            if ((search == null))
            {
                return _baseDL.AddEntity(employee);
            }
            return -1;
        }

        /// <summary>
        /// Sửa thông tin nhân viên
        /// </summary>
        /// <param name="entityID"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        public override int EditEntity(Guid entityID, Employee employee)
        {
            // check trùng mã
            var search = _employeeDL.GetEmployeeByCode(employee.EmployeeCode);
            if((search==null) || (search.EmployeeID == entityID))
            {
                return _baseDL.EditEntity(entityID, employee);
            }
            return -1;
        }

        /// <summary>
        /// lấy nhân viên có mã Code lớn nhất
        /// </summary>
        /// <returns></returns>
        public virtual Employee GetLastEmployee()
        {
            return _employeeDL.GetLastEmployee();
        }

        /// <summary>
        /// Tìm kiếm thông tin nhân viên
        /// </summary>
        /// <param name="cus"></param>
        /// <returns></returns>
        public virtual IEnumerable<Employee> SearchEmployees(Employee employee)
        {
            return _employeeDL.SearchEmployees(employee);
        }
    }
}
