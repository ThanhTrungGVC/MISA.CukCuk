using MISA.DL.Base;
using System;
using System.Collections.Generic;

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
        /// Lấy thông tin khách hàng theo code
        /// </summary>
        /// <param name="entityCode"></param>
        /// <returns></returns>
        public virtual T GetEntityByCode(string entityCode)
        {
            return _baseDL.GetEntityByCode(entityCode);
        }

        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="customerID"></param>
        /// <param name="newCustomer"></param>
        /// <returns></returns>
        public virtual int EditEntity(Guid entityID, T entity)
        {
            return _baseDL.EditEntity(entityID, entity);
        }

        /// <summary>
        /// Thêm mới entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual int AddEntity(T entity)
        {
            return _baseDL.AddEntity(entity);
        }

        /// <summary>
        /// Xoá dữ liệu khách hàng
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        public virtual int DelEntity(Guid entityID)
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
