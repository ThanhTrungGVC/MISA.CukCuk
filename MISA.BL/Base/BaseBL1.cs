using MISA.DL.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL.Base
{
    public class BaseBL1<T>: IBaseBL<T> where T: class
    {
        protected readonly IBaseDL<T> _baseDL;

        /// <summary>
        /// contructor
        /// </summary>
        public BaseBL1(IBaseDL<T> baseDL)
        {
            _baseDL = baseDL;
        }

        /// <summary>
        /// lấy tất cả thông tin entities
        /// </summary>
        /// <returns></returns>
        public virtual IEnumerable<T> GetAllEntities()
        {
            return _baseDL.GetAllEntities();
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo ID
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        public virtual T GetEntityByID(Guid entityID)
        {
            return _baseDL.GetEntityByID(entityID);
        }

        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="customerID"></param>
        /// <param name="newCustomer"></param>
        /// <returns></returns>
        public virtual T EditEntity(Guid entityID, T entity)
        {
            return _baseDL.EditEntity(entityID, entity);
        }

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual T AddEntity(T entity)
        {
            return _baseDL.AddEntity(entity);
        }

        /// <summary>
        /// Xoá dữ liệu khách hàng
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        public virtual T DelEntity(Guid entityID)
        {
            return _baseDL.DelEntity(entityID);
        }

        /// <summary>
        /// hàm kiểm tra có tồn tại Entity ID
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        public virtual bool EntityExists(Guid entityID)
        {
            return _baseDL.EntityExists(entityID);
        }

    }
}
