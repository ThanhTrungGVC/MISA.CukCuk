using Microsoft.EntityFrameworkCore;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL.Base
{
    public class BaseDL1<T>: IBaseDL<T> where T: class
    {
        protected readonly DatabaseContext _context;

        /// <summary>
        /// contructor
        /// </summary>
        public BaseDL1()
        {
            _context = new DatabaseContext();
        }

        /// <summary>
        /// Lấy toàn bộ thông tin entity
        /// </summary>
        /// <returns></returns>
        public virtual IEnumerable<T> GetAllEntities()
        {
            var data = _context.Set<T>().ToList();
            return data;
        }

        /// <summary>
        /// Lấy thông tin entity theo ID
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public virtual T GetEntityByID(Guid ID)
        {
            var rowValue = _context.Set<T>().Find(ID);
            return rowValue;
        }
        
        /// <summary>
        /// Lấy thông tin entity theo ID
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public virtual T GetEntityByCode(string code)
        {
            var rowValue = _context.Set<T>().Find(code);
            return rowValue;
        }

        /// <summary>
        /// Sửa thông tin entity
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="Entity"></param>
        /// <returns></returns>
        public virtual int EditEntity(Guid ID, T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChangesAsync();

            return 1;
        }

        /// <summary>
        /// Thêm mới entity
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual int AddEntity(T entity)
        {
            _context.Set<T>().Add(entity);
            _context.SaveChangesAsync();

            return 1;
        }

        /// <summary>
        /// Xoá thông tin Entity
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public virtual int DelEntity(Guid ID)
        {
            var entity = _context.Set<T>().Find(ID);

            _context.Set<T>().Remove(entity);
            _context.SaveChangesAsync();

            return 1;
        }

        /// <summary>
        /// hàm kiểm tra có tồn tại Entity ID
        /// </summary>
        /// <param name="entityID"></param>
        /// <returns></returns>
        public virtual bool EntityExists(Guid entityID)
        {
            var entity = _context.Set<T>().Find(entityID);
            return (entity == null);
        }
    }
}
