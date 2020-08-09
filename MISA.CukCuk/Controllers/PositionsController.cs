using Microsoft.AspNetCore.Mvc;
using MISA.BL.Base;
using MISA.BL.Interface;
using MISA.Entities;
using System;

namespace MISA.CukCuk.Controllers
{
    public class PositionsController : BaseController1<Position>
    {
        protected readonly IPositionBL _positionBL;
        public PositionsController(IBaseBL<Position> baseBL, IPositionBL positionBL) : base(baseBL)
        {
            _positionBL = positionBL;
        }

        // GET: api/Positions/{field}={inputText}
        /// <summary>
        /// lấy danh sách vị trí việc làm theo positionCode (tìm kiếm)
        /// </summary>
        /// <returns></returns>
        /// api/Customer/search
        [HttpGet("search")]
        public virtual AjaxResult getPositionByCode(string PositionName)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _positionBL.getPositionByCode(PositionName);
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessSearch;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrSearch;
            }

            return ajaxResult;
        }
    }
}
