# nodepop Practica Node keepcoding

***
**Funcionamiento de la Práctica**

**1.- Funcionamiento con node - Pruebas montadas sobre el dominio ipadpro.es**
+ Servir ficheros estáticos -> http://ipadpro.es/images/anuncios/bici.jpg
+ Registar usuario -> http://ipadpro.es/api/v1/usuarios/register/devops/info@devops.com/devops

2.- Contenido a traves de IP -> http://52.202.226.96 o através del dominio http://fullstackdeveloper.com.es

***

**Descripción del API**, es un api desarrollada en Nodejs + Express + MongoDB.
Gestiona la inclusión de anuncios mediante una carga masiva y el usuario de la api puede
realizar consultas a la api para obtener los anuncios por distintas claves nombre,precio,tag.
El usuario debe autenticarse para obtener los anuncios

***
## Registro de Usuarios

###Para registrar los usuarios podemos utilizar los siguientes método:

1. **Usando el path:** http://servidor/api/v1/usuarios/register/USUARIO/EMAIL/PASSWORD
2. **Usando query string:** http://servidor/api/v1/usuarios/register?name=prueba&mail=theemail&pass=pass
3. **Usando el body:** pasando los parametros name, mail, pass

Todos los parámetros son **obligatorios**.

####Respuestas del Sistema

1. **Grabado con éxito** devuelve un json con un primer parámetro **success:true** y como segundo parametro **payload: id del usuario**
2. **Fallo en la grabación** devuelve un json con un primer parámetro **success:false** y como segundo parametro **payload: error**


---

## Lista de Anuncios

Para obtener la lista de anuncios hay que utilizar la siguiente url **http://servidor/api/v1/anuncios** esta devolverá toda la lista
de anuncios del sistema. A esta url base se le pueden añadir los siguientes paramentros. Estos parámetros se irán sumando unos a otros como filtro.
Si un parametro no se pone todos los elementos cumplen la condición.

**Sólo hay un parámetro obligatorio y es el token de usuario. Sin el token no se devolverá nada**

####Parámetros

+ **name:** Nombre del artículo que estamos buscando. Buscará todo aquello que empiece por la cadena que hemos puesto en nombre. No es obligatorio
+ **precio:** Tiene cuatro posibilidades(no es obligatorio):
    + precio = valor Buscará los elementos que tengan ese pecio
    + precio = valor- Buscará aquellos elementos superiores a ese valor
    + precio = valor-valor Buscará precio entre esos valores
    + precio = -valor Buscará precios inferiores al valor indicado.
+ **tag:** Buscará los elementos que tengan esa etiqueta
+ **tipoanuncio:** Buscará los tipo de anuncio por uno de estos dos valores(no es obligatorio):
    + tipoanuncio=venta Buscará los tipo de anuncio de venta
    + tipoanuncio=compra Buscará los tipo de anuncio de compra
+ **start:** Desde que elemento se empieza a leer
+ **limit:** Cuantos elementos hay que leer
+ **sort:** Elemento por el que se ordena
+ **token:** token facilitado en la autenticación

#####Ejemplo

*GET http://localhost:3000/api/v1/anuncios?tag=mobile&venta=false&nombre=ip&precio=50&start=0&limit=2&sort=precio&token =eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWZk OWFiZGE4Y2QxZDlhMjQwYzgyMzEiLCJub21icmUiOiJhZG1pbiIsImVtYWlsIj oiamFtZzQ0QGdtYWlsLmNvbSIsImNsYXZlIjoiMTIzIiwiX192IjowfQ.y8wPJ hNaS8Vf51ZlX9qZBlrTLGGy4JzDgN2eGSHeQfg*

Si el artículo o artículos existen delvorá un json como este. Para descargar la image hay que hacerlo en http://servidor/images/auncios/nombredelaimagen

```
{
  "success": true,
  "rows": [
    {
      "_id": "57291f2ef4c625682666c49e",
      "foto": "bici.jpg",
      "precio": 230.15,
      "venta": true,
      "nombre": "Bicicleta",
      "__v": 0,
      "tags": [
        "deporte",
        "turismo",
        "todo"
      ]
    }
  ]
}
```

---

## Lista de tags

#### Esta función de la api se utiliza para saber las todas las tags del sistema de cada uno de los anuncios


**Url de uso** http://servidor/api/v1/anuncios/tag?token=token devuelto por la autenticación

---

### Guardar Token

#### Esta función guarda el token


**Url uso** http://servidor/api/v1/token/plataforma/token/usuario

#### Descripcion Parametros

+ plataforma ios o android
+ token token que queramos guardar
+ usuario usuario

---

### Autenticación

La autenticación devuelve un token que debe ser devuelto por cada pregunta que se haga a la API.

La **url de uso** http://servidor/api/v1/usuarios/authenticate deben pasarse como parámetros como post. Los
parametros son los siguientes:

+ user
+ pass

devolverá lo siguiente
```
{
  "sucess": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU3Mjg3ZGFlYmU5OGQxNDMwYWQ0MDFhYSIsImlhdCI6MTQ2MjQ3ODI0MCwiZXhwIjoxNDYyNjUxMDQwfQ.uEv5ZZ6VBCl7zR3dYwTPsReE0TsjfO0-KeSzKCOxkj0"
}
```
**Existen la posibilidad de obtener la respuesta en español o ingles** para ello
bastará con añadir el parametro /es o /en


###Nota del desarrollador
La mayoría de las aplicaciones se realizan tanto como promesas como callback
