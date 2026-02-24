//https://codepen.io/codeorum/pen/bGedRJO

var themeSwitcher = document.querySelector('.theme-switcher input');
var cvThemeToggle = document.getElementById('cv-theme-toggle');
var currentTheme = localStorage.getItem('theme');

// check what is current theme right now and activate it
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light' && themeSwitcher) {
        themeSwitcher.checked = true;
    }
}

// switch between themes (checkbox on other pages)
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {        
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
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
        if (current === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
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
