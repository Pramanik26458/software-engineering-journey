const ImageKit = require("@imagekit/nodejs").default;

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile({ buffer, filename, folder = "" }) {
    try {
        const file = await client.files.upload({
            file: Buffer.from(buffer),
            fileName: filename,
            folder: folder
        });

        return file;
    } catch (error) {
        console.error("Error uploading file to ImageKit:", error);
        throw error;
    }
}

module.exports = { uploadFile };