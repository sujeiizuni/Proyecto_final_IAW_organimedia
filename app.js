// DATOS DE LA APLICACIÓN
let currentUser = null;
let currentDate = new Date();
let tasks = [];
let selectedProject = 'personal';

// ELEMENTOS DEL DOM
const elements = {
    // Páginas
    loginPage: document.getElementById('loginPage'),
    registerPage: document.getElementById('registerPage'),
    dashboard: document.getElementById('dashboard'),
    
    // Formularios de login/registro
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    emailInput: document.getElementById('email'),
    passwordInput: document.getElementById('password'),
    registerName: document.getElementById('registerName'),
    registerEmail: document.getElementById('registerEmail'),
    registerPassword: document.getElementById('registerPassword'),
    registerConfirm: document.getElementById('registerConfirm'),
    
    // Botones
    demoLogin: document.getElementById('demoLogin'),
    showRegister: document.getElementById('showRegister'),
    backToLogin: document.getElementById('backToLogin'),
    logoutBtn: document.getElementById('logoutBtn'),
    
    // Navegación
    prevMonth: document.getElementById('prevMonth'),
    nextMonth: document.getElementById('nextMonth'),
    prevYear: document.getElementById('prevYear'),
    nextYear: document.getElementById('nextYear'),
    todayBtn: document.getElementById('todayBtn'),
    
    // Vistas
    viewButtons: document.querySelectorAll('.btn-view'),
    
    // Calendario
    calendarGrid: document.getElementById('calendarGrid'),
    currentMonth: document.getElementById('currentMonth'),
    currentDateDisplay: document.getElementById('currentDateDisplay'),
    selectedDay: document.getElementById('selectedDay'),
    
    // Usuario
    userName: document.getElementById('userName'),
    userEmail: document.getElementById('userEmail'),
    avatarInitial: document.getElementById('avatarInitial'),
    userAvatar: document.getElementById('userAvatar'),
    
    // Tareas
    newTaskInput: document.getElementById('newTaskInput'),
    taskPriority: document.getElementById('taskPriority'),
    taskDate: document.getElementById('taskDate'),
    addTaskBtn: document.getElementById('addTaskBtn'),
    tasksList: document.getElementById('tasksList'),
    
    // Modal
    taskModal: document.getElementById('taskModal'),
    modalTaskTitle: document.getElementById('modalTaskTitle'),
    modalTaskDesc: document.getElementById('modalTaskDesc'),
    modalTaskPriority: document.getElementById('modalTaskPriority'),
    modalTaskDate: document.getElementById('modalTaskDate'),
    saveTask: document.getElementById('saveTask'),
    cancelTask: document.getElementById('cancelTask'),
    modalClose: document.querySelector('.modal-close'),
    
    // Estadísticas
    totalTasks: document.getElementById('totalTasks'),
    completedTasksMain: document.getElementById('completedTasksMain'),
    pendingTasksMain: document.getElementById('pendingTasksMain'),
    urgentTasks: document.getElementById('urgentTasks'),
    todayTasks: document.getElementById('todayTasks'),
    pendingTasks: document.getElementById('pendingTasks'),
    completedTasks: document.getElementById('completedTasks'),
    personalTasks: document.getElementById('personalTasks'),
    workTasks: document.getElementById('workTasks'),
    studyTasks: document.getElementById('studyTasks'),
    
    // Proyectos
    projectItems: document.querySelectorAll('.project-item'),
    
    // Notificaciones
    notification: document.getElementById('notification'),
    errorMessage: document.getElementById('errorMessage'),
    registerError: document.getElementById('registerError')
};

// FUNCIONES DE AUTENTICACIÓN
function login(email, password) {
    const errorMessage = elements.errorMessage;
    
    // Validar campos
    if (!email || !password) {
        showError('Por favor completa todos los campos');
        return false;
    }
    
    if (password.length < 6) {
        showError('La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    
    // Credenciales de demo (para pruebas rápidas)
    if (email === 'demo@organimedia.com' && password === 'demo123') {
        currentUser = {
            id: '1',
            name: 'Usuario Demo',
            email: email,
            avatar: 'UD',
            created: new Date().toISOString()
        };
        
        saveUserToStorage();
        showSuccess('¡Bienvenido de nuevo!');
        showDashboard();
        return true;
    }
    
    // Verificar si el usuario existe en localStorage
    const users = JSON.parse(localStorage.getItem('organimedia_users') || '[]');
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        // Usuario existe, verificar contraseña
        if (existingUser.password === password) {
            currentUser = {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                avatar: existingUser.name.charAt(0).toUpperCase(),
                created: existingUser.created
            };
            
            saveUserToStorage();
            showSuccess(`¡Bienvenido de nuevo, ${existingUser.name}!`);
            showDashboard();
            return true;
        } else {
            showError('Contraseña incorrecta');
            return false;
        }
    } else {
        // Nuevo usuario - registro automático
        const newUser = {
            id: Date.now().toString(),
            name: email.split('@')[0],
            email: email,
            password: password,
            created: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('organimedia_users', JSON.stringify(users));
        
        currentUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.name.charAt(0).toUpperCase(),
            created: newUser.created
        };
        
        saveUserToStorage();
        showSuccess(`¡Bienvenido a Organimedia, ${newUser.name}!`);
        showDashboard();
        return true;
    }
}

function register(name, email, password, confirmPassword) {
    const errorMessage = elements.registerError;
    
    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
        showRegisterError('Por favor completa todos los campos');
        return false;
    }
    
    if (password.length < 6) {
        showRegisterError('La contraseña debe tener al menos 6 caracteres');
        return false;
    }
    
    if (password !== confirmPassword) {
        showRegisterError('Las contraseñas no coinciden');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showRegisterError('Por favor ingresa un email válido');
        return false;
    }
    
    // Verificar si el email ya está registrado
    const users = JSON.parse(localStorage.getItem('organimedia_users') || '[]');
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
        showRegisterError('Este email ya está registrado. Por favor inicia sesión.');
        return false;
    }
    
    // Crear nuevo usuario
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        created: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('organimedia_users', JSON.stringify(users));
    
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.name.charAt(0).toUpperCase(),
        created: newUser.created
    };
    
    saveUserToStorage();
    showSuccess(`¡Cuenta creada exitosamente, ${name}!`);
    showDashboard();
    return true;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('organimedia_current_user');
    showLoginPage();
    showSuccess('Sesión cerrada correctamente');
}

function checkSavedUser() {
    const savedUser = localStorage.getItem('organimedia_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
        return true;
    }
    return false;
}

function saveUserToStorage() {
    if (currentUser) {
        localStorage.setItem('organimedia_current_user', JSON.stringify(currentUser));
    }
}

// FUNCIONES DE INTERFAZ
function showLoginPage() {
    elements.loginPage.style.display = 'flex';
    elements.registerPage.style.display = 'none';
    elements.dashboard.style.display = 'none';
    
    // Limpiar formularios
    elements.emailInput.value = '';
    elements.passwordInput.value = '';
    hideError();
    hideRegisterError();
}

function showRegisterPage() {
    elements.loginPage.style.display = 'none';
    elements.registerPage.style.display = 'flex';
    elements.dashboard.style.display = 'none';
    
    // Limpiar formularios
    elements.registerName.value = '';
    elements.registerEmail.value = '';
    elements.registerPassword.value = '';
    elements.registerConfirm.value = '';
    hideError();
    hideRegisterError();
}

function showDashboard() {
    elements.loginPage.style.display = 'none';
    elements.registerPage.style.display = 'none';
    elements.dashboard.style.display = 'block';
    
    // Actualizar información del usuario
    if (currentUser) {
        elements.userName.textContent = currentUser.name;
        elements.userEmail.textContent = currentUser.email;
        elements.avatarInitial.textContent = currentUser.avatar;
        elements.userAvatar.textContent = currentUser.avatar;
    }
    
    // Actualizar fecha actual
    updateCurrentDate();
    
    // Inicializar calendario
    initializeCalendar();
    
    // Cargar tareas del usuario
    loadUserTasks();
    
    // Actualizar estadísticas
    updateAllStats();
    
    // Actualizar proyectos
    updateProjects();
}

// FUNCIONES DE NOTIFICACIÓN
function showNotification(message, type = 'success') {
    const notification = elements.notification;
    
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showInfo(message) {
    showNotification(message, 'info');
}

function showWarning(message) {
    showNotification(message, 'warning');
}

function showError(message) {
    const error = elements.errorMessage;
    error.textContent = message;
    error.classList.add('show');
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        error.classList.remove('show');
    }, 5000);
}

function hideError() {
    elements.errorMessage.classList.remove('show');
}

function showRegisterError(message) {
    const error = elements.registerError;
    error.textContent = message;
    error.classList.add('show');
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        error.classList.remove('show');
    }, 5000);
}

function hideRegisterError() {
    elements.registerError.classList.remove('show');
}

// FUNCIONES DE VALIDACIÓN
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// FUNCIONES DE TAREAS
function loadUserTasks() {
    // Cargar tareas del localStorage
    const savedTasks = localStorage.getItem(`organimedia_tasks_${currentUser.id}`);
    
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    } else {
        // Tareas de ejemplo para nuevos usuarios
        tasks = [
            {
                id: '1',
                userId: currentUser.id,
                title: 'Reunión de equipo',
                description: 'Revisión semanal de proyectos',
                date: new Date().toISOString(),
                completed: false,
                priority: 'high',
                project: 'trabajo',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                userId: currentUser.id,
                title: 'Comprar suministros',
                description: 'Comprar materiales de oficina',
                date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                completed: true,
                priority: 'medium',
                project: 'personal',
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                userId: currentUser.id,
                title: 'Estudiar JavaScript',
                description: 'Repasar conceptos avanzados',
                date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
                completed: false,
                priority: 'normal',
                project: 'estudios',
                createdAt: new Date().toISOString()
            },
            {
                id: '4',
                userId: currentUser.id,
                title: 'Entregar reporte mensual',
                description: 'Preparar y enviar reporte financiero',
                date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
                completed: false,
                priority: 'urgent',
                project: 'trabajo',
                createdAt: new Date().toISOString()
            }
        ];
        
        saveTasks();
    }
    
    updateTasksList();
}

function saveTasks() {
    if (currentUser) {
        localStorage.setItem(`organimedia_tasks_${currentUser.id}`, JSON.stringify(tasks));
    }
}

function addTask(title, description = '', priority = 'normal', date = null, project = null) {
    if (!title.trim()) {
        showWarning('Por favor escribe el título de la tarea');
        return;
    }
    
    const newTask = {
        id: Date.now().toString(),
        userId: currentUser.id,
        title: title.trim(),
        description: description.trim(),
        date: date || new Date().toISOString(),
        completed: false,
        priority: priority,
        project: project || selectedProject,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasks();
    updateTasksList();
    updateCalendar();
    updateAllStats();
    updateProjects();
    
    showSuccess(`Tarea "${title}" agregada`);
    
    // Limpiar campos del formulario
    elements.newTaskInput.value = '';
    if (elements.modalTaskTitle) elements.modalTaskTitle.value = '';
    if (elements.modalTaskDesc) elements.modalTaskDesc.value = '';
    
    // Cerrar modal si está abierto
    closeModal();
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
        
        saveTasks();
        updateTasksList();
        updateCalendar();
        updateAllStats();
        updateProjects();
        
        const message = task.completed 
            ? `✅ Tarea "${task.title}" completada`
            : `↩️ Tarea "${task.title}" marcada como pendiente`;
        
        showSuccess(message);
    }
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        const taskTitle = tasks[taskIndex].title;
        tasks.splice(taskIndex, 1);
        
        saveTasks();
        updateTasksList();
        updateCalendar();
        updateAllStats();
        updateProjects();
        
        showSuccess(`Tarea "${taskTitle}" eliminada`);
    }
}

function updateTasksList() {
    const tasksList = elements.tasksList;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filtrar tareas para hoy
    const todayTasks = tasks.filter(task => {
        if (!task.date) return false;
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
    });
    
    // Ordenar por prioridad y completadas
    todayTasks.sort((a, b) => {
        // Primero las no completadas
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        
        // Luego por prioridad (urgente primero)
        const priorityOrder = { urgent: 0, high: 1, medium: 2, normal: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    if (todayTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <h4>No hay tareas para hoy</h4>
                <p>¡Agrega una nueva tarea para comenzar!</p>
            </div>
        `;
        return;
    }
    
    tasksList.innerHTML = '';
    
    todayTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-list-item ${task.completed ? 'completed' : ''}`;
        taskElement.dataset.taskId = task.id;
        
        const priorityColors = {
            normal: '#10B981',
            medium: '#F59E0B',
            high: '#EF4444',
            urgent: '#DC2626'
        };
        
        const priorityIcons = {
            normal: '🟢',
            medium: '🟡',
            high: '🔴',
            urgent: '🔥'
        };
        
        taskElement.innerHTML = `
            <div class="task-item-content">
                <div class="task-checkbox-container">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
                </div>
                <div class="task-details">
                    <div class="task-title ${task.completed ? 'completed' : ''}">
                        ${task.title}
                    </div>
                    ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                    <div class="task-meta">
                        <span class="task-priority" style="color: ${priorityColors[task.priority]}">
                            ${priorityIcons[task.priority]} ${task.priority}
                        </span>
                        ${task.project ? `<span class="task-project">${getProjectIcon(task.project)} ${task.project}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn-task-action btn-delete" title="Eliminar">
                        🗑️
                    </button>
                </div>
            </div>
        `;
        
        // Evento para marcar como completada
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.addEventListener('click', () => toggleTaskCompletion(task.id));
        
        // Evento para eliminar
        const deleteBtn = taskElement.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                deleteTask(task.id);
            }
        });
        
        tasksList.appendChild(taskElement);
    });
}

// FUNCIONES DEL CALENDARIO
function initializeCalendar() {
    updateCalendar();
    setupCalendarEvents();
}

function updateCalendar() {
    const calendarGrid = elements.calendarGrid;
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Actualizar título del mes
    elements.currentMonth.textContent = `${monthNames[month]} ${year}`;
    
    // Obtener información del mes
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    // Limpiar calendario
    calendarGrid.innerHTML = '';
    
    // Crear grid del calendario
    for (let i = 0; i < 42; i++) { // 6 semanas * 7 días
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (i < startingDay) {
            // Días vacíos al inicio
            dayElement.classList.add('empty');
        } else {
            const dayNumber = i - startingDay + 1;
            
            if (dayNumber <= daysInMonth) {
                const dayDate = new Date(year, month, dayNumber);
                const isToday = isSameDay(dayDate, new Date());
                const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;
                
                dayElement.dataset.date = dayDate.toISOString();
                dayElement.dataset.day = dayNumber;
                
                if (isToday) {
                    dayElement.classList.add('today');
                }
                
                if (isWeekend) {
                    dayElement.classList.add('weekend');
                }
                
                // Número del día
                const dayNumberElement = document.createElement('div');
                dayNumberElement.className = 'day-number';
                dayNumberElement.textContent = dayNumber;
                dayElement.appendChild(dayNumberElement);
                
                // Tareas para este día
                const dayTasks = getTasksForDate(dayDate);
                if (dayTasks.length > 0) {
                    const tasksContainer = document.createElement('div');
                    tasksContainer.className = 'day-tasks';
                    
                    dayTasks.slice(0, 3).forEach(task => {
                        const taskDot = document.createElement('div');
                        taskDot.className = `task-dot ${task.priority} ${task.completed ? 'completed' : ''}`;
                        taskDot.title = task.title;
                        tasksContainer.appendChild(taskDot);
                    });
                    
                    if (dayTasks.length > 3) {
                        const moreTasks = document.createElement('div');
                        moreTasks.className = 'more-tasks';
                        moreTasks.textContent = `+${dayTasks.length - 3}`;
                        tasksContainer.appendChild(moreTasks);
                    }
                    
                    dayElement.appendChild(tasksContainer);
                }
                
                // Evento click
                dayElement.addEventListener('click', () => selectDate(dayDate));
            } else {
                dayElement.classList.add('empty');
            }
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function setupCalendarEvents() {
    // Navegación del calendario
    elements.prevMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });
    
    elements.nextMonth.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });
    
    elements.prevYear.addEventListener('click', () => {
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        updateCalendar();
    });
    
    elements.nextYear.addEventListener('click', () => {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        updateCalendar();
    });
    
    elements.todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        updateCalendar();
        showInfo('Volviendo al día de hoy');
    });
    
    // Cambiar vista
    elements.viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            elements.viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const view = button.dataset.view;
            // Aquí puedes agregar lógica para cambiar la vista
            showInfo(`Vista cambiada a ${view === 'month' ? 'mes' : view === 'week' ? 'semana' : 'día'}`);
        });
    });
}

// FUNCIONES UTILITARIAS
function getTasksForDate(date) {
    return tasks.filter(task => {
        if (!task.date) return false;
        return isSameDay(new Date(task.date), date);
    });
}

function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
}

function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    elements.currentDateDisplay.textContent = now.toLocaleDateString('es-ES', options);
    elements.selectedDay.textContent = 'hoy';
}

function updateAllStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const urgent = tasks.filter(t => t.priority === 'urgent' && !t.completed).length;
    
    // Hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = tasks.filter(t => {
        if (!t.date) return false;
        const taskDate = new Date(t.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
    }).length;
    
    // Actualizar estadísticas principales
    if (elements.totalTasks) elements.totalTasks.textContent = total;
    if (elements.completedTasksMain) elements.completedTasksMain.textContent = completed;
    if (elements.pendingTasksMain) elements.pendingTasksMain.textContent = pending;
    if (elements.urgentTasks) elements.urgentTasks.textContent = urgent;
    
    // Actualizar estadísticas rápidas
    if (elements.todayTasks) elements.todayTasks.textContent = todayCount;
    if (elements.pendingTasks) elements.pendingTasks.textContent = pending;
    if (elements.completedTasks) elements.completedTasks.textContent = completed;
}

function updateProjects() {
    // Contar tareas por proyecto
    const personalCount = tasks.filter(t => t.project === 'personal').length;
    const workCount = tasks.filter(t => t.project === 'trabajo').length;
    const studyCount = tasks.filter(t => t.project === 'estudios').length;
    
    if (elements.personalTasks) elements.personalTasks.textContent = personalCount;
    if (elements.workTasks) elements.workTasks.textContent = workCount;
    if (elements.studyTasks) elements.studyTasks.textContent = studyCount;
}

function getProjectIcon(project) {
    const icons = {
        personal: '👤',
        trabajo: '💼',
        estudios: '📚'
    };
    return icons[project] || '📁';
}

function selectDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('es-ES', options);
    elements.selectedDay.textContent = formattedDate;
    
    // Aquí puedes agregar lógica para mostrar tareas de esa fecha
    showInfo(`Mostrando tareas para el ${formattedDate}`);
}

function openModal() {
    elements.taskModal.style.display = 'flex';
    elements.modalTaskDate.value = new Date().toISOString().split('T')[0];
}

function closeModal() {
    elements.taskModal.style.display = 'none';
    elements.modalTaskTitle.value = '';
    elements.modalTaskDesc.value = '';
    elements.modalTaskPriority.value = 'normal';
    elements.modalTaskDate.value = new Date().toISOString().split('T')[0];
}

// INICIALIZACIÓN DE EVENTOS
function setupEventListeners() {
    // Login
    elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = elements.emailInput.value.trim();
        const password = elements.passwordInput.value;
        login(email, password);
    });
    
    // Registro
    elements.registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = elements.registerName.value.trim();
        const email = elements.registerEmail.value.trim();
        const password = elements.registerPassword.value;
        const confirmPassword = elements.registerConfirm.value;
        register(name, email, password, confirmPassword);
    });
    
    // Demo login
    elements.demoLogin.addEventListener('click', () => {
        elements.emailInput.value = 'demo@organimedia.com';
        elements.passwordInput.value = 'demo123';
        elements.loginForm.dispatchEvent(new Event('submit'));
    });
    
    // Mostrar registro
    elements.showRegister.addEventListener('click', showRegisterPage);
    
    // Volver al login
    elements.backToLogin.addEventListener('click', showLoginPage);
    
    // Logout
    elements.logoutBtn.addEventListener('click', logout);
    
    // Agregar tarea desde input rápido
    elements.addTaskBtn.addEventListener('click', openModal);
    
    elements.newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            addTask(e.target.value.trim(), '', elements.taskPriority.value, elements.taskDate.value);
        }
    });
    
    // Modal de tarea
    elements.saveTask.addEventListener('click', () => {
        const title = elements.modalTaskTitle.value.trim();
        const description = elements.modalTaskDesc.value.trim();
        const priority = elements.modalTaskPriority.value;
        const date = elements.modalTaskDate.value;
        
        if (title) {
            addTask(title, description, priority, date);
        } else {
            showWarning('Por favor escribe el título de la tarea');
        }
    });
    
    elements.cancelTask.addEventListener('click', closeModal);
    elements.modalClose.addEventListener('click', closeModal);
    
    // Cerrar modal haciendo click fuera
    window.addEventListener('click', (e) => {
        if (e.target === elements.taskModal) {
            closeModal();
        }
    });
    
    // Seleccionar proyecto
    elements.projectItems.forEach(item => {
        item.addEventListener('click', () => {
            elements.projectItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            selectedProject = item.dataset.project;
            showInfo(`Proyecto cambiado a: ${item.querySelector('.project-name').textContent}`);
        });
    });
}

// INICIALIZAR APLICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    
    // Verificar si hay usuario guardado
    if (!checkSavedUser()) {
        showLoginPage();
    }
    
    // Mostrar fecha actual en el input
    const today = new Date().toISOString().split('T')[0];
    if (elements.taskDate) {
        elements.taskDate.value = today;
        elements.taskDate.min = today;
    }
});