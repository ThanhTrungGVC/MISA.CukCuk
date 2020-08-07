using MISA.BL.Base;
using MISA.DL.Base;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Dictionary
{
    public class EmployeeBL:BaseBL1<Employee>, IBaseBL<Employee>
    {
        /// <summary>
        /// contructor
        /// </summary>
        public EmployeeBL(IBaseDL<Employee> baseDL) : base(baseDL)
        {
        }
    }
}
