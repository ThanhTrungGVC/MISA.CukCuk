using MISA.BL.Base;
using MISA.BL.Interface;
using MISA.DL.Base;
using MISA.DL.Interface;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL
{
    public class PositionBL: BaseBL1<Position>, IPositionBL
    {
        protected readonly IPositionDL _positionDL;
        /// <summary>
        /// contructor
        /// </summary>
        public PositionBL(IBaseDL<Position> baseDL, IPositionDL positionDL) : base(baseDL)
        {
            _positionDL = positionDL;
        }

        public virtual Position getPositionByCode(string PositionName)
        {
            return _positionDL.getPositionByCode(PositionName);
        }
    }
}
