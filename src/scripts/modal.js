class Modal {
    static openModals = new Set();

    constructor(options = {}) {
        this.options = options;
        this.modalCloseOther = options.modalCloseOther === "true" || options.modalCloseOther === true;
        this.modalElement = null;
        this.html = null;
        this.modalId = options.modalId;
        this.isDev = options.isDev || false;
        this.url = this.isDev ? `/assets/modals/${this.modalId}.html` : "/ajax/getModal.php";
        this.handleEsc = this.handleEsc.bind(this);
    }

    async load() {
        try {
            const params = new URLSearchParams(this.options).toString();
            const result = await fetch(`${this.url}?${params}`);

            if (!result.ok) {
                console.error("Ошибка HTTP:", result.status);
                return false;
            }
            
            this.html = await result.text();
            return true;
        } catch (err) {
            console.error("Ошибка загрузки модального окна:", err);
            return false;
        }
    }

    initActions() {
        const buttonClose = this.modalElement.querySelector('.js-modal-close');
        const overlay = this.modalElement.querySelector('.js-modal-overlay');

        if (buttonClose) {
            buttonClose.addEventListener('click', () => this.close());
        }

        if (overlay) {
            overlay.addEventListener('click', () => this.close());
        }

        document.addEventListener("keydown", this.handleEsc);
    }

    handleEsc(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    async prepare() {
        const success = await this.load();
        if (!success) {
            return false;
        }

        const container = document.createElement('div');
        container.innerHTML = this.html;
        this.modalElement = container.querySelector('.js-modal');
        if (!this.modalElement) {
            console.error('Элемент с классом .js-modal не найден');
            return false;
        }
        this.modalElement.id = this.modalId;
    
        document.body.appendChild(this.modalElement);

        this.initActions();

        return true;
    }

    async open() {
        const success = await this.prepare();
        if (!success) {
            return false;
        }

        if (this.modalCloseOther) {
            for (const modal of Modal.openModals) {
                if (modal !== this) modal.close();
            }
        }

        setTimeout(() => {
            this.modalElement.classList.add('modal_open');
        }, 100);

        Modal.openModals.add(this);
    }

    close() {
        if (!this.modalElement) {
            return;
        }

        this.modalElement.classList.remove('modal_open');
        this.modalElement.addEventListener('transitionend', () => {
            this.modalElement.remove();
            this.modalElement = null;
            document.removeEventListener("keydown", this.handleEsc);
            Modal.openModals.delete(this);
        }, { once: true });
    }
}

document.addEventListener('click', (e) => {
    const el = e.target.closest('.js-open-modal[data-modal-id]');
    if (!el) return;

    const modal = new Modal({
        isDev: IS_DEV,
        ...el.dataset
    });
    modal.open();
}, true);