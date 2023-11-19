import type { NextApiRequest, NextApiResponse } from "next";
var xlsx = require("xlsx");

type ResponseData = {
    message: string;
};

type RequestBody = {
    file: File;
};
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const body = req.body;
    console.log("body: ", body);
    // let wb = xlsx.read(file.arrayBuffer);

    res.status(200).json({ message: "Hello from Next.js!" });
}
