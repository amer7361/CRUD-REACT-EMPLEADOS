using Microsoft.AspNetCore.Mvc;
using System.Linq;
using web_api_1.Models;

namespace web_api_1.Controllers{
    [Route("api/[controller]")]

    public class ClientesController:Controller{
        private Conexion dbConexion;
        public ClientesController(){
            dbConexion=Conectar.Create();
        }

        [HttpGet]
        public ActionResult Get(){
            return Ok(dbConexion.Clientes.ToArray());
        
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id){
            var Clientes= dbConexion.Clientes.SingleOrDefault(a =>a.id_clientes==id);
            if(Clientes !=null){
                return Ok (Clientes);
            }else{
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Clientes clientes){
            if (ModelState.IsValid){
                dbConexion.Clientes.Add(clientes);
                dbConexion.SaveChanges();
                return Ok(clientes);
            }else{
                return NotFound();
            }

        }

        [HttpPut]
        public ActionResult Put([FromBody]Clientes clientes){
            var v_clientes = dbConexion.Clientes.SingleOrDefault(a => a.id_clientes == clientes.id_clientes);
            if (v_clientes !=null && ModelState.IsValid){
                dbConexion.Entry(v_clientes ).CurrentValues.SetValues(clientes);
                dbConexion.SaveChanges();
                return Ok();
            }else{
                return NotFound();
            }
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id){
            var clientes= dbConexion.Clientes.SingleOrDefault(a=> a.id_clientes == id);
            if(clientes != null){
                dbConexion.Clientes.Remove(clientes);
                dbConexion.SaveChanges();
                return Ok();
            }else{
                return NotFound();
            }
        }
    }


}

