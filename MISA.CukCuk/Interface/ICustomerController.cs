using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Controllers;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Interface
{
    public interface ICustomerController:IBaseController<Customer>
    {
        // GET: api/Customers?{field}={inputText}
        /// <summary>
        /// lấy danh sách khách hàng theo điều kiện (tìm kiếm)
        /// </summary>
        /// <returns></returns>
        /// api/Customer/search
        [HttpPut("search")]
        AjaxResult SearchCustomer([FromBody] Customer inputCustomer);
    }
}
