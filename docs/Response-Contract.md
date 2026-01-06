# XSEN / Boomer Bot — Response Contract (v1)

**Status:** LOCKED  
**Audience:** Frontend UI, Railway Orchestrator, MCP Integrations  

This document defines the immutable response contract for the XSEN / Boomer Bot platform.

All frontend UI components, backend orchestrators, MCP integrations, and future services
MUST conform to this contract.

Implementation must adapt to this contract — not the other way around.

---

## Design Principles

- Boomer Bot is a **router**, not a conversational AI
- The system must **never hallucinate**
- All authoritative data must come from MCPs or known services
- Media is **never streamed through chat**
- Frontend behavior is driven **only by the `type` field**

---

## Allowed Response Types

- `text`
- `video_vod`
- `video_live`
- `audio`
- `trivia`
- `stats`
- `error`

---

## Master Response Envelope

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
```

Rules:
- `type` controls frontend rendering
- `payload` is type-specific
- `meta.source` identifies the authority
- `meta.status` reflects availability

---

## TEXT

```json
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
```

---

## VIDEO_VOD

```json
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
```

---

## VIDEO_LIVE

```json
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
```

---

## AUDIO

```json
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
```

---

## TRIVIA

```json
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
```

---

## STATS

```json
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
```

---

## ERROR

```json
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
```

---

## Contract Rules (Non-Negotiable)

- Fields may NOT be renamed or removed
- Optional fields may be added later
- New response types require a new contract version
- Frontend MUST switch on `type`
- MCP failures must never fabricate data
