class Books {
    constructor(element) {
        this.element = element;
    }
    
    linksEffects() {
        const links = this.element.querySelectorAll('.books-wrapper__link'),
        wrapper = this.element.querySelector('.books-wrapper');
        let activeItem = null,
        prevLink = null;

        links.forEach((link) => {
        const actions = ['click', 'mouseover', 'mouseout'];
        actions.forEach((action) => {
            link.addEventListener(action, (e) => {
            e.preventDefault();
            const text = e.currentTarget.querySelector('.books-wrapper__text'),
                item = e.currentTarget.closest('.books-wrapper__item').querySelector('.books-wrapper__dropmenu');
            if (e.type === 'click') return;
            if (e.type === 'mouseover') {
                if (activeItem && activeItem !== item) {
                const prevText = activeItem.closest('.books-wrapper__item').querySelector('.books-wrapper__text');
                prevText.classList.remove('use-effect');
                activeItem.classList.remove('active');
                }
                if (item) {
                item.classList.add('active');
                text.classList.add('use-effect');
                activeItem = item;
                wrapper.addEventListener('mouseleave', () => {
                    item.classList.remove('active');
                    text.classList.remove('use-effect');
                    prevLink.classList.remove('effect__hover');
                    activeItem = null;
                });
                }

                link.classList.add('effect__hover');
                
                if (prevLink && prevLink !== link) {
                    prevLink.classList.remove('effect__hover');
                }
                
                prevLink = link;
            }
            });
        });
        });
    }


    dropMenuAutoHeight() {
       const links = this.element.querySelectorAll('.books-wrapper__dropmenu-links');
       links.forEach(link => {
        if(link.children.length > 6 && link.offsetHeight > 259) {
            link.style.height = '259px';
            link.style.overflow = 'hidden';
            const button = document.createElement('div');
            button.classList.add('books-wrapper__dropmenu-show');
            button.innerText = 'Еще';
            link.parentNode.appendChild(button);
        }
       });
    }

    dropDownShow() {
        const button = this.element.querySelectorAll('.books-wrapper__dropmenu-show');
        button.forEach(button => {
            button.addEventListener('click', e => {
                const target = e.target.parentNode.querySelector('.books-wrapper__dropmenu-links'),
                currentHeight = target.clientHeight,
                autoHeight = target.scrollHeight;
                if (currentHeight != autoHeight) {
                    target.style.height = autoHeight + 'px';
                    e.target.innerText = 'Свернуть';
                    e.target.classList.add('rotate');
                }else if(currentHeight == autoHeight) {
                    target.style.height = '259px';
                    e.target.innerText = 'Еще';
                    e.target.classList.remove('rotate');
                }
            });
        });
    }

}


const exempleBooks = new Books(document.getElementById('books__init'));

exempleBooks.linksEffects();
exempleBooks.dropMenuAutoHeight();
exempleBooks.dropDownShow();