import type { NextApiRequest, NextApiResponse } from "next";
var xlsx = require("xlsx");

type ResponseData = {
    json: any;
    tableRange: string;
};

type RequestBody = {
    collection: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    let { collection }: RequestBody = req.body;
    collection = JSON.parse(collection);
    // create worksheet for the collection
    var ws = xlsx.utils.json_to_sheet(collection);
    // create new workbook to store the ws
    let wb = xlsx.utils.book_new();
    // append the worksheet to the workbook
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    // generate a bytes file to return to the user
    let file = xlsx.write(wb, { bookType: "xlsx", type: "base64" });
    const lenOfColumns = Object.keys(collection[0]).length;
    let tableRange = `A1:${calcBottomRange(lenOfColumns)}${collection.length + 1}`;
    res.status(200).json({ json: file, tableRange });
}

function calcBottomRange(numOfColumns: number) {
    // create list of alphabeth
    const alpha = Array.from(Array(27)).map((e, i) => i + 64);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    return (function calculateText(number: number): string {
        if (number > 0 && number < 27) {
            return alphabet[number];
        } else {
            let divided = Math.floor(number / 26);
            let remainder = number % 26;
            if (remainder === 0) {
                return calculateText(divided - 1) + alphabet[26];
            } else {
                return calculateText(divided) + alphabet[remainder];
            }
        }
    })(numOfColumns);
}
