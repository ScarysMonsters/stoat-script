const copy = (text) => {
    const t = document.createElement('textarea');
    t.value = text;
    t.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(t);
    t.select();
    try { document.execCommand('copy'); } catch {}
    document.body.removeChild(t);
};

(async () => {
    const db = await indexedDB.open('localforage');
    const b = await new Promise(r => db.onsuccess = () => r(db.result));
    const a = await new Promise(r => b.transaction(['keyvaluepairs']).objectStore('keyvaluepairs').get('auth').onsuccess = (e) => r(e.target.result));
    const token = a?.session?.token;
    if (!token) return;
    copy(token);
    console.log('%cWorked!', 'font-size: 50px');
    console.log('%cYou now have your token in the clipboard!', 'font-size: 16px');
})();
