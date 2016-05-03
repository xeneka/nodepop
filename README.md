# nodepop Practica Node keepcoding

***

## Registro de Usuarios

###Para registrar los usuarios podemos utilizar los siguientes método:

1. **Usando el path:** http://servidor/api/v1/register/USUARIO/EMAIL/PASSWORD
2. **Usando query string:** http://servidor/api/v1/register?name=prueba&mail=antonio@benavente.es&pass=pass
3. **Usando el body:** pasando los parametros name, mail, pass

Todos los parámetros son **obligatorios**.

####Respuestas del Sistema

1. **Grabado con éxito** devuelve un json con un primer parámetro **success:true** y como segundo parametro **payload: id del usuario**
2. **Fallo en la grabación** devuelve un json con un primer parámetro **success:false** y como segundo parametro **payload: error**


---




