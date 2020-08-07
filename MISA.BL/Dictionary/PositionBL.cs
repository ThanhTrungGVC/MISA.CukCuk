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
    public class PositionBL: BaseBL1<Position>, IBaseBL<Position>
    {
        /// <summary>
        /// contructor
        /// </summary>
        public PositionBL(IBaseDL<Position> baseDL) : base(baseDL)
        {
        }
    }
}
