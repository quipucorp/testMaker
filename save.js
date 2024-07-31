const admin = require('firebase-admin');

// Inicializa la app de Firebase con tu configuración
var serviceAccount = require("./testmaker-admin.json");

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testmaker-3996f.firebaseapp.com"   

});

const db = app.firestore();

// Función para guardar un planeta
async function savePlanet(planetData) {
  try {
    const docRef = await db.collection('planets').add(planetData);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar el planeta:", error);
  }
}

// Función para guardar un personaje
async function saveCharacter(characterData, planetId) {
  try {
    const charactersRef = db.collection('characters');
    const newCharacterRef = await charactersRef.add(characterData);
    // Actualizar el planeta para agregar la referencia al personaje (opcional)
    await db.collection('planets').doc(planetId).update({
      characters: admin.firestore.FieldValue.arrayUnion(newCharacterRef.id)
    });
  } catch (error) {
    console.error("Error al guardar el personaje:", error);
  }
}

// Función principal para procesar el JSON
async function processData(jsonData) {
  for (const planet of jsonData) {
    const planetKey = await savePlanet(planet);

    for (const character of planet.characters) {
      await saveCharacter(character, planetKey);
    }
  }
}

// Cargar el JSON (aquí puedes reemplazar con tu método de carga)
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./datos.json'));
console.log(jsonData)
processData(jsonData)
  .then(() => {
    console.log('Datos guardados exitosamente');
  })
  .catch((error) => {
    console.error('Error al guardar los datos:', error);
  });