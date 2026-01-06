# XSEN / Boomer Bot — Response Contract (v1)

**Status:** Locked  
**Audience:** Frontend, Orchestrator, MCP Integrations  

This document defines the immutable response contract for the XSEN / Boomer Bot platform.

All frontend UI components, backend orchestrators, MCP integrations, and future services
MUST conform to this contract.

Implementation must adapt to this contract — not the other way around.

---

## Design Principles

- Boomer Bot is a router, not a conversational AI
- No response may hallucinate data
- All authoritative data must come from MCPs or known services
- Media is never streamed through the bot
- Frontend behavior is driven strictly by `type`

---

## Allowed Response Types

The system may return ONLY the following response types:

- `text`
- `video_vod`
- `video_live`
- `audio`
- `trivia`
- `stats`
- `error`

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
TEXT
Used as a safe fallback when no intent is matched.

json
Copy code
{
  "type": "text",
  "payload": {
    "message": "Ask me for Oklahoma Sooners highlights, live audio, stats, or trivia."
  },
  "meta": {
    "source": "INTERNAL",
    "timestamp": "2026-01-01T00:00:00Z",
    "status": "ok"
  }
}
Rules:

No HTML

No media

No hallucinated links

VIDEO_VOD
Used for on-demand video results returned from the XSEN Video MCP.

json
Copy code
{
  "type": "video_vod",
  "payload": {
    "results": [
      {
        "id": "string",
        "title": "string",
        "thumbnail": "url",
        "url": "url",
        "duration": "string",
        "published_at": "ISO-8601"
      }
    ]
  },
  "meta": {
    "source": "XSEN",
    "timestamp": "2026-01-01T00:00:00Z",
    "status": "ok"
  }
}
Rules:

Results MUST come from the XSEN Video MCP

All URLs must be real

No fabricated thumbnails or links

VIDEO_LIVE
Used to launch a live video stream hosted on an external platform.

json
Copy code
{
  "type": "video_live",
  "payload": {
    "title": "Boomer Bot Live FanCast",
    "watch_url": "url",
    "platform": "youtube | owncast | prism | other",
    "status": "live | scheduled | offline",
    "scheduled_start": "ISO-8601"
  },
  "meta": {
    "source": "INTERNAL",
    "timestamp": "2026-01-01T00:00:00Z",
    "status": "ok"
  }
}
Rules:

The bot never streams video

The bot only points to live streams

AUDIO
Used to launch live or recorded audio streams.

json
Copy code
{
  "type": "audio",
  "payload": {
    "title": "Boomer Bot Live Audio",
    "stream_url": "url",
    "codec": "aac | mp3",
    "status": "live | offline"
  },
  "meta": {
    "source": "INTERNAL",
    "timestamp": "2026-01-01T00:00:00Z",
    "status": "ok"
  }
}
Rules:

Audio is hosted externally

No audio bytes pass through chat

TRIVIA
Used for structured trivia questions.

json
Copy code
{
  "type": "trivia",
  "payload": {
    "id": "string",
    "question": "string",
    "choices": ["string"],
    "difficulty": "easy | medium | hard",
    "category": "football | basketball | softball | history | general"
  },
  "meta": {
    "source": "INTERNAL",
    "timestamp": "2026-01-01T00:00:00Z",
    "status": "ok"
  }
}
Rules:

Trivia is deterministic

No AI-generated questions

STATS
Used for authoritative sports statistics from ESPN and college football MCPs.

json
Copy code
{
  "type": "stats",
  "payload": {
    "sport": "football",
    "team": "Oklahoma Sooners",
    "season": "2025",
    "record": "10-2",
    "ranking": 8,
    "conference": "SEC",
    "last_game": {
      "opponent": "Texas",
      "result": "W",
      "score": "34-30",
      "date": "ISO-8601"
    }
  },
  "meta": {
    "source": "ESPN",
    "timestamp": "2026-01-01T00:00:00Z",
    "status": "ok"
  }
}
Rules:

Stats must come from MCPs only

No inferred or guessed data

ERROR
Used when a requested service is unavailable or fails.

json
Copy code
{
  "type": "error",
  "payload": {
    "message": "Stats are temporarily unavailable."
  },
  "meta": {
    "source": "ESPN",
    "timestamp": "2026-01-01T00:00:00Z",
    "status": "error"
  }
}
Rules:

Never guess

Fail clearly and honestly

Contract Rules (Non-Negotiable)
Existing fields may NOT be renamed or removed

Optional fields may be added in future versions

New response types require a new contract version

Frontend logic MUST switch on type only

MCP failures must never result in fabricated responses

This document is the single source of truth for the XSEN / Boomer Bot platform.

vbnet
Copy code

---

## ✅ What to Do Now

1. Paste this **exactly** into  
   `docs/XSEN-BoomerBot-Response-Contract.md`
2. Commit it
3. Stop

You are **done with documentation** for this phase.

When you’re ready to continue, the next step is:

> **Build frontend renderers using mock responses from this contract.**

If you want, say:  
**“Contract committed — verify structure.”**







