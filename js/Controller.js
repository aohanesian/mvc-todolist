class Controller {
    #model = null;
    #view = null;

    form = null;
    formSelector = null;
    todoContainerSelector = null;
    todoContainer = null;

    constructor(model, view, { formSelector, todoContainerSelector }) {
        this.#setModel(model);
        this.#setView(view);

        this.formSelector = formSelector;
        this.todoContainerSelector = todoContainerSelector;

        this.getForm();
        this.getTodoContainer();

        this.form.addEventListener('submit', this.#handleForm);
        this.todoContainer.addEventListener('click', this.#handleDeleteButtonClick);

        this.#model.loadData().forEach(item => this.#view.renderItem(item));
    }

    #handleForm = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isValidationForm(2)) return alert(`Title and Description must have at least 2 characters each`);
        const data = {};

        this.form.querySelectorAll('input, textarea')
            .forEach(item => {
                data[item.name] = item.value;
            })

        data.id = Date.now().toString();

        this.#model.saveData(data);
        this.#view.renderItem(data);
        this.#view.resetForm();
    }

    getTodoContainer() {
        this.todoContainer = document.querySelector(this.todoContainerSelector);
        this.#view.setTodosContainer(this.todoContainer);
    }

    getForm() {
        const form = document.querySelector(this.formSelector);
        if (!(form instanceof HTMLFormElement)) throw new Error('Form should be an HTML form element');
        this.form = form;
        this.#view.setForm(form);
    }

    #setModel(modelInstance) {
        if (!modelInstance) throw new Error('Model is required');
        this.#model = modelInstance;
    }
    #setView(viewInstance) {
        if (!viewInstance) throw new Error('View is required');
        this.#view = viewInstance;
    }

    #handleDeleteButtonClick = (event) => {
        if (!event.target.dataset.isDeleteBtn) return;
        const deleteButtonId = event.target.id;
        if (deleteButtonId) {
            this.handleDeleteItem(deleteButtonId);
        }
    }

    handleDeleteItem(todoDeleteBtn) {
        const dbData = this.#model.loadData();
        const founded = dbData.find(item => item.id === todoDeleteBtn);
        this.#model.saveData(founded);
        this.#view.removeTodoItem(todoDeleteBtn);
    }

    isValidationForm(minLength) {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (input.value.trim().length < minLength) {
                this.#view.addClass(input, 'is-invalid');
                isValid = false;
            } else {
                this.#view.removeClass(input, 'is-invalid');
            }
        });

        return isValid;
    }
}