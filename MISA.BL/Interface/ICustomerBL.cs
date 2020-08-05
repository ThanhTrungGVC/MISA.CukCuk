using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Interface
{
    public interface ICustomerBL
    {
        IEnumerable<Customer> SearchCustomer(Customer cus);
    }
}
