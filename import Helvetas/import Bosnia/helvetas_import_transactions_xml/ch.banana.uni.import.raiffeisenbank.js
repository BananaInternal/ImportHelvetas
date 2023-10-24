// Copyright [2023] [Banana.ch SA - Lugano Switzerland]
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
//
// @id = ch.banana.uni.import.raiffeisenbank
// @api = 1.0
// @pubdate = 2023-10-23
// @publisher = Banana.ch SA
// @description = Raiffeisen - Import movements .xml
// @doctype = 100.*; 110.*; 130.*
// @docproperties =
// @task = import.transactions
// @outputformat = transactions.simple
// @inputdatasource = openfiledialog
// @inputfilefilter = Text files (*.xml);;All files (*.*)
// @timeout = -1
// @includejs = import.utilities.js

/**
 * Main function
 */
function exec(inData, isTest) {
    var importUtilities = new ImportUtilities(Banana.document);

    var xmlData = {};
    try {
        xmlData = Banana.Xml.parse(inData);
    }
    catch (e) {
        xmlData[0] = inData;
    }

    if (!xmlData)
        return "@Cancel";

    if (isTest !== true && !importUtilities.verifyBananaAdvancedVersion())
        return "@Cancel";

    let raiffeisenBankFormat = new ImportRaiffeisenBankFormat(Banana.document);

    var CSV_String = raiffeisenBankFormat.convertXmlToCsv(xmlData);

    var csvFile = Banana.Converter.csvToArray(CSV_String, ',', '"');    
    // Banana.Ui.showText("List of transactions present in the xml file", CSV_String);      
    var tsvFile = Banana.Converter.arrayToTsv(csvFile);

    return tsvFile;
}

/**
 * @class ImportRaiffeisenBankFormat
 * @extends {ImportUtilities}
 * @param {*} banDoc
 * @description Class used for the import of the Raiffeisen Bank format
 */
var ImportRaiffeisenBankFormat = class ImportRaiffeisenBankFormat extends ImportUtilities {
    constructor(banDoc) {
        super(banDoc);
    }

    convertXmlToCsv(xmlData) {
        var csvString = '"' + "Date" + '","' + "Description" + '","' + "Income" + '","' + "CategoryDes" + '"' + "\n";
        var xmlRoot = xmlData.firstChildElement('IZ');
        
        var accountNumber = xmlRoot.attribute('RACUN');
        Banana.console.log("Account Number: " + accountNumber);
        // Banana.console.log("Date: " + entry.attribute('DATUM_VALUTE'));
        var entry = xmlRoot.firstChildElement('PR');
        while(entry) {
            var date = Banana.Converter.toInternalDateFormat(entry.attribute('DATUM_VALUTE'));
            var description = entry.attribute('SVRHA'); 
            var category = entry.attribute('SIFRA_DOZNAKE');
            var amount = Banana.Converter.toInternalNumberFormat(entry.attribute('IZNOS'), ",");
            // Banana.console.log("Date: " + date);
            csvString += ('"' + date + '","' + description + '","' + amount + '","' + category + '"' + '\n');
            entry = entry.nextSiblingElement('PR');
        }
        return csvString;
    }
}


