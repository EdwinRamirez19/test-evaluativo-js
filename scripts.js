

/**declaracion de variables necesarias para el funcionamiento del codigo  */
var user = [];
var nombreUser ;
var posicionInicialPregunta = 0; // Current tab is set to be the first tab (0)
var preguntas = ['En JavaScript, ¿cómo se llama el método que comprueba una expresión regular y devuelve true si se cumple?',
                'En JavaScript, ¿qué función se emplea para convertir una cadena a minúsculas?',
                'En JavaScript, ¿cuál es la forma correcta de crear un array?',
                'En el DOM, para obtener el contenido textual de una parte de la página se emplea la propiedad',
                '¿Qué etiqueta de HTML se emplea para escribir código JavaScript?',
                'En JavaScript, las posiciones de los caracteres de una cadena empiezan en',
                'En JavaScript, ¿cómo se redondea el número 7.25 al entero más cercano?',
                'En JavaScript, ¿cómo se genera un número aleatorio?',
                'La compañía que inventó el lenguaje JavaScript fue'];

var respuestasCorrectas = ['d','d','c','c','a','d','b','c','b'];
var respuestaUsuario=[];
var puntosUsuario = [];
var puntos =0;
var puntosIncorrectos=0;
var cantCorrectas =0;
var cantIncorrectas =0;
var estado ;
/**primera parte ocultar la seccion de preguntas */

    function ocultarAlEntrar(params) {
        document.getElementById('seccionPreguntas').style.display = 'none';
        document.getElementById('menu').style.display = 'none';

        var items = document.getElementsByClassName('preguntas-item');
        for (let i = 0; i < items.length; i++) {
            items[i].style.display = 'none';

        }
    }

    /**metodo que permite validar que los campos se encuentren llenos y captura el usuario registrado */
    function capturarUsuario(params) {
        if (document.getElementById('nombre').value === "" || document.getElementById('apellidos').value ===""){
            alert('Ambos campos son requeridos, llenalos por favor')
        }else{
            user[0] = document.getElementById('nombre').value + ' ' + document.getElementById('apellidos').value;
            nombreUser = document.getElementById('login-user');
            nombreUser.textContent = '';
            document.getElementById('menu').style.display = 'block';
            document.getElementById('seccionPreguntas').style.display = 'block';
            nombreUser.textContent = 'Usuario : ' + user[0];
            document.getElementById('seccion-login').style.display = 'none';
            document.getElementById('resultados').style.display = 'none';
            
            mostrarPreguntas(posicionInicialPregunta); //llamada al metodo que me permite mostrar la primera pregunta
            
            
        }

        
    }



    //metodo mostrar preguntas, el cual permite mostar la pregunta de acuerdo a una posicion
    function mostrarPreguntas(posicionPregunta) {
        
        var cantidadPreguntas = document.getElementsByClassName("preguntas-item");//obtengo la cantidad de divs con esta cclase
        cantidadPreguntas[posicionPregunta].style.display = 'block'; //habilito la pregunta que se encuentre en esta posicion
        var preAct = document.getElementById("pregunta-actual");
        preAct.textContent = 'Pregunta ' + (posicionInicialPregunta+1) + ' de 9';
        if (posicionPregunta == 0) {
            document.getElementById("anterior").style.display = "none";
        } else {
            document.getElementById("anterior").style.display = "inline";
            
        }
        if (posicionPregunta == (cantidadPreguntas.length - 1)) {
            document.getElementById("siguiente").innerHTML = "Terminar";
            
        } else {
            document.getElementById("siguiente").innerHTML = "Siguiente";
        }
        
        
    }
    function movermeEntrePreguntas(posicionPregunta) {
        
        estado = posicionPregunta;
        // capturo la cantidad de preguntas que hay de acuerdo a una clase 
        var xcantidadPreguntas = document.getElementsByClassName("preguntas-item");
        // valida que se haya seleccionado una respuesta para poder pasar a la siguiente pregunta
        if (posicionPregunta == 1 && !validarPreguntas()) return false;
        // oculta la pregunta que se encuentra en la posicion actual al darle siguiente
        xcantidadPreguntas[posicionInicialPregunta].style.display = "none";
        // incrementa en uno para ir a la sigguiente pregunta
        posicionInicialPregunta = posicionInicialPregunta + posicionPregunta;
        
        // si ya esta en la parte final del formulario muestra el resultado del test
        if (posicionInicialPregunta >= xcantidadPreguntas.length) {
            // ... the form gets submitted:

            document.getElementById('resultados').style.display = 'block';
            var filas = document.getElementById('filas');
            var preAct = document.getElementById("pregunta-actual");
            var estadoResultado = document.getElementById('resultado-test');
            
            document.getElementById('siguiente').style.display = 'none';
            document.getElementById('anterior').style.display = 'none';
            preAct.textContent = 'Preguntas Correctas ' + (9 - cantIncorrectas ) +  ' de 9';
            let tr='';
            for (let i = 0; i < preguntas.length; i++) {
                
                tr += "<tr><td style ='text-aling : center;'>" + (i+1) + "</td>";
                tr += "<td style ='text-aling : justify;'>" + preguntas[i] + "</td>";
                tr += "<td style ='text-aling : center;'>" + respuestasCorrectas[i] + "</td>";
                tr += "<td style ='text-aling : center;'>" + respuestaUsuario[i] + "</td></tr>";
                
            }
            filas.innerHTML = tr;
            if (puntos < 3.0) {
                estadoResultado.textContent = "Test " +'Reprobado'
            } else {
                if (puntos >= 3 || puntos <= 5.0) {
                    estadoResultado.textContent = "Test " +'Aprobado'
                }
            }

            return false;
        }

        if(posicionPregunta === -1){
            var correcta = document.getElementsByClassName('items-circulos');
            puntosUsuario[posicionInicialPregunta] = (5 / 9);
            puntosIncorrectos -= puntosUsuario[posicionInicialPregunta];
            console.log(puntosIncorrectos);
            var sum = (parseFloat(puntos.toFixed(1)) + parseFloat(puntosIncorrectos.toFixed(1)));
            console.log(sum)
            var puntuacion = document.getElementById('puntuacion');
            puntuacion.textContent = 'Puntuacion ' + (parseFloat(puntos.toFixed(1)) + parseFloat(puntosIncorrectos.toFixed(1)))+ ' de 5.0';
            correcta[posicionInicialPregunta].style.backgroundColor = "#bbb"
            
        }
        
        mostrarPreguntas(posicionInicialPregunta);
    }

    function validarPreguntas() {
        
        var x, y, i, validar = false,puntuacion;

        x = document.getElementsByClassName("preguntas-item");
        var correcta = document.getElementsByClassName('items-circulos');
        y = x[posicionInicialPregunta].getElementsByTagName("input");
        
        
        

        
        for (i = 0; i < y.length; i++) {
        
            if (y[i].checked===true) {
                console.log(i)
                
                respuestaUsuario[posicionInicialPregunta] = y[i].value;
                
                if (respuestasCorrectas[posicionInicialPregunta] == respuestaUsuario[posicionInicialPregunta]  ){
                    console.log('respuesta correcta');
                    puntosUsuario[posicionInicialPregunta] = (5/9);
                    puntos +=puntosUsuario[posicionInicialPregunta];
                    cantCorrectas +=1;
                    console.log(puntos);
                    
                    
                    puntuacion = document.getElementById('puntuacion');
                    puntuacion.textContent = 'Puntuacion ' + (parseFloat(puntos.toFixed(1)) + parseFloat(puntosIncorrectos.toFixed(1))) + ' de 5.0';
                    
                    correcta[posicionInicialPregunta].style.backgroundColor = "green"
                    
                }else{
                    console.log('respuesta incorrecta');
                    correcta[posicionInicialPregunta].style.backgroundColor = "red"
                    cantIncorrectas +=1;
                    if(estado=== -1){
                        cantIncorrectas-=1;
                    }
                    
                }

                // cambia el estado de validar a true
                validar = true;
            }
        }
        
        if (validar) {
            
            for (var i = 0; i < respuestaUsuario.length; i++) {
                console.log(respuestaUsuario[i])
            }
        }else{
            
                alert('seleccione una respuesta');
            
        }
        return validar; // retorna el estado falso o verdadero
    }

