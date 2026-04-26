import vision from '@google-cloud/vision';
import dotenv from 'dotenv';

dotenv.config();

const client = new vision.ImageAnnotatorClient();

async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file detected in the request." });
        }

        const request = {
            image: {
                content: req.file.buffer 
            }
        };

        console.log("Processing image with Google Vision...");

        const [result] = await client.documentTextDetection(request);
        const fullTextAnnotation = result.fullTextAnnotation;

        if (!fullTextAnnotation) {
            return res.status(200).json({ 
                message: "Image processed, but no text was found.",
                rawText: "" 
            });
        }

        const detectedText = fullTextAnnotation.text;
        
        console.log("OCR Result Captured Successfully.");

        return res.status(200).json({
            message: "OCR Success",
            rawText: detectedText
        });

    } catch (error) {
        console.error("Vision API Error:", error);
        return res.status(500).json({ 
            error: "Google Vision failed to process the image. Check your service account permissions." 
        });
    }
}

export { uploadFile };