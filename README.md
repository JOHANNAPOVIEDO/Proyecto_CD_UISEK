El caso seleccionado: Servicio distribuido de mensajes.

Instrucciones de ejecución: docker-compose up --build.

//Descripciòn de la arquitectura: 
1.	Entrada: Un cliente externo (como Postman o curl) envía una petición HTTP al contenedor de Node.js.

2.	Procesamiento: El backend recibe la solicitud. Si es un POST /registrar, valida el mensaje; si es un GET /mensajes, prepara la consulta.

3.	Interacción de Red: El backend se comunica con el contenedor de PostgreSQL a través de la Red Interna de Docker utilizando el nombre del servicio como host.

4.	Respuesta: La base de datos devuelve los resultados al backend, y este los envía al cliente final en formato JSON.
