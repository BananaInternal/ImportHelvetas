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
// @id = ch.banana.uni.import.stripe
// @api = 1.0
// @pubdate = 2023-10-05
// @publisher = Banana.ch SA
// @description = OTP - Import movements .xml
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

    let otpBankFormat = new ImportOtpBankFormat(Banana.document);

    var CSV_String = otpBankFormat.convertXmlToCsv(xmlData);
    
    var csvFile = Banana.Converter.csvToArray(CSV_String, ',', '"');          
    var tsvFile = Banana.Converter.arrayToTsv(csvFile);
    return tsvFile;
}

/**
 * <transakcija>
 *   <datumknjizenja></datumknjizenja> accounting date
 *   <duguje></duguje> debit
 *   <potrazuje></potrazuje> credit
 *   bankaccount
 *   name
 *   
 * @param {*} banDocument 
 */
var ImportOtpBankFormat = class ImportOtpBankFormat extends ImportUtilities {
    constructor(banDocument) {
        super(banDocument);
    }

    convertXmlToCsv(xmlData) {
        
        var csvString = '"' + "Date" + '","' + "Description" + '","' + "Income" + '","' + "Expenses" + '"' + "\n";
        var xmlRoot = xmlData.firstChildElement('izvod');                      
        var entries = xmlRoot.firstChildElement('stavke');                       
        var transactionNode = entries.firstChildElement('transakcija');                        
        while (transactionNode) {                                                       
            var date = transactionNode.firstChildElement('datumKnjizenja').text;                 
            var amountDebit = transactionNode.firstChildElement('duguje').text;                
            var amountCredit = transactionNode.firstChildElement('potrazuje').text;    
            var zab16_4_tag = transactionNode.firstChildElement('detalji').firstChildElement('Zab16_4');
            var zab16_4_value = '';
            var description = '';
            if (zab16_4_tag) {
                zab16_4_value = zab16_4_tag.text;
                description = zab16_4_value + "; " + transactionNode.firstChildElement('detalji').firstChildElement('Opis').text;
            } else {
                description = transactionNode.firstChildElement('detalji').firstChildElement('Opis').text;
            }                           
            csvString += ('"' + date + '","' + description + '","' + amountCredit + '","' + amountDebit + '"' + '\n');                            
            transactionNode = transactionNode.nextSiblingElement('transakcija');                       
        }
        return csvString;
    }
}

