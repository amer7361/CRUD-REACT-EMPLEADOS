using Microsoft.AspNetCore.Mvc;
using System.Linq;
using web_api_1.Models;

namespace web_api_1.Controllers{
    [Route("api/[controller]")]

    public class PuestoController:Controller{
        private Conexion dbConexion;
        public PuestoController(){
            dbConexion=Conectar.Create();

        }

        [HttpGet]
        public ActionResult Get(){
            return Ok(dbConexion.Puestos.ToArray());

        }

        [HttpGet("{id}")]
        public ActionResult Get(int id){
            var Puestos= dbConexion.Puestos.SingleOrDefault(p => p.id_puestos==id);
            if(Puestos !=null){
                return Ok(Puestos);
            }else{
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Puesto puesto){
            if(ModelState.IsValid){
                dbConexion.Puestos.Add(puesto);
                dbConexion.SaveChanges();
                return Ok(puesto);
            }else{
                return NotFound();
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] Puesto puesto){
            var v_puestos = dbConexion.Puestos.SingleOrDefault(p => p.id_puestos == puesto.id_puestos);
            if(v_puestos != null && ModelState.IsValid){
                dbConexion.Entry(v_puestos).CurrentValues.SetValues(puesto);
                dbConexion.SaveChanges();
                return Ok();
            }else{
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id){
            var puesto = dbConexion.Puestos.SingleOrDefault(p =>p.id_puestos== id);
            if(puesto != null){
                dbConexion.Puestos.Remove(puesto);
                dbConexion.SaveChanges();
                return Ok();
            }else{
                return NotFound();
            }

        }

    }

}