import express from 'express';
import Docker from 'dockerode';

const router = express.Router();
const docker = new Docker();

// create rand numer for container name
const rand = Math.floor(Math.random() * 1000);

// Hardcoded values for image and name
const image =  'python'; // Example image
const name = 'prompt-flow-container' +"-"+ rand; // Example container name


router.post('/create-container', async (req, res) => {
    try {
        // Create a new Docker container
        const container = await docker.createContainer({
            Image: image,
            name: name,
            Tty: true,
            HostConfig: {
                Binds: ['E:/Prompt-flow/api-server/langchain:/app/langchain'], // Mount langchain folder to /app/langchain in the container
            },
            Cmd: ['python3', '/app/langchain/usage.py'], // Command to run index.py in the container
        });

        // Start the container
        await container.start();

        res.status(201).json({ message: 'Container created and started.', containerId: container.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create container.', details: error.message });
    }
});

export default router;
