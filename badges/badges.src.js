(function() {
    'use strict';
    
    const BADGES = {
        Developer: 1,
        Translator: 2,
        Supporter: 4,
        ResponsibleDisclosure: 8,
        Founder: 16,
        PlatformModeration: 32,
        ActiveSupporter: 64,
        Paw: 128,
        EarlyAdopter: 256,
        ReservedRelevantJokeBadge1: 512,
        ReservedRelevantJokeBadge2: 1024
    };
    
    const ALL_BADGES_VALUE = Object.values(BADGES).reduce((a, b) => a + b, 0);
    
    console.log('%cStoat All Badges Spoofer', 'font-size: 20px; font-weight: bold; color: #ff4655;');
    
    const client = window.__STOAT_CLIENT__ || window.__REVOLT_CLIENT__ || window.__CLIENT__;
    if (client && client.user) {
        client.user.badges = ALL_BADGES_VALUE;
    }
    
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        const response = await originalFetch.apply(this, args);
        const url = args[0];
        
        if (typeof url === 'string' && (url.includes('/users/') || url.includes('/user'))) {
            const cloned = response.clone();
            try {
                const body = await cloned.json();
                if (body && (body._id || body.id)) {
                    const modifiedBody = JSON.parse(JSON.stringify(body));
                    if (modifiedBody.badges !== undefined) {
                        modifiedBody.badges = ALL_BADGES_VALUE;
                    }
                    return new Response(JSON.stringify(modifiedBody), {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    });
                }
            } catch (e) {}
        }
        return response;
    };
    
    function injectBadges() {
        const profileElements = document.querySelectorAll('[class*="profile"], [class*="Profile"]');
        profileElements.forEach(el => {
            const avatarSection = el.querySelector('[class*="avatar"], [class*="Avatar"]');
            if (avatarSection && !avatarSection.querySelector('.stoat-spoofed-badges')) {
                const badgeContainer = document.createElement('div');
                badgeContainer.className = 'stoat-spoofed-badges';
                badgeContainer.style.cssText = 'display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;';
                
                const icons = {
                    Developer: 'D',
                    Translator: 'T',
                    Supporter: 'S',
                    ResponsibleDisclosure: 'R',
                    Founder: 'F',
                    PlatformModeration: 'M',
                    ActiveSupporter: 'A',
                    Paw: 'P',
                    EarlyAdopter: 'E',
                    ReservedRelevantJokeBadge1: 'J1',
                    ReservedRelevantJokeBadge2: 'J2'
                };
                
                Object.entries(BADGES).forEach(([name]) => {
                    const badge = document.createElement('div');
                    badge.className = `badge badge-${name.toLowerCase()}`;
                    badge.style.cssText = 'width: 24px; height: 24px; background: var(--accent-color, #ff4655); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; cursor: help; position: relative;';
                    badge.innerHTML = icons[name] || 'B';
                    badge.title = name;
                    
                    const tooltip = document.createElement('div');
                    tooltip.style.cssText = 'position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #000; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s; margin-bottom: 4px;';
                    tooltip.textContent = name;
                    badge.appendChild(tooltip);
                    
                    badge.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
                    badge.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
                    
                    badgeContainer.appendChild(badge);
                });
                
                avatarSection.appendChild(badgeContainer);
            }
        });
    }
    
    injectBadges();
    
    localStorage.setItem('stoat_badges_spoof', JSON.stringify({
        badges: ALL_BADGES_VALUE,
        timestamp: Date.now(),
        enabled: true
    }));
    
    const cache = window.__STOAT_CACHE__ || window.__CACHE__;
    if (cache && cache.users) {
        Object.values(cache.users).forEach(user => {
            if (user && user._id) {
                user.badges = ALL_BADGES_VALUE;
            }
        });
    }
    
    const interval = setInterval(injectBadges, 2000);
    
    window.stoatBadgesSpoofer = {
        stop: () => clearInterval(interval),
        getBadges: () => BADGES,
        setCustom: (value) => {
            if (client && client.user) {
                client.user.badges = value;
            }
        }
    };
})();