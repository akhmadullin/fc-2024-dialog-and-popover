class PressedKeyShower {
    constructor(options) {
        this.options = options;
        this.element = null;
        this.timeoutId = null;
        this.createElement();
        this.injectElementToPage();
        this.watch();
    }

    createElement() {
        const element = document.createElement('div');
        element.setAttribute('class', 'pressed-key');

        const text = document.createElement('div');
        text.setAttribute('class', 'pressed-key__text');
        element.appendChild(text);

        const animatedPoints = document.createElement('div');
        animatedPoints.setAttribute('class', 'pressed-key__animated-points-container');
        element.appendChild(animatedPoints);

        this.element = element;
    }

    injectElementToPage() {
        document.body.appendChild(this.element);
    }

    watch() {
        document.addEventListener('keyup', (event) => {
            this.options.keysToShow.forEach(({ code, caption }) => {
                if (!this.element) {
                    return;
                }

                if (event.code !== code) {
                    return;
                }

                this.element.childNodes[0].textContent = caption;

                this.element.classList.add('visible');

                this.element.childNodes[1].appendChild(this.createAnimatedPoint());

                clearTimeout(this.timeoutId);

                this.timeoutId = setTimeout(() => {
                    this.element.classList.remove('visible');
                }, 2000);
            });
       });
    }

    createAnimatedPoint() {
        const animatedPoint = document.createElement('div');
        animatedPoint.setAttribute('class', 'pressed-key__animated_point');
        setTimeout(() => {
            animatedPoint.remove();
        }, 1800);
        return animatedPoint;
    }
}