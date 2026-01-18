$(document).ready(function() {
    // Inicializar saldo si no existe (Persistencia local)
    if (!localStorage.getItem('saldo')) {
        localStorage.setItem('saldo', '500000');
    }

    // Actualizar visualización del saldo en las pantallas necesarias [cite: 130, 136]
    function actualizarSaldoUI() {
        const saldo = localStorage.getItem('saldo');
        $('#displaySaldo').text('$' + parseInt(saldo).toLocaleString('es-CL'));
    }
    actualizarSaldoUI();

    // 1. Lógica de Login (login.html) [cite: 111]
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        // Simulación: cualquier credencial es válida para este ejercicio
        window.location.href = 'menu.html';
    });

    // 2. Realizar Depósito (deposit.html) [cite: 112, 116, 121]
    $('#btnDepositar').click(function() {
        let monto = parseInt($('#inputMonto').val());
        if (monto > 0) {
            let nuevoSaldo = parseInt(localStorage.getItem('saldo')) + monto;
            localStorage.setItem('saldo', nuevoSaldo);
            
            // Efecto jQuery para confirmar éxito [cite: 127, 136]
            $('#mensaje').html('<div class="alert alert-success">Depósito exitoso</div>').fadeIn().delay(2000).fadeOut();
            actualizarSaldoUI();
            $('#inputMonto').val('');
        }
    });

    // 3. Simular Transferencia (sendmoney.html) [cite: 117]
    $('#btnEnviar').click(function() {
        let monto = parseInt($('#montoEnviar').val());
        let saldoActual = parseInt(localStorage.getItem('saldo'));

        if (monto > 0 && monto <= saldoActual) {
            localStorage.setItem('saldo', saldoActual - monto);
            alert("Transferencia enviada con éxito");
            window.location.href = 'menu.html';
        } else {
            alert("Saldo insuficiente o monto inválido");
        }
    });

    // 4. Autocompletar con jQuery (sendmoney.html) [cite: 128, 133, 135]
    const contactos = ["Axel Poblete", "Fito Cofré", "Juan Pérez", "María González"];
    $("#buscarContacto").on("input", function() {
        let val = $(this).val().toLowerCase();
        if(val.length > 2) {
            let sugerencia = contactos.find(c => c.toLowerCase().includes(val));
            if(sugerencia) console.log("Sugerencia: " + sugerencia); // Simulación de feedback
        }
    });
});