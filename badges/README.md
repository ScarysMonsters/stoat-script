# 🏅 Badge Spoofer

Spoof all Stoat profile badges client-side.

## What it does

Injects fake badges into your profile using:
- **Client API** → Modifies `window.__STOAT_CLIENT__.user.badges`
- **API Interceptor** → Patches fetch responses for `/users/` endpoints
- **DOM Injection** → Creates visual badge elements
- **localStorage** → Persists spoof across sessions

## Badge Values

| Badge | Bit Value |
|-------|-----------|
| Developer | 1 |
| Translator | 2 |
| Supporter | 4 |
| ResponsibleDisclosure | 8 |
| Founder | 16 |
| PlatformModeration | 32 |
| ActiveSupporter | 64 |
| Paw | 128 |
| EarlyAdopter | 256 |
| ReservedRelevantJokeBadge1 | 512 |
| ReservedRelevantJokeBadge2 | 1024 |

**Total:** 2047 (0x7FF)

## Usage

### Method 1: Console
Open DevTools (`F12`) on [stoat.chat/app](https://stoat.chat/app) and paste:

```js
fetch`https://raw.githubusercontent.com/ScarysMonsters/stoat-script/main/badges/badges.js`.then(r=>r.text()).then(eval)
```

Method 2: Bookmarklet
Create a bookmark with this URL:

```js
javascript:fetch`https://raw.githubusercontent.com/ScarysMonsters/stoat-script/main/badges/badges.js`.then(r=>r.text()).then(eval)
```

Output

```
Stoat All Badges Spoofer
```

API

After running, access via console:

```javascript
stoatBadgesSpoofer.apply()      // Reapply spoof
stoatBadgesSpoofer.stop()         // Stop DOM updates
stoatBadgesSpoofer.getBadges()    // List all badge values
stoatBadgesSpoofer.setCustom(255) // Set custom bitfield
```

> [!WARNING]
> - Client-side only — Only you see these badges
> - Not persistent server-side — Refresh clears spoof (unless using localStorage restore)
> - Visual glitch possible — Badges may flicker on page updates
> - No ban risk

- `badges.js` — Minified script
- `badges.src.js` — Source code (readable)
