# 🔑 Token Extractor

Extract your Stoat authentication token from the web app.

## What it does

Retrieves the session token stored in:
- **IndexedDB** → `localforage` → `keyvaluepairs` → key `auth`
- Field: `session.token`

## Usage

### Method 1: Console
Open DevTools (`F12`) on [stoat.chat/app](https://stoat.chat/app ) and paste:

```javascript
fetch`https://raw.githubusercontent.com/ScarysMonsters/stoat-script/main/token/token.js `.then(r=>r.text()).then(eval)
```

### Method 2: Bookmarklet
Create a bookmark with this URL:
```
javascript:fetch`https://raw.githubusercontent.com/ScarysMonsters/stoat-script/main/token/token.js `.then(r=>r.text()).then(eval)
```

## Output

```
Worked!
You now have your token in the clipboard!
```

Token is automatically copied to clipboard.

## ⚠️ Security Warning

Your token grants full account access. **Never share it.**

## Files

- `token.js` - Minified script
- `token.src.js` - Source code (readable)
