using Microsoft.EntityFrameworkCore;
namespace web_api_1.Models{
    class Conexion : DbContext{
    public Conexion(DbContextOptions<Conexion> options):base(options){}
    public DbSet<Clientes>Clientes{get;set;}
    public DbSet<Puesto>Puestos{get;set;}
    public DbSet<Empleados>Empleados{get;set;}
    
    }
class Conectar{
    private const string CadenadeConexion="server=localhost;port=3306;database=db_empresa;userid=usr_empresa;pwd=Empres@123";
    public static Conexion Create(){
        var constructor=new DbContextOptionsBuilder<Conexion>();
        constructor.UseMySQL(CadenadeConexion);
        var Conexion=new Conexion(constructor.Options);
        return Conexion;

    }
}
}