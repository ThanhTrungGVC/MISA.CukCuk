using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Base
{
    public interface IBaseDL<T> where T:class
    {
        /// <summary>
        /// Lấy toàn bộ thông tin entity
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> GetAllEntities();

        /// <summary>
        /// Lấy thông tin entity theo ID
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        T GetEntityByID(Guid entityID);

        /// <summary>
        /// Sửa thông tin entity
        /// </summary>
        /// <param name="entityID"></param>
        /// <param name="Entity"></param>
        /// <returns></returns>
        T EditEntity(Guid entityID, T entity);

        /// <summary>
        /// Thêm mới entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        T AddEntity(T entity);

        /// <summary>
        /// Xoá thông tin Entity
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
