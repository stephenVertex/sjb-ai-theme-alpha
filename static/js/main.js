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

// Expand unlinked images in post bodies into an accessible modal lightbox.
(function() {
    var postImages = document.querySelectorAll('main article .body img:not([data-no-lightbox])');

    if (!postImages.length || typeof HTMLDialogElement === 'undefined') {
        return;
    }

    var dialog = document.createElement('dialog');
    dialog.className = 'post-image-lightbox';
    dialog.setAttribute('aria-label', 'Expanded post image');
    dialog.innerHTML = [
        '<form method="dialog" class="post-image-lightbox__close-form">',
        '  <button class="post-image-lightbox__close" value="close" aria-label="Close expanded image">&times;</button>',
        '</form>',
        '<figure class="post-image-lightbox__figure">',
        '  <img class="post-image-lightbox__image" alt="">',
        '  <figcaption class="post-image-lightbox__caption"></figcaption>',
        '</figure>'
    ].join('');
    document.body.appendChild(dialog);

    var expandedImage = dialog.querySelector('.post-image-lightbox__image');
    var caption = dialog.querySelector('.post-image-lightbox__caption');
    var triggeringImage = null;

    function openImage(image) {
        if (dialog.open) {
            return;
        }

        triggeringImage = image;
        expandedImage.src = image.currentSrc || image.src;
        expandedImage.alt = image.alt || '';
        caption.textContent = image.alt || '';
        caption.hidden = !image.alt;
        document.documentElement.classList.add('image-lightbox-open');
        dialog.showModal();
    }

    postImages.forEach(function(image) {
        // Preserve the destination and expected behavior of images used as links.
        if (image.closest('a')) {
            return;
        }

        image.classList.add('post-image-zoomable');
        image.tabIndex = 0;
        image.setAttribute('role', 'button');
        image.setAttribute('aria-label', image.alt ? 'View larger image: ' + image.alt : 'View larger image');

        image.addEventListener('click', function() {
            openImage(image);
        });

        image.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openImage(image);
            }
        });
    });

    dialog.addEventListener('click', function(event) {
        if (event.target === dialog || event.target === dialog.querySelector('.post-image-lightbox__figure')) {
            dialog.close();
        }
    });

    dialog.addEventListener('close', function() {
        document.documentElement.classList.remove('image-lightbox-open');
        expandedImage.removeAttribute('src');

        if (triggeringImage) {
            triggeringImage.focus({ preventScroll: true });
            triggeringImage = null;
        }
    });
})();
