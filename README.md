# NestJS
learning Initial nestjs

gh codespace ports visibility 3000:public

For a quick fix just for this session, use the **Ports tab** in VS Code:

## Simple 3-step solution:

1. **Open Ports tab** in VS Code (bottom panel, next to Terminal)
2. **Right-click on port 3000** 
3. **Select "Port Visibility" → "Public"**

## Alternative - Command Palette:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Ports: Focus on Ports View"
3. Right-click port 3000 → **Port Visibility** → **Public**

## Or use terminal command:
```bash
gh codespace ports visibility 3000:public
```

This will make port 3000 public for the current session only. You'll need to repeat this each time you restart the codespace, but it's the fastest way without modifying any files!

The port will stay public as long as your current codespace session is running.