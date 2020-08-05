using MISA.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Base
{
    public interface IBaseBL<T> where T:class
    {
        /// <summary>
        /// lấy tất cả thông tin entities
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> GetAllEntities();

        /// <summary>
        /// Lấy thông tin khách hàng theo ID
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        T GetEntityByID(Guid entityID);

        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="entityID"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        T EditEntity(Guid entityID, T entity);

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        T AddEntity(T entity);

        /// <summary>
        /// Xoá dữ liệu khách hàng
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        T DelEntity(Guid entityID);

        /// <summary>
        /// hàm kiểm tra có tồn tại Entity ID
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        bool EntityExists(Guid entityID);
    }
}
