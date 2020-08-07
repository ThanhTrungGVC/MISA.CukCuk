using Microsoft.EntityFrameworkCore;
using MISA.DL.Base;
using MISA.DL.Interface;
using MISA.Entities;
using System.Collections.Generic;
using System.Linq;

namespace MISA.DL
{
    public class CustomerDL1:BaseDL1<Customer>, ICustomerDL
    {
        /// <summary>
        /// contructor
        /// </summary>
        public CustomerDL1() : base()
        {
        }

        /************************** CÁC HÀM RIÊNG CỦA CUSTOMER DL ***************************/

        /// <summary>
        /// Tìm kiếm khách hàng
        /// </summary>
        /// <param name="cus"></param>
        /// <returns></returns>
        public virtual IEnumerable<Customer> SearchCustomer(Customer cus)
        {
            string query = "SELECT * FROM Customer c ";

            var check_first = 0;

            if (cus.CustomerCode != "")
            {
                check_first = 1;
                query = query + "WHERE c.CustomerCode LIKE \'%" + cus.CustomerCode + "%\' ";
            }

            if (cus.FullName != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE c.FullName LIKE \'%" + cus.FullName + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND c.FullName LIKE \'%" + cus.FullName + "%\' ";
                }
            }

            if (cus.TaxCode != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE c.TaxCode LIKE \'%" + cus.TaxCode + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND c.TaxCode LIKE \'%" + cus.TaxCode + "%\' ";
                }
            }

            if (cus.CompanyName != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE c.CompanyName LIKE \'%" + cus.CompanyName + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND c.CompanyName LIKE \'%" + cus.CompanyName + "%\' ";
                }
            }

            if (cus.Address != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE c.Address LIKE \'%" + cus.Address + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND c.Address LIKE \'%" + cus.Address + "%\' ";
                }
            }

            if (cus.Email != "")
            {
                if (check_first == 0)
                {
                    query = query + "WHERE c.Email LIKE \'%" + cus.Email + "%\' ";
                    check_first = 1;
                }
                else
                {
                    query = query + "AND c.Email LIKE \'%" + cus.Email + "%\' ";
                }
            }

            return  _context.Customer.FromSqlRaw(query).ToList();
        }
    }
}
