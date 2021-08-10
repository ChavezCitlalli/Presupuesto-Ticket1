async function eliminarPresupuesto(id) {
    Swal.fire({
        title: '¿Seguro que quiere eliminar su cuenta?',
        text: 'Esta acción no se puede cambiar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let info = await JSON.parse(localStorage.getItem('dataUsuario'))
                    let resultado = await fetch("http://localhost:3000/eliminar/" + id, { 
                    method: 'get',
                    headers: {
                        "Accept": "application/json, text/plain, *,*",
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${info.token}`
                    }
                    })
                    let vuelta = await resultado.json();
                    if(vuelta.hasOwnProperty('error')){
                        Swal.fire({
                            title: "No tienes permiso para eliminar presupuestos" ,
                            icon: "error",
                        });
                    } else {
                        Swal.fire({
                            title: "Presupuesto Eliminado Correctamente",
                            icon: "success",
                        });
                        setTimeout(() => {
                            location.href = '/index'
                        }, 3000);
                    }

                } catch (error) {
                    Swal.fire({
                        title: "No tienes permiso para eliminar presupuestos ",
                        icon: "error",
                    });
                }
            } else {
                Swal.fire({
                    title: "Presupuesto no eliminado",
                    icon: "success",
                });
            }
      });
}