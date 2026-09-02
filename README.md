# Spark Services

Discord bot & Minecraft server hosting on AMD Epyc nodes with NVMe storage.

## Features

- **Discord Bot Hosting**: Node 20, Python 3.11, Java 21
- **Minecraft Server Hosting**: Paper, Fabric, Forge, Vanilla, Modpacks
- **Pterodactyl Panel**: Full control panel access
- **AMD Epyc + NVMe**: Dedicated CPU cores, high-performance storage
- **60-second Deploy**: Get your server online in under a minute
- **24/7 Support**: Real humans in Discord
- **99.9% Uptime**: Monitored around the clock

## Project Structure

```
.
├── index.html           # Main marketing website
├── dash.html            # Admin dashboard
├── server.js            # Node.js server + Pterodactyl proxy
├── wings-diag.js        # Diagnostic tool for daemon status
├── AGENTS.md            # Design system documentation
├── css/
│   ├── styles.css       # Main styles
│   └── dash.css         # Dashboard styles
├── js/
│   ├── script.js        # Main website JavaScript
│   ├── dash.js          # Dashboard JavaScript
│   └── owners.js        # Team section
└── assets/
    ├── logo.jpg
    ├── united.png       # English flag
    ├── saudi.png        # Arabic flag
    └── germany.png      # Germany flag
```

## Getting Started

### Prerequisites

- Node.js 20+
- Pterodactyl panel with Application API key

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/abdouxmale468-arch/spark-services.git
   cd spark-services
   ```

2. Configure environment variables:
   ```bash
   export PTERODACTYL_PANEL="https://your-panel.com"
   export PTERODACTYL_KEY="ptla_your_api_key"
   export PTERODACTYL_CLIENT_KEY="ptlc_optional_client_key"
   export PORT=3000
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open http://localhost:3000 in your browser

## Architecture

### Frontend

- Vanilla HTML/CSS/JavaScript (no build step)
- Responsive design with dark theme
- Bilingual support (English/Arabic) with RTL
- i18n system using `data-i18n` attributes

### Backend

- Node.js static file server
- Pterodactyl API proxy at `/api/ptero/*`
- Wings daemon bridge for real-time server status
- No external dependencies

## Design System

See [AGENTS.md](./AGENTS.md) for the complete design system documentation.

### Colors

- Background: `#09090b`
- Primary Blue: `#3b5eff`
- Text: `#ececef`
- Muted: `#9d9da6`

### Typography

- **EN**: Space Grotesk
- **AR**: IBM Plex Sans Arabic
- **Mono**: JetBrains Mono

### Shapes

- All corners fully rounded (22px radius on cards, 999px on buttons)
- Smooth transitions at 0.2s

## License

MIT