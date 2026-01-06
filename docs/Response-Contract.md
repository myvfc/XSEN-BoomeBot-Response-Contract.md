# XSEN / Boomer Bot — Response Contract (v1)

**Status:** Locked  
**Audience:** Frontend, Orchestrator, MCP Integrations  
**Scope:** XSEN / Boomer Bot platform  

This document defines the immutable response contract for the XSEN / Boomer Bot platform.

All frontend UI components, backend orchestrators, MCP integrations, and future services
MUST conform to this contract.

Implementation must adapt to this contract — not the other way around.

---

## Design Principles

- Boomer Bot is a **router**, not a monolithic chatbot
- No response may hallucinate data
- Authoritative data comes only from MCPs or known services
- Media (video/audio) is never streamed through the bot
- UI behavior is driven exclusively by response `type`

---

## Allowed Response Types

The system may return **ONLY** the following response types:

- `text` — fallback or guidance
- `video_vod` — on-demand video (XSEN Video MCP)
- `video_live` — live video launcher
- `audio` — live or recorded audio launcher
- `trivia` — structured trivia question
- `stats` — authoritative sports statistics
- `error` — service failure or unavailability

Any new feature must map to one of these types or require a new contract version.

---

## Master Response Envelope

All responses returned by the orchestrator MUST conform to this envelope.

```json
{
  "type": "<response_type>",
  "payload": {},
  "meta": {
    "source": "<data source>",
    "timestamp": "<ISO-8601>",
    "status": "ok | unavailable | error"
  }
}
