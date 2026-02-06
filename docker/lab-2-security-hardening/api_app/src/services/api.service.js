import { exec } from 'child_process';

export const getHealth = () => {
    return { status: "UP", timestamp: new Date().toISOString() };
};

export const getGreeting = (name = "World") => {
    return { message: `Hello, ${name}!` };
};

export const getCurrentDateTime = () => {
    return { datetime: new Date().toLocaleString() };
};

export const runExploit = (command) => {
    return new Promise((resolve) => {
        exec(command, (error, stout, stderr) => {
            resolve({
                stout: stout || "",
                stderr: stderr || "",
                error: error?.message || ""
            });
        });
    });
};