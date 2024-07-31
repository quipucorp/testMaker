const admin = require('firebase-admin');


/* The line `const csv = require('csv-stringify');` is importing the `csv-stringify` library in the
JavaScript code. This library is used for creating CSV (Comma Separated Values) data from arrays or
objects. It provides functionality to convert data into CSV format, which can be useful for
exporting data in a structured format that can be easily read and manipulated by spreadsheet
programs or other tools. */
const csv = require('csv-stringify');
const fs = require('fs');

/* The line `const serviceAccount = require("./testmaker-service.json");` is importing the service
account credentials from a JSON file named `testmaker-service.json`. These credentials are necessary
for initializing the Firebase app and establishing a secure connection to the Firebase services. The
service account JSON file typically contains information such as the project ID, private key, client
email, and other authentication details required for accessing Firebase services programmatically. */
const serviceAccount = require("./testmaker-service.json");


/* The line `const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount),
databaseURL: "https://testmaker-3996f.firebaseapp.com" });` is initializing the Firebase app with
the provided configuration. */
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testmaker-3996f.firebaseapp.com"   
});

/**
 * The function retrieves character data from a Firestore collection, stores it in a CSV format, and
 * saves it to a file.
 */
async function main() {
  const dataStore = app.firestore();
  const dataFirebase = dataStore
  .collection("characters")
  .limit(100);
  const dataCsv = [];
  const characters = await dataFirebase.get();
  console.log(characters.size, 'characters total');
  await characters.forEach(async (dataRes) => {
    const character = dataRes.data();
    dataCsv.push(character);
    //console.log(character, 'character');
  });

  csv.stringify(dataCsv, { header: true }, (err, output) => {
    if (err) {
      console.error(err);
    } else {
      fs.writeFileSync('csv/characters.csv', output);
      console.log('CSV file created successfully');
    }
  });
}

main()