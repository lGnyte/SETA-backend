import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

if (!connectionString || !containerName) {
    throw new Error('Azure Blob Storage config missing in environment variables.');
}

// Create BlobServiceClient once
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

// Create ContainerClient once (will be used in the function)
const containerClient = blobServiceClient.getContainerClient(containerName);

export async function ensureContainerExists(): Promise<ContainerClient> {
    const exists = await containerClient.exists();
    if (!exists) {
        console.log(`Container "${containerName}" does not exist. Creating...`);
        await containerClient.create();
        console.log(`Container "${containerName}" created.`);
    }
    return containerClient;
}
