using MISA.BL.Base;
using MISA.Entities;

namespace MISA.CukCuk.Controllers
{
    public class PositionsController : BaseController1<Position>
    {
        public PositionsController(IBaseBL<Position> baseBL) : base(baseBL)
        {
        }
    }
}
