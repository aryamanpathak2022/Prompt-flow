import express from 'express';
import Docker from 'dockerode';

const router = express.Router();
const docker = new Docker();

// create rand numer for container name

``

router.post('/create-container', async (req, res) => {
    const rand = Math.floor(Math.random() * 1000);

// Hardcoded values for image and name
const image =  'ubuntu:20.04'; // Example image
const name = 'prompt-flow-container' +"122"+ rand; // Example container name
    try {
        // Create a new Docker container
        const container = await docker.createContainer({
            Image: image,
            name: name,
            Tty: true,
            HostConfig: {
                Binds: ['/home/hemang/Desktop/Prompt-flow/api-server/langchain:/app/langchain'], // Correct path format for Docker
            },
            Cmd: [
                'sh', '-c',
                'apt-get update && apt-get install -y python3 python3-pip nodejs npm && ' +
                'pip3 install -r /app/langchain/requirements.txt && ' +
                'python3 /app/langchain/main.py && ' +
                'tail -f /dev/null'
            ]
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
