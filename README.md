# testMaker

# DATA DB

- Es una base de datos de Firestore que contiene dos colecciones una llamada characters y la otra llamada planets dentro de ellas vamos a tener

characters: affiliation, createAt, description, gender, id, idPlanet, uid, image, ki, maxKi, name, race

planets: createAt, description, id, uid, image, isDestroyed, name

# index.js

Es este script vamos a encontrar la conexión de la base de datos y una consulta de los characters para generar un CSV con los datos de la base. Este informe se genera en la carpeta csv con el nombre de characters.csv y para crearlo basta con correr el comando npm start una vez tengamos las dependencias instaladas en node


Es necesario para correr el script la cuenta de servicio llamada testmaker-service.json que es un archivo que está en el repositorio, debes solicitar los datos y remplazarlos en el archivo.
