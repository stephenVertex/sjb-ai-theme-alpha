//https://codepen.io/codeorum/pen/bGedRJO

var themeSwitcher = document.querySelector('.theme-switcher input');
var currentTheme = localStorage.getItem('theme');

// check what is current theme right now and activate it
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeSwitcher.checked = true;
    }
}

// switch between themes
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

// event listener on checkbox change
themeSwitcher.addEventListener('change', switchTheme, false);

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