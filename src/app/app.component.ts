import { Component ,ViewChild} from '@angular/core';
import { SelectornumericoComponent} from './selectornumerico/selectornumerico.component'
import { HttpClient } from '@angular/common/http';
import { ArticulosService } from './articulos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private articulosjson = null;
  articulosServices = null;

  asg={
    codigo:null,
    descripcion:null,
    nota:null
  }

  asignaturas = [{codigo:1, descripcion:'MOVIL', nota:10.55},
               {codigo:2, descripcion:'WEB', nota:12.10},
               {codigo:3, descripcion:'SIMULATION', nota:52.30},
               {codigo:4, descripcion:'REDES', nota:17},
               {codigo:5, descripcion:'DISTRIBUIDOS', nota:20},
              ];

  hayRegistros() {
    return this.asignaturas.length>0;              
  }

  borrar(asg) {
    for(let x=0;x<this.asignaturas.length;x++)
      if (this.asignaturas[x].codigo==asg.codigo)
      {
        this.asignaturas.splice(x,1);
        return;
      }
  }

  agregar() {
    for(let x=0;x<this.asignaturas.length;x++)
    if (this.asignaturas[x].codigo==this.asg.codigo)
    {
      alert('ya existe un asgiculo con dicho codigo');
      return;
    }        
    this.asignaturas.push({codigo:this.asg.codigo,
                         descripcion:this.asg.descripcion,
                         nota:this.asg.nota });
    this.asg.codigo=null;
    this.asg.descripcion=null;
    this.asg.nota=null;    
  }

  seleccionar(asg) {
    this.asg.codigo=asg.codigo;
    this.asg.descripcion=asg.descripcion;
    this.asg.nota=asg.nota;
  }

  modificar() {
    for(let x=0;x<this.asignaturas.length;x++)
      if (this.asignaturas[x].codigo==this.asg.codigo)
      {
        this.asignaturas[x].descripcion=this.asg.descripcion;
        this.asignaturas[x].nota=this.asg.nota;
        return;
      }        
    alert('No existe el código de asiganatura ingresada');
  }
  valor1: number;
  valor2: number;
  valor3: number;
  resultado: string;
  constructor(private http: HttpClient,private articulosServicio: ArticulosService) {
    this.valor1 = this.retornarAleatorio();
    this.valor2 = this.retornarAleatorio();
    this.valor3 = this.retornarAleatorio();

    
  }

  retornarAleatorio() {
    return Math.trunc(Math.random() * 6) + 1;
  }

  tirar() {
    this.valor1 = this.retornarAleatorio();
    this.valor2 = this.retornarAleatorio();
    this.valor3 = this.retornarAleatorio();
    if (this.valor1==this.valor2 && this.valor1==this.valor3)    
      this.resultado='Ganó';
    else
      this.resultado='Perdió';
  }

  mensaje='';

  actualizar(t) {
    this.mensaje = t + '(se actualiza cada 10 segundos)';
  }

  @ViewChild('selector1', null) selector1: SelectornumericoComponent;
  @ViewChild('selector2', null) selector2: SelectornumericoComponent;  

  fijarSelector1(valor:number) {
    this.selector1.fijar(valor);
  }

  fijarSelector2(valor:number) {
    this.selector2.fijar(valor);
  }
  articulos = [{codigo:1, descripcion:'papas', precio:10.55},
               {codigo:2, descripcion:'manzanas', precio:12.10},
               {codigo:3, descripcion:'melon', precio:52.30},
               {codigo:4, descripcion:'cebollas', precio:17},
               {codigo:5, descripcion:'calabaza', precio:20},
              ];
  
  ngOnInit() {
    this.articulosServices=this.articulosServicio.retornar();
    this.http.get("http://scratchya.com.ar/vue/datos.php")
      .subscribe(
        result => {
          this.articulosjson = result;
        },
        error => {
          console.log('problemas');
        }
      );
  }

}
