
let contadorEncrypt = 0;
let contadorDecrypt = 0;

/*Función para que se autoajuste el texto */
function autoExpand(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";

    // Reducir tamaño de fuente hasta 24px si el textarea se hace demasiado grande
    while (element.scrollHeight > element.offsetHeight) {
        let fontSize = parseInt(window.getComputedStyle(element).fontSize);
        if (fontSize > 20) {
            fontSize -= 2;
            element.style.fontSize = fontSize + "px";
        } else {
            break;
        }
    }
}

function encriptor() {
    const textoEntrada = document.getElementById("input-texto").value;
    const textoConvertido = textoEntrada
        .replaceAll("e", "enter")
        .replaceAll("i", "imes")
        .replaceAll("a", "ai")
        .replaceAll("o", "ober")
        .replaceAll("u", "ufat");
    if (textoConvertido != null && contadorEncrypt < 1 ||
        textoConvertido.lenght > 0 && contadorEncrypt < 1) {
        hideDiv();
        showComponent(textoConvertido);
        contadorEncrypt++;
        contadorDecrypt = 0;
    }


}

function decriptor() {
    const textoConvertido = document.getElementById("input-texto").value;
    const textoNormal = textoConvertido
        .replaceAll("enter", "e")
        .replaceAll("imes", "i")
        .replaceAll("ai", "a")
        .replaceAll("ober", "o")
        .replaceAll("ufat", "u");
    if (textoNormal != null && contadorDecrypt < 1 ||
        textoNormal.lenght > 0 && contadorDecrypt < 1) {
        hideDiv();
        showComponent(textoNormal);
        contadorDecrypt++;
        contadorEncrypt = 0;
    }

}

async function hideDiv() {
    const imagen = document.querySelector(".imagen");
    const avisoMensaje = document.querySelector(".aviso-mensaje");
    if (imagen) {
        imagen.style.display = "none";
    }

    if (avisoMensaje) {
        avisoMensaje.style.display = "none";
    }
}

async function showComponent(textoMostrar) {
    console.log(textoMostrar);
    if (textoMostrar != null) {
        const existingElement = document.getElementById("texto-vivo");
        const existingElement2 = document.querySelector(".texto-salida");
        // Si el elemento existe, eliminarlo
        if (existingElement !== null && existingElement2 !== null) {
            existingElement.parentNode.removeChild(existingElement);
            existingElement2.parentNode.removeChild(existingElement2);
            const divMostrar = document.createElement('div');
            divMostrar.setAttribute('class', 'texto-salida');
            document.querySelector('.seccion-derecha').appendChild(divMostrar);
            const nuevoParrafo = document.createElement('p');
            nuevoParrafo.textContent = textoMostrar;
            nuevoParrafo.setAttribute('id', 'texto-vivo');
            document.querySelector('.texto-salida').appendChild(nuevoParrafo);
            document.querySelector('.boton-copiar').style.display = 'flex';
        } else {
            const divMostrar = document.createElement('div');
            divMostrar.setAttribute('class', 'texto-salida');
            document.querySelector('.seccion-derecha').appendChild(divMostrar);
            const nuevoParrafo = document.createElement('p');
            nuevoParrafo.textContent = textoMostrar;
            nuevoParrafo.setAttribute('id', 'texto-vivo');
            document.querySelector('.texto-salida').appendChild(nuevoParrafo);
            document.querySelector('.boton-copiar').style.display = 'flex';
        }
    }
}

async function copyToClipboard() {
    const texto = document.getElementById("texto-vivo").innerHTML;;
    navigator.clipboard.writeText(texto).then(() => {
        showAlert(0);
    }).catch((error) => {
        showAlert(1,error.message);
    });
}

function showAlert(num = 0, error = null) {
    const divAlerta = document.createElement('div');
    divAlerta.classList.add('alerta');
    if (num == 0) {
        divAlerta.textContent = 'Texto copiado al portapapeles.';
    } else {
        divAlerta.textContent = 'Error al copiar texto al portapapeles:' + error;
    }
    document.body.appendChild(divAlerta);

    setTimeout(() => {
        divAlerta.classList.remove('mostrar-alerta');
    }, 2000);

    divAlerta.classList.add('mostrar-alerta');
};