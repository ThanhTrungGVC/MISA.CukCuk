using Microsoft.EntityFrameworkCore;
using MISA.Entities;

namespace MISA.DL
{
    public partial class DatabaseContext: DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<Position> Position { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("server=35.194.166.58;port=3306;user=nvmanh;password=12345678@Abc;database=MISA.NTTRUNG.CukCuk", x => x.ServerVersion("10.3.22-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasComment("bảng thông tin khách hàng");

                entity.Property(e => e.CustomerID)
                    .HasColumnName("CustomerID")
                    .HasDefaultValueSql("''")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Address)
                    .HasColumnType("varchar(255)")
                    .HasComment("địa chỉ khách hàng")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Birthday)
                    .HasColumnType("date")
                    .HasComment("ngày sinh");

                entity.Property(e => e.CompanyName)
                    .HasColumnType("varchar(100)")
                    .HasComment("Tên công ty")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CreatedBy)
                    .HasColumnType("varchar(50)")
                    .HasComment("người tạo")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasComment("thời gian khởi tạo");

                entity.Property(e => e.CustomerCode)
                    .IsRequired()
                    .HasColumnType("varchar(20)")
                    .HasDefaultValueSql("''")
                    .HasComment("mã khách hàng")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.DebitAmount)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'0'")
                    .HasComment("số tiền nợ");

                entity.Property(e => e.Email)
                    .HasColumnType("varchar(50)")
                    .HasComment("email")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("''")
                    .HasComment("họ và tên khách hàng")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Gender)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'2'")
                    .HasComment("giới tính (0 - nữ, 1 - nam, 2 - khác)");

                entity.Property(e => e.Is5FoodMember).HasComment("Có là thành viên của 5Food không?");

                entity.Property(e => e.MemberCode)
                    .HasColumnType("varchar(255)")
                    .HasComment("mã thẻ thành viên")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasComment("thời gian sửa chữa cuối cùng");

                entity.Property(e => e.Note)
                    .HasColumnType("varchar(255)")
                    .HasComment("ghi chú")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.PhoneNumber)
                    .HasColumnType("varchar(50)")
                    .HasComment("số điện thoại")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.TaxCode)
                    .HasColumnType("varchar(100)")
                    .HasComment("mã số thuế")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasComment("Bảng nhân viên");

                entity.HasIndex(e => e.EmployeeCode);

                entity.HasIndex(e => e.FullName);

                entity.HasIndex(e => e.PositionId)
                    .HasName("FK_Employee_Position_PositionID");

                entity.Property(e => e.EmployeeID)
                    .HasColumnName("EmployeeID")
                    .HasDefaultValueSql("''")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Address)
                    .HasColumnType("varchar(255)")
                    .HasDefaultValueSql("''")
                    .HasComment("địa chỉ")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Birthday)
                    .HasColumnType("date")
                    .HasComment("ngày sinh");

                entity.Property(e => e.CitizenIdentityCode)
                    .HasColumnType("varchar(25)")
                    .HasDefaultValueSql("''")
                    .HasComment("số chứng minh thư nhân dân/thẻ căn cước công dân")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CreatedBy)
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("''")
                    .HasComment("người tạo")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasComment("thời gian tạo");

                entity.Property(e => e.DateOfIdentity)
                    .HasColumnType("date")
                    .HasComment("ngày cấp CMND");

                entity.Property(e => e.Department)
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("''")
                    .HasComment("Phòng ban")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Email)
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("''")
                    .HasComment("email")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.EmployeeCode)
                    .IsRequired()
                    .HasColumnType("varchar(25)")
                    .HasDefaultValueSql("''")
                    .HasComment("mã nhân viên")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.FirstName)
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("''")
                    .HasComment("họ")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.FullName)
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("''")
                    .HasComment("họ và tên")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Gender)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'2'")
                    .HasComment("Giới tính (0-nữ, 1-nam, 2-khác)");

                entity.Property(e => e.LastName)
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("''")
                    .HasComment("tên")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasComment("thời gian sửa cuối cùng");

                entity.Property(e => e.PhoneNumber)
                    .HasColumnType("varchar(50)")
                    .HasDefaultValueSql("''")
                    .HasComment("số điện thoại")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.PositionId)
                    .HasColumnName("PositionID")
                    .HasDefaultValueSql("''")
                    .HasComment("ID vị trí")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Salary)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'0'")
                    .HasComment("hệ số lương");

                entity.Property(e => e.StartWorkDate)
                    .HasColumnType("date")
                    .HasComment("Ngày gia nhập (làm việc)");

                entity.Property(e => e.StateOfIdentity)
                    .HasColumnType("varchar(255)")
                    .HasDefaultValueSql("''")
                    .HasComment("nơi cấp CMND")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.TaxCode)
                    .HasColumnType("varchar(20)")
                    .HasDefaultValueSql("''")
                    .HasComment("mã số thuế")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.WorkState)
                    .HasColumnType("int(11)")
                    .HasDefaultValueSql("'0'")
                    .HasComment("tình trạng công việc (1-đang làm việc, 2-nghỉ việc)");

                entity.HasOne(d => d.Position)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.PositionId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Position>(entity =>
            {
                entity.HasComment("bảng vị trí công việc");

                entity.Property(e => e.PositionID)
                    .HasColumnName("PositionID")
                    .HasDefaultValueSql("''")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CreatedBy)
                    .HasColumnType("varchar(100)")
                    .HasDefaultValueSql("''")
                    .HasComment("Người tạo")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasComment("Thời gian tạo");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasComment("Thời gian sửa đổi cuối cùng");

                entity.Property(e => e.PositionCode)
                    .IsRequired()
                    .HasColumnType("varchar(25)")
                    .HasDefaultValueSql("''")
                    .HasComment("Mã vị trí công việc")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.PositionName)
                    .IsRequired()
                    .HasColumnType("varchar(50)")
                    .HasDefaultValueSql("''")
                    .HasComment("Tên vị trí công việc")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
