using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using web_api_1.Models;

namespace web_api_1.Controllers{
    [Route("api/[controller]")]
    public class EmpleadosController:Controller{
        private Conexion dbConexion;
        public EmpleadosController(){
            dbConexion=Conectar.Create();

        }
        [HttpGet]
        public ActionResult Get(){
            return Ok(dbConexion.Empleados.ToArray());

        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id){
            var Empleados= await dbConexion.Empleados.FindAsync(id);
            if(Empleados !=null){
                return Ok(Empleados);
            }else{
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Empleados empleados){
            if(ModelState.IsValid){
                dbConexion.Empleados.Add(empleados);
                await dbConexion.SaveChangesAsync();
                return Ok(empleados);
            }else{
                return NotFound();
            }

        }
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Empleados empleados){
            var v_empleados = dbConexion.Empleados.SingleOrDefault(e=>e.id_empleados == empleados.id_empleados);
            if(v_empleados !=null && ModelState.IsValid){
                dbConexion.Entry(v_empleados).CurrentValues.SetValues(empleados);
                await dbConexion.SaveChangesAsync();
                return Ok();
            }else{
                return NotFound();
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id){
            var empleados= dbConexion.Empleados.SingleOrDefault(e=>e.id_empleados==id);
            if(empleados !=null){
                dbConexion.Empleados.Remove(empleados);
                await dbConexion.SaveChangesAsync();
                return Ok(empleados);
            }else{
                return NotFound();
            }
        }
    }
}