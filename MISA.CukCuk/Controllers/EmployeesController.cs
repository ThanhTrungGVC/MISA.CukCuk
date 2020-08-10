using Microsoft.AspNetCore.Mvc;
using MISA.BL.Base;
using MISA.BL.Interface;
using MISA.Entities;
using System;

namespace MISA.CukCuk.Controllers
{
    public class EmployeesController : BaseController1<Employee>
    {

        protected readonly IEmployeeBL _employeeBL;

        public EmployeesController(IBaseBL<Employee> baseBL, IEmployeeBL employeeBL) : base(baseBL)
        {
            _employeeBL = employeeBL;
        }

        // POST: api/{entity}
        /// <summary>
        /// Thêm mới entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost]
        public override AjaxResult PostEntity(Employee employee)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _employeeBL.AddEntity(employee);
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessInsert;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrInsert;
            }

            return ajaxResult;
        }

        // PUT: api/{entity}/5
        /// <summary>
        /// sửa thông tin entity (lấy theo ID)
        /// </summary>
        /// <param name="entityID"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPut("{entityID}")]
        public override AjaxResult PutEntity(Guid entityID, [FromBody] Employee employee)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _employeeBL.EditEntity(entityID, employee); ;
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessUpdate;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrUpdate;
            }

            return ajaxResult;
        }

        //GET: api/Employees/LastEmployee
        [HttpGet("LastEmployee")]
        public virtual AjaxResult GetLastEmployee()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _employeeBL.GetLastEmployee();
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessSearch;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrSearch;
            }

            return ajaxResult;
        }


        // GET: api/Employees?{field}={inputText}
        /// <summary>
        /// lấy danh sách nhân viên theo điều kiện (tìm kiếm)
        /// </summary>
        /// <returns></returns>
        /// api/Employees/search
        [HttpPost("search")]
        public virtual AjaxResult SearchEmployees([FromBody] Employee inputEmployee)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _employeeBL.SearchEmployees(inputEmployee);
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessSearch;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrSearch;
            }

            return ajaxResult;
        }
    }
}
