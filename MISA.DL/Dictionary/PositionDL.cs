using Microsoft.EntityFrameworkCore;
using MISA.DL.Base;
using MISA.DL.Interface;
using MISA.Entities;
using System.Linq;

namespace MISA.DL
{
    public class PositionDL:BaseDL1<Position>, IPositionDL
    {
        /// <summary>
        /// contructor
        /// </summary>
        public PositionDL() : base()
        {

        }

        /************************** CÁC HÀM RIÊNG CỦA POSITION DL ***************************/
        public virtual Position getPositionByCode(string positionName)
        {
            if(positionName != "default")
            {
                var data = _context.Position.Where(i => i.PositionName == positionName).FirstOrDefault();
                return data;
            }
            return _context.Position.Where(i => i.PositionName == "").FirstOrDefault();
        }
    }
}
