import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';
import {ensureContainerExists} from "../utils/azureClient";

export const AzureBlobService = {
    uploadBase64File: async (base64: string, folder?: string) => {
        const { mimeType, data } = parseBase64(base64);
        const containerClient = await ensureContainerExists();
        const blobName = uuidv4() + getExtensionFromMime(mimeType);

        const blobPath = folder ? `${folder.replace(/\/+$/, '')}/${blobName}` : blobName;

        const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

        const uploadResponse = await blockBlobClient.uploadData(data, {
            blobHTTPHeaders: {
                blobContentType: mimeType,
            },
        });

        return {
            url: blockBlobClient.url,
            etag: uploadResponse.etag,
        };
    }
};

function parseBase64(base64: string): { mimeType: string, data: Buffer } {
    const matches = base64.match(/^data:(.+);base64,(.+)$/);

    if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const data = Buffer.from(matches[2], 'base64');
        return { mimeType, data };
    }

    // Fallback: assume image/png if no prefix is found
    try {
        const data = Buffer.from(base64, 'base64');
        return { mimeType: 'image/png', data }; // default type
    } catch {
        throw new Error('Invalid base64 format');
    }
}

function getExtensionFromMime(mimeType: string): string {
    const map: Record<string, string> = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp',
    };

    return map[mimeType] || '';
}