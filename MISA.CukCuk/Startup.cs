﻿using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MISA.BL;
using MISA.BL.Base;
using MISA.BL.Interface;
using MISA.CukCuk.Controllers;
using MISA.DL;
using MISA.DL.Base;
using MISA.DL.Interface;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Pomelo.EntityFrameworkCore.MySql.Storage;

namespace MISA.CukCuk
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DatabaseContext>(options => options
               .UseMySql("Server=35.194.166.58;port=3306;Database=MISA.NTTRUNG.CukCuk;User=nvmanh;Password=12345678@Abc;",
                   mysqlOptions =>
                       mysqlOptions.ServerVersion(new ServerVersion(new Version(10, 4, 6), ServerType.MariaDb))));

            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen();

            //base
            services.AddScoped(typeof(IBaseDL<>), typeof(BaseDL1<>));
            services.AddScoped(typeof(IBaseBL<>), typeof(BaseBL1<>));

            // customer
            services.AddScoped<ICustomerBL, CustomerBL1>();
            services.AddScoped<ICustomerDL, CustomerDL1>();

            //employee
            services.AddScoped<IEmployeeBL, EmployeeBL>();
            services.AddScoped<IEmployeeDL, EmployeeDL>();

            //position
            services.AddScoped<IPositionBL, PositionBL>();
            services.AddScoped<IPositionDL, PositionDL>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseStaticFiles();       // cho phép ứng dụng đọc các file tĩnh

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
