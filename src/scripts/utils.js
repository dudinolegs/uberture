export function truncateMiddle(str, maxLength = 50) {
    if (str.length <= maxLength) return str;

    const keep = Math.floor((maxLength - 3) / 2);
    const start = str.slice(0, keep);
    const end = str.slice(str.length - keep);

    return `${start}…${end}`;
}

export function checkHeaderFixed() {
    const header = document.querySelector(".js-header-fixed");
    const height = window.innerHeight;
    header.classList.remove("header_fixed-active");

    window.addEventListener("scroll", () => {
        if (window.scrollY > height) {
            header.classList.add("header_fixed-active");
        } else {
            header.classList.remove("header_fixed-active");
        }
    });
}

export function smoothScrollToAnchor() {
    const header = document.querySelector(".js-header-fixed");
    const offset = header.offsetHeight + 30;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const href = this.getAttribute('href').slice(1);
            if (!href) {
                return;
            }

            const target = document.getElementById(href);
            if (!target) {
                return;
            }

            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}