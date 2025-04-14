// ==UserScript==
// @name         Infinite credits
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Intercepts POST requests and changes credits to 10000000000000 (Because why not)
// @author       Ramona-Flower
// @match        https://nemotron.one/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const originalFetch = window.fetch;

    window.fetch = async function(input, init = {}) {
        const url = typeof input === 'string' ? input : input.url || '';

        if (url.includes('/api/chat') && init.method === 'POST' && init.body) {
            try {
                const bodyObj = JSON.parse(init.body);

                if (bodyObj.user) {
                    bodyObj.user.credits = 10000000000000;
                    init.body = JSON.stringify(bodyObj);

                    console.log('Modified credits to 10000000000000:', bodyObj);
                }
            } catch (e) {
                console.warn('Error modifying request body:', e);
            }
        }

        return originalFetch(input, init);
    };
})();
