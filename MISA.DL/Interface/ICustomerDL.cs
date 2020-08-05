using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Interface
{
    public interface ICustomerDL
    {
        IEnumerable<Customer> SearchCustomer(Customer cus);
    }
}
