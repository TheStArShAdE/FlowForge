# FlowForge

A visual AI agent builder. Build, connect, and run AI agents using a drag-and-drop canvas — no code required.

## Tech Stack

**Frontend:** React, Vite, React Flow, Zustand, Tailwind CSS, shadcn/ui  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**AI:** LangChain.js, Transformers.js  
**Queue:** BullMQ, Redis (Phase 1)

## Project Structure

flowforge/
├── client/     # React frontend
├── server/     # Express backend
└── docs/       # Documentation

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB
- npm >= 9

### Install
```bash
git clone https://github.com/yourusername/flowforge.git
cd flowforge
npm install
```

### Run
```bash
npm run dev
```

Client runs on `http://localhost:5173`  
Server runs on `http://localhost:5000`

## Roadmap

See [ROADMAP.md](./docs/ROADMAP.md) for the full versioned development plan.

## License

ISC