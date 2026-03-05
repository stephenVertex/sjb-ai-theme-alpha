//https://codepen.io/codeorum/pen/bGedRJO

var themeSwitcher = document.querySelector('.theme-switcher input');
var cvThemeToggle = document.getElementById('cv-theme-toggle');
var currentTheme = localStorage.getItem('theme');

// check what is current theme right now and activate it
// Light is default (no attribute), dark needs data-theme="dark"
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeSwitcher) {
        themeSwitcher.checked = true;
    }
}

// switch between themes (checkbox on other pages)
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {        
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    }    
}

// event listener on checkbox change (other pages)
if (themeSwitcher) {
    themeSwitcher.addEventListener('change', switchTheme, false);
}

// CV page theme toggle button
if (cvThemeToggle) {
    cvThemeToggle.addEventListener('click', function() {
        var current = document.documentElement.getAttribute('data-theme');
        if (current === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Load local-only phone number if available
(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/phone.txt', true);
    xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseText.trim()) {
            var el = document.getElementById('cv-phone');
            var container = document.getElementById('cv-phone-container');
            if (el && container) {
                el.textContent = xhr.responseText.trim();
                container.style.display = 'inline';
            }
        }
    };
    xhr.send();
})();
