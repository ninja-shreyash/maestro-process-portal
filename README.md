# Maestro Process Portal

A modern web application for viewing and managing UiPath Maestro processes, their instances, BPMN diagrams, and execution history. Built with React, TypeScript, and Cloudflare Workers for enterprise-grade performance and reliability.

[cloudflarebutton]

## Features

- **Process Overview**: Browse all Maestro processes with status counts and metadata
- **Instance Management**: View detailed process instances with real-time status updates
- **BPMN Visualization**: Interactive BPMN diagram viewer showing process flows
- **Execution History**: Complete audit trail of process runs and activities
- **Instance Control**: Pause, resume, and cancel running process instances
- **Real-time Updates**: Live data synchronization with UiPath Orchestrator
- **Responsive Design**: Modern UI that works seamlessly across all devices
- **Dark/Light Theme**: Toggle between themes for optimal viewing experience

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with full IntelliSense
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - High-quality, accessible React components
- **React Query** - Powerful data synchronization and caching
- **React Router** - Client-side routing and navigation
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and transitions

### Backend
- **Cloudflare Workers** - Edge computing platform for global performance
- **Hono** - Fast, lightweight web framework for Workers
- **Durable Objects** - Stateful serverless computing for data persistence

### UiPath Integration
- **UiPath TypeScript SDK** - Official SDK for Orchestrator API integration
- **Maestro API** - Process orchestration and management
- **BPMN Viewer** - Interactive process diagram visualization

## Prerequisites

- **Bun** - Fast JavaScript runtime and package manager
- **UiPath Cloud** - Access to UiPath Orchestrator with Maestro processes
- **Cloudflare Account** - For deployment (optional for local development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd maestro-process-port-gqwfjdujf8umlqdmozmyc
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure UiPath connection**
   
   Update the UiPath client configuration in `src/lib/uipath.ts`:
   ```typescript
   export const uipath = new UiPath({
     baseUrl: 'https://your-tenant.uipath.com',
     orgName: 'your-org',
     tenantName: 'your-tenant',
     secret: 'your-api-token'
   });
   ```

4. **Start development server**
   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:3000`

## Development

### Project Structure

```
src/
├── components/
│   ├── maestro/          # Maestro-specific components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   └── layout/           # Layout components
├── hooks/
│   └── useUiPathMaestro.ts  # React Query hooks for UiPath API
├── lib/
│   └── uipath.ts         # UiPath SDK configuration
├── pages/
│   └── HomePage.tsx      # Main application page
└── main.tsx              # Application entry point

worker/
├── index.ts              # Worker entry point
├── userRoutes.ts         # API routes
└── durableObject.ts      # Durable Object implementation
```

### Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run deploy` - Deploy to Cloudflare Workers
- `bun run lint` - Run ESLint for code quality

### Adding New Features

1. **UiPath API Integration**: Add new hooks in `src/hooks/useUiPathMaestro.ts`
2. **UI Components**: Create components in `src/components/maestro/`
3. **Backend Routes**: Add API endpoints in `worker/userRoutes.ts`
4. **Data Persistence**: Extend Durable Object methods in `worker/durableObject.ts`

## Usage

### Viewing Processes

1. **Browse Processes**: The home page displays all available Maestro processes with status counts
2. **Process Details**: Click on any process to view its instances
3. **Instance Management**: Select an instance to see detailed information and controls

### Managing Instances

- **Pause**: Temporarily halt a running process instance
- **Resume**: Continue a paused process instance
- **Cancel**: Permanently stop a process instance
- **Monitor**: View real-time status updates and execution history

### BPMN Diagrams

- **Interactive Viewer**: Pan, zoom, and explore process diagrams
- **Execution Status**: See current execution state highlighted in the diagram
- **Process Flow**: Understand the complete process workflow visually

## Configuration

### UiPath Connection

The application requires valid UiPath Orchestrator credentials. Configure these in `src/lib/uipath.ts`:

- `baseUrl`: Your UiPath Cloud tenant URL
- `orgName`: Organization name in UiPath
- `tenantName`: Tenant name in UiPath
- `secret`: API access token with appropriate permissions

### Required Permissions

Ensure your UiPath API token has the following permissions:
- Maestro processes read access
- Process instances read/write access
- BPMN diagram access
- Execution history access

## Deployment

### Cloudflare Workers

[cloudflarebutton]

**Manual Deployment:**

1. **Install Wrangler CLI**
   ```bash
   bun add -g wrangler
   ```

2. **Authenticate with Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy to production**
   ```bash
   bun run deploy
   ```

### Environment Variables

No additional environment variables are required. All configuration is handled through the UiPath SDK initialization.

### Custom Domain (Optional)

To use a custom domain:

1. Add your domain to Cloudflare
2. Configure DNS settings
3. Update the Worker route in Cloudflare dashboard

## API Reference

### Maestro Processes

- `GET /api/maestro/processes` - List all Maestro processes
- `GET /api/maestro/instances` - List all process instances
- `GET /api/maestro/instances/:id` - Get specific instance details
- `POST /api/maestro/instances/:id/pause` - Pause an instance
- `POST /api/maestro/instances/:id/resume` - Resume an instance
- `POST /api/maestro/instances/:id/cancel` - Cancel an instance

### BPMN Diagrams

- `GET /api/maestro/instances/:id/bpmn` - Get BPMN diagram XML
- `GET /api/maestro/instances/:id/history` - Get execution history

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the [UiPath Documentation](https://docs.uipath.com/)
- Review [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- Open an issue in this repository

## Acknowledgments

- Built with [UiPath TypeScript SDK](https://www.npmjs.com/package/@uipath/uipath-typescript)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)