using Microsoft.AspNetCore.Mvc;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Controllers
{
    public interface IBaseController<T>
    {
        // GET: api/{entity}
        /// <summary>
        /// lấy tất cả danh sách entities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public AjaxResult GetAllEntities();

        // GET: api/{entity}/5
        /// <summary>
        /// lấy thông tin entity theo ID
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        [HttpGet("{entityID}")]
        public AjaxResult GetEntityByID(Guid entityID);

        // PUT: api/{entity}/5
        /// <summary>
        /// sửa thông tin entity (lấy theo ID)
        /// </summary>
        /// <param name="entityID"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPut("{entityID}")]
        public AjaxResult PutEntity(Guid entityID, [FromBody] T entity);

        // POST: api/{entity}
        /// <summary>
        /// Thêm mới entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [HttpPost]
        public AjaxResult PostEntity(T entity);

        // DELETE: api/{entity}/5
        /// <summary>
        /// xoá dữ liệu entity
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        [HttpDelete("{entityID}")]
        public AjaxResult DeleteCustomer(Guid entityID);
    }
}
