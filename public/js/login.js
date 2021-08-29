let form = document.getElementById('formLogin');
let email = document.getElementById('email');
let pass = document.getElementById('password');

class Usuarios {
    constructor(){
        this.id = "",
        this.nombre = "",
        this.user = "",
        this.email = "",
        this.token = ""
    }

    static async guardaUsuario (usuario) {
        localStorage.setItem("dataUsuario", JSON.stringify(usuario))
    }

    static async recuperaUsuario () {
        let resultado = await JSON.parse(localStorage.getItem('dataUsuario'))
        return resultado
    }
}

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    Usuarios.guardaUsuario(new Usuarios());
    let resultado = await fetch("http://localhost:3000/login", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "email": email.value,
            "pass": pass.value
        })
    })
    let vuelta = await resultado.json();
    if(vuelta.error){
        swal({
            title: 'Email o contraseña incorrectas',
            icon: "error",
          });
    } else {
        let data = await Usuarios.recuperaUsuario();
        data.user = vuelta.user.usuario;
        data.id = vuelta.user.id;
        data.email = vuelta.user.email;
        data.nombre = vuelta.user.nombres + " " + vuelta.user.apellidos;
        data.token = vuelta.token;
        Usuarios.guardaUsuario(data);
            location.href = '/index'
    }
})