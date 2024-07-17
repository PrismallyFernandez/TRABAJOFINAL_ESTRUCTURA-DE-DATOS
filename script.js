// Definición de la clase Task para representar una tarea
class Task {
    /**
     * Constructor de la clase Task.
     * @param {string} title - Título de la tarea.
     * @param {string} description - Descripción de la tarea.
     * @param {number} priority - Prioridad de la tarea (1 para alta, 0 para normal).
     * @param {string} dueDate - Fecha de vencimiento de la tarea en formato YYYY-MM-DD.
     * @param {string} category - Categoría de la tarea.
     */
    constructor(title, description, priority, dueDate, category) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = new Date(dueDate);
        this.category = category;
    }
}

// Clase Stack para gestionar el historial de acciones
class Stack {
    constructor() {
        this.stack = [];
    }

    /**
     * Método para añadir un elemento a la pila.
     * @param {any} item - Elemento a añadir a la pila.
     */
    push(item) {
        this.stack.push(item);
    }

    /**
     * Método para eliminar y devolver el último elemento de la pila.
     * @returns {any} Último elemento de la pila.
     */
    pop() {
        return this.stack.pop();
    }

    /**
     * Método para verificar si la pila está vacía.
     * @returns {boolean} True si la pila está vacía, false de lo contrario.
     */
    isEmpty() {
        return this.stack.length === 0;
    }
}

// Clase Queue para gestionar la cola de tareas urgentes
class Queue {
    constructor() {
        this.queue = [];
    }

    /**
     * Método para añadir un elemento a la cola.
     * @param {any} item - Elemento a añadir a la cola.
     */
    enqueue(item) {
        this.queue.push(item);
    }

    /**
     * Método para eliminar y devolver el primer elemento de la cola.
     * @returns {any} Primer elemento de la cola.
     */
    dequeue() {
        return this.queue.shift();
    }

    /**
     * Método para verificar si la cola está vacía.
     * @returns {boolean} True si la cola está vacía, false de lo contrario.
     */
    isEmpty() {
        return this.queue.length === 0;
    }
}

// Clase TreeNode para representar un nodo en la estructura de árbol de tareas
class TreeNode {
    /**
     * Constructor de la clase TreeNode.
     * @param {string} name - Nombre del nodo.
     */
    constructor(name) {
        this.name = name;
        this.children = [];
        this.tasks = [];
    }

    /**
     * Método para añadir un nodo hijo al nodo actual.
     * @param {TreeNode} child - Nodo hijo a añadir.
     */
    addChild(child) {
        this.children.push(child);
    }

    /**
     * Método para añadir una tarea al nodo actual.
     * @param {Task} task - Tarea a añadir.
     */
    addTask(task) {
        this.tasks.push(task);
    }

    /**
     * Método para obtener los nodos hijos del nodo actual.
     * @returns {TreeNode[]} Array de nodos hijos.
     */
    getChildren() {
        return this.children;
    }

    /**
     * Método para obtener las tareas del nodo actual.
     * @returns {Task[]} Array de tareas.
     */
    getTasks() {
        return this.tasks;
    }
}

// Clase TaskTree para manejar la estructura de árbol de tareas
class TaskTree {
    constructor() {
        this.root = new TreeNode("Tareas");
    }

    /**
     * Método para agregar una categoría al árbol.
     * @param {string} categoryName - Nombre de la categoría a añadir.
     * @returns {TreeNode} Nodo de la categoría añadida.
     */
    addCategory(categoryName) {
        const category = new TreeNode(categoryName);
        this.root.addChild(category);
        return category;
    }

    /**
     * Método para agregar una subcategoría bajo una categoría existente.
     * @param {TreeNode} parentCategory - Categoría padre donde se añadirá la subcategoría.
     * @param {string} subCategoryName - Nombre de la subcategoría a añadir.
     * @returns {TreeNode} Nodo de la subcategoría añadida.
     */
    addSubCategory(parentCategory, subCategoryName) {
        const subCategory = new TreeNode(subCategoryName);
        parentCategory.addChild(subCategory);
        return subCategory;
    }

    /**
     * Método para agregar una tarea a una categoría o subcategoría específica.
     * @param {string} categoryName - Nombre de la categoría o subcategoría donde se añadirá la tarea.
     * @param {Task} task - Tarea a añadir.
     */
    addTaskToCategory(categoryName, task) {
        const categoryNode = this.findCategoryNode(categoryName);
        if (categoryNode) {
            categoryNode.addTask(task);
        }
    }

    /**
     * Método privado para encontrar el nodo de una categoría o subcategoría.
     * @param {string} categoryName - Nombre de la categoría o subcategoría a buscar.
     * @param {TreeNode} node - Nodo actual a partir del cual buscar (por defecto es la raíz).
     * @returns {TreeNode|null} Nodo de la categoría o subcategoría encontrada, o null si no se encuentra.
     */
    findCategoryNode(categoryName, node = this.root) {
        if (node.name === categoryName) {
            return node;
        } else {
            for (let child of node.children) {
                const foundNode = this.findCategoryNode(categoryName, child);
                if (foundNode) {
                    return foundNode;
                }
            }
            return null;
        }
    }

    /**
     * Método para mostrar el árbol de tareas.
     * @param {TreeNode} node - Nodo actual a partir del cual mostrar el árbol (por defecto es la raíz).
     * @param {number} level - Nivel de profundidad del nodo actual en el árbol (por defecto es 0).
     * @returns {string} Representación en cadena del árbol de tareas.
     */
    displayTree(node = this.root, level = 0) {
        let result = " ".repeat(level * 4) + node.name + "\n";
        node.getTasks().forEach(task => {
            result += " ".repeat((level + 1) * 4) + "- " + task.title + "\n";
        });
        node.getChildren().forEach(child => {
            result += this.displayTree(child, level + 1);
        });
        return result;
    }
}

// Clase TaskList para gestionar la lista de tareas
class TaskList {
    constructor() {
        this.tasks = [];
    }

    /**
     * Método para añadir una tarea a la lista.
     * @param {Task} task - Tarea a añadir.
     */
    addTask(task) {
        this.tasks.push(task);
        this.sortTasks();
    }

    /**
     * Método para eliminar una tarea de la lista.
     * @param {string} title - Título de la tarea a eliminar.
     */
    removeTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
    }

    /**
     * Método para modificar una tarea en la lista.
     * @param {string} title - Título de la tarea a modificar.
     * @param {Task} newTask - Nueva versión de la tarea.
     */
    modifyTask(title, newTask) {
        const index = this.tasks.findIndex(task => task.title === title);
        if (index !== -1) {
            this.tasks[index] = newTask;
            this.sortTasks();
        }
    }

    /**
     * Método para obtener todas las tareas de la lista.
     * @returns {Task[]} Array de tareas.
     */
    getTasks() {
        return this.tasks;
    }

    /**
     * Método para ordenar las tareas por prioridad y fecha de vencimiento.
     */
    sortTasks() {
        this.tasks.sort((a, b) => b.priority - a.priority || a.dueDate - b.dueDate);
    }
}

// Clase ActionHistory para gestionar el historial de acciones de la aplicación
class ActionHistory {
    constructor() {
        this.undoStack = new Stack();
        this.redoStack = new Stack();
    }

    /**
     * Método para añadir una acción al historial de acciones.
     * @param {object} action - Acción a añadir.
     */
    addAction(action) {
        this.undoStack.push(action);
        this.redoStack = new Stack(); // Limpiar la pila de rehacer
    }

    /**
     * Método para deshacer la última acción.
     * @returns {object|null} Última acción deshecha, o null si no hay acciones para deshacer.
     */
    undo() {
        if (!this.undoStack.isEmpty()) {
            const action = this.undoStack.pop();
            this.redoStack.push(action);
            return action;
        }
        return null;
    }

    /**
     * Método para rehacer la última acción deshecha.
     * @returns {object|null} Última acción rehecha, o null si no hay acciones para rehacer.
     */
    redo() {
        if (!this.redoStack.isEmpty()) {
            const action = this.redoStack.pop();
            this.undoStack.push(action);
            return action;
        }
        return null;
    }
}

// Elementos del DOM
const taskForm = document.getElementById('taskForm');
const taskListElement = document.getElementById('taskList');
const urgentTasksElement = document.getElementById('urgentTasks');
const taskTreeElement = document.getElementById('taskTree');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');

// Instancias de clases y datos iniciales
const taskList = new TaskList();
const history = new ActionHistory();
const urgentTasks = new Queue();
const taskTree = new TaskTree();

// Agregar tarea desde el formulario
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;
    const dueDate = document.getElementById('dueDate').value;
    const task = new Task(title, description, Number(priority), dueDate, category);
    taskList.addTask(task);
    history.addAction({ type: 'ADD', task });
    taskTree.addTaskToCategory(category, task);
    if (priority == 1) {
        urgentTasks.enqueue(task);
    }
    displayTasks();
    displayUrgentTasks();
    displayTaskTree();
    taskForm.reset();
});

// Deshacer acción
undoBtn.addEventListener('click', () => {
    const action = history.undo();
    if (action) {
        if (action.type === 'ADD') {
            const removedTask = taskList.getTasks().find(task => task.title === action.task.title);
            taskList.removeTask(action.task.title);
            if (removedTask.priority == 1) {
                urgentTasks.dequeue();
            }
            removeTaskFromTree(action.task, taskTree.root);
        }
        displayTasks();
        displayUrgentTasks();
        displayTaskTree();
    }
});

// Rehacer acción
redoBtn.addEventListener('click', () => {
    const action = history.redo();
    if (action) {
        if (action.type === 'ADD') {
            taskList.addTask(action.task);
            if (action.task.priority == 1) {
                urgentTasks.enqueue(action.task);
            }
            taskTree.addTaskToCategory(action.task.category, action.task);
        }
        displayTasks();
        displayUrgentTasks();
        displayTaskTree();
    }
});

// Función para mostrar las tareas en la lista principal
function displayTasks() {
    taskListElement.innerHTML = '';
    taskList.getTasks().forEach(task => {
        const li = document.createElement('li');
        const priorityText = task.priority === 1 ? 'Alta' : 'Normal';
        li.textContent = `${task.title} - ${task.description} (Prioridad: ${priorityText}, Fecha de vencimiento: ${task.dueDate.toDateString()})`;
        taskListElement.appendChild(li);
    });
}

// Función para mostrar las tareas urgentes en la cola
function displayUrgentTasks() {
    urgentTasksElement.innerHTML = '';
    let count = 1;
    const tempQueue = new Queue();
    while (!urgentTasks.isEmpty()) {
        const task = urgentTasks.dequeue();
        const li = document.createElement('li');
        li.textContent = `${count}. ${task.title} - ${task.description}`;
        urgentTasksElement.appendChild(li);
        tempQueue.enqueue(task);
        count++;
    }
    // Restaurar la cola original
    while (!tempQueue.isEmpty()) {
        urgentTasks.enqueue(tempQueue.dequeue());
    }
}

// Función para mostrar el árbol de tareas
function displayTaskTree() {
    taskTreeElement.textContent = taskTree.displayTree();
}

// Función para remover una tarea del árbol
function removeTaskFromTree(task, categoryNode) {
    const children = categoryNode.getChildren();
    for (let i = 0; i < children.length; i++) {
        if (children[i].name === task.category) {
            children[i].tasks = children[i].tasks.filter(t => t.title !== task.title);
            return;
        }
    }
}

// Ejemplo de tareas para demostración inicial
taskTree.addCategory("Trabajo");
taskTree.addCategory("Personal");
taskTree.addCategory("Estudios");

// Mostrar tareas iniciales
displayTasks();
displayUrgentTasks();
displayTaskTree();
