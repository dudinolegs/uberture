class Modal {
    constructor(options = {}) {
        this.modalElement = null;
        this.html = null;
        this.modalId = options.modalId;
        this.isDev = options.isDev || false;
        this.url = this.isDev ? `/assets/modals/${this.modalId}.html` : "/ajax/getModal.php";
    }

    async load() {
        try {
            const result = await fetch(this.url);
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
        return true;
    }

    async open() {
        const success = await this.prepare();
        if (!success) {
            return false;
        }
        
        setTimeout(() => {
            this.modalElement.classList.add('modal_open');
        }, 100);
    }

    close() {
        if (this.modalElement) {
            this.modalElement.classList.remove('modal_open');
            setTimeout(() => {
                this.modalElement.remove();
            }, 500);
        }
    }
}

const registerModal = new Modal({
    isDev: IS_DEV,
    modalId: 'register',
});

setTimeout(() => {
    registerModal.open();
}, 2500);