import {google} from "googleapis";
import * as path from "path"; 

const secretFolderPath = path.join(__dirname, "..", "..", 'google_sheet.json');

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(secretFolderPath),

    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({version: 'v4', auth});

export async function writeToSheet(values: string[][]) {
    const spreadsheetId = process.env.SPREAD_SHEET_ID as string;
    const newSheetTitle = 'registered'; // New sheet title
    const valueInputOption = "USER_ENTERED";

    const resource = {
        values
    };

    try {
        // Change the sheet title
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId: spreadsheetId,
            requestBody: {
                requests: [
                    {
                        updateSheetProperties: {
                            properties: {
                                sheetId: 0, // Assuming Sheet1 is the first sheet
                                title: newSheetTitle,
                            },
                            fields: 'title'
                        }
                    }
                ]
            }
        });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: `${newSheetTitle}!A1:A`, // Assuming column A contains continuous data
        });

        const headersExist = response.data.values && response.data.values.length > 0;

        // Remove headers from values if they exist
        if (headersExist) {
            values.shift(); // Remove the first element (headers) from the values array
        }

        // Determine the range to update
        const numRows = response.data.values ? response.data.values.length : 0;
        const range = `${newSheetTitle}!A${headersExist ? numRows + 1 : 1}`;

        // Update values in the new sheet
        const res = await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: valueInputOption,
            requestBody: resource
        });

        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export async function writeToSheetForPaid(values: any[][], newSheetTitle: string) {
    const spreadsheetId = process.env.SPREAD_SHEET_ID as string;
    const valueInputOption = "USER_ENTERED";

    try {
        // Check if the sheet already exists
        const sheetExistsResponse = await sheets.spreadsheets.get({
            spreadsheetId: spreadsheetId,
            ranges: [newSheetTitle],
        });

        // If the sheet exists, get its properties
        let sheetId;
        if (sheetExistsResponse && sheetExistsResponse.data.sheets && sheetExistsResponse.data.sheets.length > 0) {
            sheetId = sheetExistsResponse?.data?.sheets[0].properties?.sheetId;
        } else {
            // Create a new sheet if it doesn't exist
            const batchUpdateResponse = await sheets.spreadsheets.batchUpdate({
                spreadsheetId: spreadsheetId,
                requestBody: {
                    requests: [
                        {
                            addSheet: {
                                properties: {
                                    sheetId: 1,
                                    title: newSheetTitle,
                                }
                            }
                        }
                    ]
                }
            });
            sheetId = batchUpdateResponse?.data?.replies?.[0]?.addSheet?.properties?.sheetId;
        }


        console.log("New sheet title:", newSheetTitle);
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: `${newSheetTitle}!A1:A`, // Assuming column A contains continuous data
        });
        const headersExist = response.data.values && response.data.values.length > 0;
        
        // Remove headers from values if they exist
        if (headersExist) {
            values.shift(); // Remove the first element (headers) from the values array
        }
        
        // Determine the range to update
        const numRows = response.data.values ? response.data.values.length : 0;
        const range = `${newSheetTitle}!A${headersExist ? numRows + 1 : 1}`;

        

        // Update values in the determined sheet
        const res = await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetId,
            range: range,
            valueInputOption: valueInputOption,
            requestBody: { values }
        });

        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}


