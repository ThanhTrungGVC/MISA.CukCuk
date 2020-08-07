using System;
using Microsoft.AspNetCore.Mvc;
using MISA.BL;
using MISA.BL.Base;
using MISA.BL.Interface;
using MISA.DL.Base;
using MISA.Entities;

namespace MISA.CukCuk.Controllers
{
    /// <summary>
    /// khách hàng
    /// </summary>
    public class CustomersController : BaseController1<Customer>
    {
        private readonly ICustomerBL _customerBL;

        public CustomersController(IBaseBL<Customer> baseBL, ICustomerBL customerBL) : base(baseBL)
        {
            _customerBL = customerBL;
        }

        // GET: api/Customers?{field}={inputText}
        /// <summary>
        /// lấy danh sách khách hàng theo điều kiện (tìm kiếm)
        /// </summary>
        /// <returns></returns>
        /// api/Customer/search
        [HttpPost("search")]
        public virtual AjaxResult SearchCustomer([FromBody] Customer inputCustomer)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _customerBL.SearchCustomer(inputCustomer);
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
