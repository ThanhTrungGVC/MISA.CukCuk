using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.BL.Base;
using MISA.Entities;


namespace MISA.CukCuk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class BaseController1<T> : ControllerBase, IBaseController<T> where T: class
    {
        protected readonly IBaseBL<T> _baseBL;

        /// <summary>
        /// contructor
        /// </summary>
        public BaseController1(IBaseBL<T> baseBL)
        {
            _baseBL = baseBL;
        }

        // GET: api/{entity}
        /// <summary>
        /// lấy tất cả danh sách entities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public AjaxResult GetAllEntities()
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _baseBL.GetAllEntities();
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessLoad;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrLoad;
            }

            return ajaxResult;
        }

        // GET: api/{entity}/5
        /// <summary>
        /// lấy thông tin entity theo ID
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        [HttpGet("{entityID}")]
        public AjaxResult GetEntityByID(Guid entityID)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _baseBL.GetEntityByID(entityID);
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessLoad;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrLoad;
            }

            return ajaxResult;
        }

        // PUT: api/{entity}/5
        /// <summary>
        /// sửa thông tin entity (lấy theo ID)
        /// </summary>
        /// <param name="entityID"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPut("{entityID}")]
        public AjaxResult PutEntity(Guid entityID, [FromBody] T entity)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _baseBL.EditEntity(entityID, entity);
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessUpdate;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrUpdate;
            }

            return ajaxResult;
        }

        // POST: api/{entity}
        /// <summary>
        /// Thêm mới entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost]
        public AjaxResult PostEntity(T entity)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _baseBL.AddEntity(entity);
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessInsert;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrInsert;
            }

            return ajaxResult;
        }

        // DELETE: api/{entity}/5
        /// <summary>
        /// xoá dữ liệu entity
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        [HttpDelete("{entityID}")]
        public AjaxResult DeleteCustomer(Guid entityID)
        {
            var ajaxResult = new AjaxResult();
            try
            {
                ajaxResult.Data = _baseBL.DelEntity(entityID);
                ajaxResult.Success = true;
                ajaxResult.Messanger = Properties.Resources.VN_SuccessDel;
            }
            catch (Exception)
            {
                ajaxResult.Success = false;
                ajaxResult.Messanger = Properties.Resources.VN_ErrDel;
            }

            return ajaxResult;
        }
    }
}
