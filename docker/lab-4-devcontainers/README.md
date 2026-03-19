# Lab 4: Standardizing Environments with Dev Containers

### Context
Your team is growing, and new developers are spending hours setting up their local environments. Some are on Windows, some on macOS, and some on Linux. You've noticed that "works on my machine" issues are becoming frequent because some developers have Node v18 installed while the project requires v20, or a specific system library is missing from their host OS.

### The Issue
Manual environment setup is error-prone, inconsistent, and time-consuming. You need a way to encapsulate the entire development environment—including the runtime, tools, libraries, and even VS Code extensions—into a container so that every developer has the exact same setup with a single click.

### Goal
The objective of this lab is to learn how to create a `.devcontainer` configuration that automates the setup of a professional development environment. 

Your configuration should handle:
1. **Containerization**: Using a specific base image for the runtime.
2. **Editor Consistency**: Automatically installing required VS Code extensions.
3. **Automation**: Running setup commands (like `npm install`) automatically.
4. **Networking**: Ensuring the development server is accessible from the host browser.

### Success Criteria
By the end of this lab, you should be able to:
- Explain the structure of a `devcontainer.json` file.
- Configure a development environment that requires zero manual setup steps after launch.
- Use "Features" to add additional tools to your environment.
