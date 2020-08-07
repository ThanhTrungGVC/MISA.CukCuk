using MISA.BL.Interface;
using MISA.DL.Base;
using MISA.DL.Interface;
using MISA.Entities;
using System.Collections.Generic;

namespace MISA.BL.Base
{
    public class CustomerBL1: BaseBL1<Customer>, IBaseBL<Customer>, ICustomerBL
    {
        protected readonly ICustomerDL _customerDL;

        /// <summary>
        /// contructor
        /// </summary>
        public CustomerBL1(IBaseDL<Customer> baseDL, ICustomerDL customerDL) : base(baseDL)
        {
            _customerDL = customerDL;
        }

        /// <summary>
        /// Tìm kiếm thông tin khách hàng
        /// </summary>
        /// <param name="cus"></param>
        /// <returns></returns>
        public virtual IEnumerable<Customer> SearchCustomer(Customer cus)
        {
            return _customerDL.SearchCustomer(cus);
        }
    }
}
