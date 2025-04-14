// ==UserScript==
// @name         Infinite credits
// @namespace    http://tampermonkey.net/
// @version      1.1
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

        const shouldModify = (
            url.includes('/api/chat') ||
            url.includes('/api/predictions')
        ) && init.method === 'POST' && init.body;

        if (shouldModify) {
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
