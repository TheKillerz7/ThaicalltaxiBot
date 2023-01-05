const { google } = require("googleapis")

const auth = new google.auth.GoogleAuth({
    //the key file
    keyFile: "keys.json",
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets", 
});

const spreadsheetId = "1OCB-nScxN5BK7rzIN9FBOFSTf3f4ViZL2no1C3KtmmM";

//Auth client Object
const authClientObject = async () => await auth.getClient();

//Google sheets instance
const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject() });

const sheetsInfo = async () => {
    const sheetInfo = await googleSheetsInstance.spreadsheets.get({
      auth,
      spreadsheetId, 
    });
  
    return sheetInfo
}

const readSheets = async (range) => {
    try {
        const readData = await googleSheetsInstance.spreadsheets.values.get({
            auth, //auth object
            spreadsheetId, // spreadsheet id
            range, //range of cells to read from.
        })
    
        return readData.data
    }
    catch (err) {
        return err
    }
}

const writeSheets = (range, values) => {
    try {
        googleSheetsInstance.spreadsheets.values.append({
            auth, //auth object
            spreadsheetId, //spreadsheet id
            range, //sheet name and range of cells
            valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
            resource: {
                values: [["", ...values]]
            },
        });
    } 
    catch (err) {
        return err
    }
    return "Writing data successful!!"
}

module.exports = {
    sheetsInfo,
    readSheets,
    writeSheets
 }