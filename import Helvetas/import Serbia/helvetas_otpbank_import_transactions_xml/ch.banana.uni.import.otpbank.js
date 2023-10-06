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
// @inputfilefilter = Text files (*.txt *.csv);;All files (*.*)
// @timeout = -1
// @includejs = import.utilities.js


/**
 * Main function
 */
function exec(inData, isTest) {

    var xmlData = {};
    try {
        xmlData = JSON.parse(inData);
    }
    catch (e) {
        xmlData[0] = inData;
    }

    if (!xmlData)
        return "@Cancel";

}