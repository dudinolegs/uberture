import { PageFlip } from "page-flip";
import panzoom from "panzoom";

export default class PdfViewer {
    constructor(root) {
        this.root = root;
        this.pdf = root.querySelector(".js-pdf");
        this.pdfPages = this.pdf.querySelectorAll(".js-pdf-page");
        this.pdfZoom = root.querySelector(".js-pdf-zoom-wrapper");
        this.pdfZoomIn = root.querySelector(".js-pdf-zoom-in");
        this.pdfZoomOut = root.querySelector(".js-pdf-zoom-out");
        this.navPrev = root.querySelector(".js-pdf-nav-prev");
        this.navNext = root.querySelector(".js-pdf-nav-next");
        this.fullscreen = root.querySelector(".js-pdf-fullscreen");

        this.menu = root.querySelector(".js-pdf-menu");
        this.menuToggle = root.querySelector(".js-pdf-menu-toggle");
        this.menuClose = root.querySelector(".js-pdf-menu-close");
        this.menuItems = root.querySelectorAll(".js-pdf-menu-item");

        this.container = this.pdf.closest(".container");
        this.pageWidth = this.container.clientWidth;

        this.scale = 1;
        this._init();
    }

    _init() {
        this._initPageFlip();
        this._initMenu();
        this._initFullscreen();
        this._initPanzoom();
        this._initZoomButtons();
    }

    _initPageFlip() {
        this.pageFlip = new PageFlip(this.pdf, {
            width: this.pageWidth,
            height: this.pageWidth,
            maxShadowOpacity: 0.2,
            showCover: false,
            useMouseEvents: false,
            size: "stretch",
            mode: "single",
        });
        this.pageFlip.loadFromHTML(this.pdfPages);

        this.navPrev?.addEventListener("click", () =>
            this.pageFlip.flipPrev()
        );
        this.navNext?.addEventListener("click", () =>
            this.pageFlip.flipNext()
        );

        this.menuItems.forEach((menuItem) => {
            menuItem.addEventListener("click", () => {
                const page = +menuItem.dataset.page;
                this.pageFlip.flip(page - 1);
            });
        });
    }

    _initMenu() {
        this.menuToggle?.addEventListener("click", () =>
            this.menu.classList.toggle("pdf-menu_active")
        );
        this.menuClose?.addEventListener("click", () =>
            this.menu.classList.remove("pdf-menu_active")
        );
    }

    _initFullscreen() {
        this.fullscreen?.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            if (this.root.requestFullscreen) {
                this.root.requestFullscreen();
            } else if (this.root.webkitRequestFullscreen) {
                this.root.webkitRequestFullscreen();
            }
            this.root.classList.add("pdf-section_fullscreen");
        } else {
            document.exitFullscreen?.();
            this.root.classList.remove("pdf-section_fullscreen");
        }
        });
    }

    _initPanzoom() {
        this.panzoomInstance = panzoom(this.pdfZoom, {
            maxZoom: 3,
            minZoom: 1,
            bounds: true,
            boundsPadding: 1,
            beforeWheel: (e) => !e.altKey,
            onDoubleClick: () => false,
        });
    }

    _initZoomButtons() {
        this.pdfZoomIn?.addEventListener("click", () => {
            this.scale = Math.min(this.scale + 0.5, 3);
            this.panzoomInstance.zoomAbs(0, 0, this.scale);
        });

        this.pdfZoomOut?.addEventListener("click", () => {
            this.scale = Math.max(this.scale - 0.5, 1);
            this.panzoomInstance.zoomAbs(0, 0, this.scale);
        });
    }
}