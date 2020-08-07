using MISA.BL.Base;
using MISA.Entities;

namespace MISA.CukCuk.Controllers
{
    public class EmployeesController : BaseController1<Employee>
    {
        public EmployeesController(IBaseBL<Employee> baseBL) : base(baseBL)
        {
        }
    }
}
