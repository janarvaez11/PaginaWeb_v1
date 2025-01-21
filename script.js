document.getElementById("procesoProduccionInspeccion").addEventListener("change", function () {
    const especificacionSelect = document.getElementById("procesoEspecificacionInspeccion");
    const opciones = {
        "Abastecimiento": [
            "Inspección y liberación dimensional de elementos rolados",
            "Inspección y liberación dimensional de elementos plegados",
            "Inspección y liberación corte y perforación de placas y flejes",
            "Inspección y control dimensional de elementos roscados",
            "Inspección y liberación: Curvado de perfiles, vigas y tubos",
            "Inspección y liberación de elemento biselados",
            "Inspección y liberación corte y perforación de vigas y perfiles"
        ],
        "Torres y Apernados": ["Item 1", "Item 2", "Item 3"],
        "Armado y Soldadura": ["Registro Inspección por cotas", "Registro Inspección por juntas"],
        "Pintura": ["Inspección Pintura"],
        "Galvanizado": ["Inspección Galvanizado"],
        "PMC": ["Inspección Grating", "Inspección Pasamanos", "Inspección Bandejas Portacables"]
    };

    // Limpia el desplegable de especificación
    especificacionSelect.innerHTML = "<option value='' disabled selected>Selecciona una especificación</option>";

    // Rellena las opciones según el proceso seleccionado
    const procesoSeleccionado = this.value;
    if (procesoSeleccionado in opciones) {
        opciones[procesoSeleccionado].forEach(especificacion => {
            const option = document.createElement("option");
            option.value = especificacion;
            option.textContent = especificacion;
            especificacionSelect.appendChild(option);
        });
    }
});

// Manejador de envío del formulario
document.getElementById("formularioInspeccion").addEventListener("submit", function (event) {
    event.preventDefault();

    // Recoge los datos del formulario
    const ordenInspeccion = document.getElementById("ordenInspeccion").value;
    const estadoInspeccion = document.getElementById("estadoInspeccion").value;
    const tipoInspeccion = document.getElementById("tipoInspeccion").value;
    const fechaInspeccion = document.getElementById("fechaInspeccion").value;
    const procesoProduccionInspeccion = document.getElementById("procesoProduccionInspeccion").value;
    const procesoEspecificacionInspeccion = document.getElementById("procesoEspecificacionInspeccion").value;
    const ctInspeccion = document.getElementById("ctInspeccion").value;
    const responsableInspeccion = document.getElementById("responsableInspeccion").value;
    const instrumentoMedicion = document.getElementById("instrumentoMedicion").value;
    const codigoInstrumento = document.getElementById("codigoInstrumento").value;
    const muestraInspeccion = document.getElementById("muestraInspeccion").value;

    // Informacion Especifica 
    
    const clienteInspeccion = document.getElementById("clienteInspeccion").value;
    const proyectoInspeccion = document.getElementById("proyectoInspeccion").value;
    const figInspeccion = document.getElementById("figInspeccion").value;
    const areaInspeccion = document.getElementById("areaInspeccion").value;
    const designacionInspeccion = document.getElementById("designacionInspeccion").value;
    const normaInspeccion = document.getElementById("normaInspeccion").value;
    const loteInspeccion = document.getElementById("loteInspeccion").value;
    

    // Verifica que todos los campos estén completados
    if (!ordenInspeccion || 
        !estadoInspeccion || 
        !tipoInspeccion || 
        !fechaInspeccion || 
        !procesoProduccionInspeccion || 
        !procesoEspecificacionInspeccion || 
        !ctInspeccion || 
        !responsableInspeccion ||
        !instrumentoMedicion||
        !codigoInstrumento||
        !muestraInspeccion||
        !clienteInspeccion ||
        !proyectoInspeccion||
        !figInspeccion||
        !areaInspeccion||
        !designacionInspeccion ||
        !normaInspeccion||
        !loteInspeccion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Llama al flujo de Power Automate
    fetch("https://prod-136.westus.logic.azure.com:443/workflows/51ffde8d7bd14ff0a3eea66cd36c001e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kWpnGHilCBgpHBdZUp-AhEbqZ07IauXu20prUxWr3wY", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ordenInspeccion: ordenInspeccion,
            estadoInspeccion: estadoInspeccion,
            tipoInspeccion: tipoInspeccion,
            fechaInspeccion: fechaInspeccion,
            procesoProduccionInspeccion: procesoProduccionInspeccion,
            procesoEspecificacionInspeccion: procesoEspecificacionInspeccion,
            ctInspeccion: ctInspeccion,
            responsableInspeccion: responsableInspeccion,
            instrumentoMedicion: instrumentoMedicion,
            codigoInstrumento: codigoInstrumento,
            muestraInspeccion: muestraInspeccion,
            clienteInspeccion: clienteInspeccion,
            proyectoInspeccion:proyectoInspeccion,
            figInspeccion:figInspeccion,
            areaInspeccion: areaInspeccion,
            designacionInspeccion: designacionInspeccion,
            normaInspeccion: normaInspeccion,
            loteInspeccion: loteInspeccion        }),
    })
        .then(response => {
            if (response.ok) {
                alert("Datos enviados correctamente");
                document.getElementById("formularioInspeccion").reset();
            } else {
                alert("Error al enviar los datos");
            }
        })
        .catch(error => console.error("Error:", error));


/*

    // Simulación de una base de datos de usuarios
    const usersDB = {
        admin: '1234' // Usuario por defecto
    };

    // Manejo de registro de nuevos usuarios
    document.getElementById('registerForm')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;

        if (usersDB[username]) {
            alert('El usuario ya existe. Intente con otro nombre.');
        } else {
            usersDB[username] = password;
            alert('Usuario registrado con éxito.');
            window.location.href = 'login.html'; // Redirige al login
        }
    });

    // Manejo del inicio de sesión
    document.getElementById('loginForm')?.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (usersDB[username] && usersDB[username] === password) {
            alert('Inicio de sesión exitoso.');
            sessionStorage.setItem('loggedInUser', username);
            window.location.href = 'index.html'; // Redirige al formulario principal
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });

    // Manejo del cierre de sesión
    document.getElementById('logout')?.addEventListener('click', function () {
        sessionStorage.removeItem('loggedInUser');
        alert('Sesión cerrada.');
        window.location.href = 'login.html';
    });

    // Redirigir al login si no está autenticado
    if (!sessionStorage.getItem('loggedInUser') && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
    }


*/


    //Dinamismo de las diviones
    // Manejo del instrumento de medición

    // Habilitar/deshabilitar código de instrumento según selección
    instrumentoMedicion.addEventListener('change', function () {
        if (this.value) {
            codigoInstrumento.disabled = false;
        } else {
            codigoInstrumento.disabled = true;
            codigoInstrumento.value = '';
        }
    });



});
