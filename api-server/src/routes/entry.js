import express from 'express';
import Docker from 'dockerode';

const router = express.Router();
const docker = new Docker();

// Hardcoded values for image and name
const image =  'python'; // Example image
const name = 'prompt-flow-container'; // Example container name


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
            Cmd: ['python3', '/app/langchain/index.py'], // Command to run index.py in the container
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
