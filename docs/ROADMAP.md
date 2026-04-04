# FlowForge — Versioned Development Roadmap
**Project:** Visual AI Agent Builder (Pure JavaScript)  
**Versioning:** Semantic Versioning (SemVer)  
**Format:** `MAJOR.MINOR.PATCH`

---

## Versioning Rules

| Digit | Meaning | Example |
|---|---|---|
| **MAJOR** (X.0.0) | A full phase — significant new capability | `1.0.0` → `2.0.0` |
| **MINOR** (X.Y.0) | A feature within that phase | `1.0.0` → `1.1.0` |
| **PATCH** (X.Y.Z) | Bug fix within a feature | `1.1.0` → `1.1.1` |

---

## Phase 0 — Foundation
> *The project exists. It runs. It has structure.*

### `0.1.0` — Monorepo Scaffold
- Initialize monorepo with `/client` and `/server` directories
- Setup `package.json` for both with relevant scripts
- Configure ESLint + Prettier across both
- Setup `.env` handling (dotenv)
- Initialize Git repository with `.gitignore`
- Write initial `README.md` with project description

### `0.2.0` — Database Setup
- MongoDB connection via Mongoose
- Define initial schema — `users`, `flows`, `runs`, `node_definitions`
- Database connection health check endpoint `/health`
- Seed file with default node type definitions

### `0.3.0` — Authentication
- JWT-based auth (register, login, logout)
- Password hashing (bcrypt)
- Auth middleware for protected routes
- Refresh token handling
- Basic user profile endpoint

### `0.4.0` — Base API Layer
- Express server with route structure
- `/flows` CRUD endpoints (no execution yet)
- `/nodes` — list registered node types
- Error handling middleware
- Request validation (Zod)
- API response envelope `{ success, data, error }`

### `0.5.0` — Base Canvas (Static)
- React app initialized (Vite)
- React Flow installed and rendering
- Static draggable nodes on canvas (no logic yet)
- Left toolbar — node type list
- Right inspector panel — placeholder
- Basic Zustand store for canvas state
- Connect client to API — fetch and display saved flows

---

## Phase 1 — Execution Engine
> *Flows can actually run. Something happens when you press Execute.*

### `1.0.0` — Queue Infrastructure
- BullMQ installed and connected to Redis
- `flow-execution` queue created
- Basic worker process that picks up jobs
- Job status tracking — `pending | running | completed | failed`
- Retry logic — 3 attempts, exponential backoff
- Run record created in DB on every execution

### `1.1.0` — Node Executor Framework
- Core `NodeExecutor` class — standard interface for all node types
- Input resolver — pulls outputs from previous nodes into current node's inputs
- Run context object — shared state passed through entire execution
- Execution log emitter — every node logs start, completion, errors
- Basic traversal engine — walks the DAG in correct order

### `1.2.0` — WebSocket Streaming
- WebSocket server setup (ws or Socket.io)
- Real-time node execution events streamed to client
- Client-side run console component — live logs as agent runs
- Run status indicator on canvas nodes (idle / running / done / error)
- Reconnection handling if WebSocket drops mid-run

### `1.3.0` — Manual Trigger Node
- Manual Trigger node fully functional
- User provides text input → passed as initial context to flow
- "Run" button in UI triggers execution
- Flow validated before execution (no disconnected nodes, no missing config)
- Run panel opens automatically on execution start

### `1.4.0` — Output Node
- Text Output node — displays final agent response in run panel
- JSON Output node — renders structured output in formatted view
- Run marked complete when Output node is reached
- Output persisted to `runs` table

---

## Phase 2 — LLM Integration
> *The AI brain. Flows can now think.*

### `2.0.0` — Cloud LLM Node (Vercel AI SDK)
- Vercel AI SDK integrated on backend
- LLM Node supports Claude (Anthropic) and GPT-4 (OpenAI)
- User configures API key per node (stored encrypted)
- System prompt configurable
- Temperature and max tokens configurable
- LLM response passed as output to next node

### `2.1.0` — Additional Cloud Models
- Gemini (Google) support added to model router
- Groq (Llama) support added
- Model selector UI — dropdown showing all available models
- Per-model token limit awareness
- Graceful error handling for invalid API keys

### `2.2.0` — Local Model Node (TransformerJS)
- TransformerJS integrated in Node.js worker process
- Local model node type added — no API key required
- First supported models — `Xenova/distilgpt2`, `Xenova/flan-t5-small`
- Model downloaded on first use, cached locally
- UI clearly distinguishes Cloud vs Local model nodes
- Privacy badge — "Runs locally, no data leaves your machine"

### `2.3.0` — Structured Output Node
- Forces LLM to respond in a user-defined JSON schema
- User defines schema visually in inspector panel
- Output validated against schema — retry if invalid (up to 3 times)
- Downstream nodes receive typed, predictable data

### `2.4.0` — Chat Memory Node
- Buffer memory — last N messages retained in context
- Memory node connects between LLM nodes
- Conversation history injected into subsequent LLM prompts
- Memory scoped to a single run (cleared on new run)

---

## Phase 3 — Tool Nodes
> *The agent can now act. It can reach out to the world.*

### `3.0.0` — HTTP Request Node
- Configure method (GET, POST, PUT, DELETE)
- Headers, query params, request body configurable
- Response passed to next node
- Error handling — non-2xx responses surface clearly in logs
- Timeout handling

### `3.1.0` — Web Search Node
- Integrates a search API (SerpAPI or Brave Search API)
- Returns top N results with title, URL, snippet
- Results formatted and passed to next node
- Commonly paired with LLM node for summarization

### `3.2.0` — Code Executor Node
- User writes a small JS function in the node config
- Function receives previous node output as argument
- Returns transformed data to next node
- Sandboxed execution (vm2 or isolated-vm)
- Useful for data transformation between nodes

### `3.3.0` — Send Email Node
- SendGrid or SMTP integration
- To, subject, body configurable — supports dynamic values from previous nodes
- Confirmation logged on success
- Failure handled gracefully with retry

### `3.4.0` — File Read Node
- User uploads a file (PDF, CSV, TXT, JSON)
- File parsed and content passed to next node
- PDF text extraction (pdf-parse)
- CSV parsed to array of objects (papaparse)
- Commonly paired with LLM node for summarization or analysis

---

## Phase 4 — Logic and Control Flow
> *The agent can make decisions. Flows branch, loop, and adapt.*

### `4.0.0` — Condition Node
- If / Else branching based on previous node output
- Condition editor — simple expression builder (contains, equals, greater than, etc.)
- Two output handles — `true` branch and `false` branch
- Canvas visually shows both paths

### `4.1.0` — Transform Node
- JS function to reshape data between nodes
- Useful when one node's output shape doesn't match next node's expected input
- Preview of input and output data in inspector panel

### `4.2.0` — Loop Node
- Repeat a sub-flow a fixed number of times
- Or repeat until a condition is met
- Each iteration's output available to next iteration
- Max iteration cap to prevent infinite loops

### `4.3.0` — Merge Node
- Combines outputs from two parallel branches into one
- Configurable merge strategy — first wins / combine array / concatenate text
- Enables parallel execution paths that reconverge

---

## Phase 5 — Persistence and Sharing
> *Flows are saved, exported, shared, and reusable.*

### `5.0.0` — Flow Save and Load
- Auto-save flow on canvas change (debounced)
- Manual save with version label
- Load existing flows from dashboard
- Flow list view — name, last modified, run count

### `5.1.0` — Flow Export and Import
- Export flow as `.json` file
- Import flow from `.json` file
- Exported flows are Git-friendly — clean, readable JSON
- Share flows as files with other FlowForge users

### `5.2.0` — Flow Dashboard
- Home screen showing all user flows
- Run history per flow — status, timestamp, duration
- Quick re-run last execution from dashboard
- Delete, duplicate, rename flows

### `5.3.0` — Flow Templates
- Pre-built starter flows users can fork
- Template library — Summarize URL, Q&A over file, Email Drafter, Web Research Agent
- One-click fork — template copied to user's flows, fully editable

---

## Phase 6 — Developer Features
> *Developers get the power layer. Code export, APIs, custom nodes.*

### `6.0.0` — Webhook Trigger Node
- Each flow gets a unique webhook URL + secret token
- POST to webhook URL triggers flow execution
- Request body passed as initial trigger input
- Useful for integrating FlowForge into external systems

### `6.1.0` — Flow API Access
- Each deployed flow gets a REST endpoint
- `POST /api/flows/:id/invoke` — triggers flow, returns output
- API key authentication for external callers
- Rate limiting per API key

### `6.2.0` — Code Export
- Export any flow as equivalent JS code (LangChain.js)
- Generated code is clean, runnable, and documented
- Shows developers what the visual flow translates to in real code
- Bridges visual prototyping to production code

### `6.3.0` — Custom Node SDK
- Developers can write and register custom nodes
- Node definition format — input schema, output schema, executor function
- Custom nodes appear in toolbar alongside built-in nodes
- Local custom nodes loaded from a `/custom-nodes` directory

### `6.4.0` — Schedule Trigger Node
- Cron expression based scheduling
- Flow runs automatically on schedule
- Last run status visible on dashboard
- Enable / disable schedule without deleting flow

---

## Phase 7 — Production Readiness
> *The project is deployable, observable, and shareable publicly.*

### `7.0.0` — Deployment Setup
- Client deployed on Vercel
- Server + Redis + PostgreSQL deployed on Railway
- Environment configs for dev / staging / production
- CI/CD pipeline (GitHub Actions) — lint, test, deploy on merge to main

### `7.1.0` — Observability
- Structured logging (Winston or Pino) on server
- Log levels — info, warn, error
- Every agent run fully traceable in logs
- Failed runs include full error stack + node at which failure occurred

### `7.2.0` — Rate Limiting and Security
- API rate limiting (express-rate-limit)
- Input sanitization on all endpoints
- API keys encrypted at rest
- CORS configured for production domains

### `7.3.0` — Public Portfolio Polish
- Full README with architecture diagram, tech stack, demo GIF
- Live demo link in README
- Architecture document linked
- LinkedIn write-up published
- GitHub repository cleaned and well-documented

---

## Summary — The Full Arc

| Phase | Theme | Ends At |
|---|---|---|
| **Phase 0** | Foundation — scaffold, DB, auth, static canvas | `0.5.0` |
| **Phase 1** | Execution Engine — queue, traversal, WebSocket, run | `1.4.0` |
| **Phase 2** | LLM Integration — cloud models, local models, memory | `2.4.0` |
| **Phase 3** | Tool Nodes — HTTP, search, code, email, file | `3.4.0` |
| **Phase 4** | Logic and Control Flow — conditions, loops, merge | `4.3.0` |
| **Phase 5** | Persistence and Sharing — save, export, templates | `5.3.0` |
| **Phase 6** | Developer Features — webhook, API, code export, SDK | `6.4.0` |
| **Phase 7** | Production Readiness — deploy, observe, publish | `7.3.0` |

---

## Bug Fix Convention

When a bug is found and fixed within any version:

```
1.2.0   → WebSocket streaming shipped
1.2.1   → Fix: WebSocket drops on slow connections
1.2.2   → Fix: Run status not updating on client after reconnect
1.3.0   → Manual Trigger node shipped  (minor resets patch)
```

Patch versions are created as needed — there is no pre-planned patch schedule.

---

*Roadmap version 1.0 — subject to change based on learnings during development.*
