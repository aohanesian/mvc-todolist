class View {
    #todoContainer = null;
    #form = null;

    renderItem({ title, description, id }) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('col-4');
        wrapper.setAttribute('isToDoWrapper', true);
        wrapper.id = id;
        wrapper.innerHTML = `
            <div class="taskWrapper">
                <div class="taskHeading">${title}</div>
                <div class="taskDescription">${description}</div>
                <button class="btn btn-danger" data-is-delete-btn="true" id="${id}">Delete</button>
            </div>
        `;

        const deleteButton = wrapper.querySelector('button');
        deleteButton.addEventListener('click', this.#handleDeleteButtonClick);

        this.#todoContainer.prepend(wrapper);
    }

    setTodosContainer(htmlElement) {
        if (this.#todoContainer) throw new Error('You cannot redeclare todo container');
        this.#todoContainer = htmlElement;
    }

    setForm(htmlElement) {
        if (this.#form) throw new Error('You cannot redeclare form');
        this.#form = htmlElement;
    }

    #handleDeleteButtonClick = (event) => {
        const deleteButton = event.target.closest('[isToDoWrapper=true]');
        if (deleteButton) {
            this.removeTodoItem(deleteButton);
        }
    }

    removeTodoItem(deleteButton) {
        const todoItem = this.#todoContainer.querySelector(`[isToDoWrapper=true][id="${deleteButton}"]`);
        if (todoItem) {
            todoItem.remove();
        }
    }

    addClass(node, className) {
        node.classList.add(className);
    }

    removeClass(node, className) {
        node.classList.remove(className);
    }

    resetForm() {
        this.#form.reset();
    }
}
