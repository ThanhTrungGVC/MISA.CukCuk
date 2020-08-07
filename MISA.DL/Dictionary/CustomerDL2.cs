using Microsoft.EntityFrameworkCore;
using MISA.DL.Base;
using MISA.DL.Interface;
using MISA.Entities;
using System.Collections.Generic;
using System.Linq;

namespace MISA.DL
{
    public class CustomerDL2 : BaseDL1<Customer>, ICustomerDL
    {

        public CustomerDL2() : base()
        {
        }

        /// <summary>
        /// Tìm kiếm khách hàng
        /// </summary>
        /// <param name="cus"></param>
        /// <returns></returns>
        public virtual IEnumerable<Customer> SearchCustomer(Customer cus)
        {
            var data = _context.Customer.Where(i => i.CustomerCode == cus.CustomerCode && i.CompanyName == cus.CompanyName).ToList();
            return data;
        }
    }
}
