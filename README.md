<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Organimedia - Calendario de Tareas</title>
    <style>
        /* ESTILOS BÁSICOS */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .app-container {
            width: 100%;
            max-width: 1200px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            overflow: hidden;
        }

        /* LOGIN PAGE */
        .login-page {
            padding: 40px;
        }

        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 10px;
        }

        .logo h1 {
            color: #667eea;
            font-size: 32px;
        }

        .logo-icon {
            font-size: 36px;
        }

        /* FORMULARIOS */
        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: bold;
        }

        .form-input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
        }

        .form-input:focus {
            outline: none;
            border-color: #667eea;
        }

        /* BOTONES */
        .btn {
            display: block;
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5a67d8;
        }

        .btn-secondary {
            background: #e2e8f0;
            color: #4a5568;
        }

        /* ERRORES */
        .error-message {
            background: #fed7d7;
            color: #c53030;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        /* DASHBOARD */
        .dashboard {
            display: none;
            min-height: 100vh;
        }

        /* NAVBAR */
        .navbar {
            background: white;
            padding: 15px 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            background: #667eea;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        /* CALENDARIO */
        .calendar-container {
            padding: 30px;
        }

        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }

        .calendar-title {
            font-size: 24px;
            color: #333;
        }

        .calendar-nav {
            display: flex;
            gap: 10px;
        }

        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1px;
            background: #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }

        .calendar-day-header {
            background: #f7fafc;
            padding: 12px;
            text-align: center;
            font-weight: bold;
            color: #4a5568;
        }

        .calendar-day {
            background: white;
            min-height: 120px;
            padding: 10px;
            position: relative;
            cursor: pointer;
            border: 1px solid #e2e8f0;
        }

        .calendar-day:hover {
            background: #f8fafc;
        }

        .calendar-day.today {
            background: #ebf8ff;
            border: 2px solid #4299e1;
        }

        .calendar-day.selected {
            background: #e6fffa;
            border: 2px solid #38b2ac;
        }

        .day-number {
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }

        /* TAREAS EN CALENDARIO */
        .day-task {
            background: #48bb78;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .day-task.completed {
            background: #38b2ac;
            opacity: 0.7;
        }

        .task-checkbox {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid white;
            background: transparent;
            cursor: pointer;
        }

        .task-checkbox.checked {
            background: white;
        }

        /* PANEL DE TAREAS */
        .tasks-panel {
            margin-top: 30px;
            padding: 20px;
            background: #f7fafc;
            border-radius: 10px;
        }

        .task-form {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .task-input {
            flex: 1;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 6px;
        }

        /* LISTA DE TAREAS */
        .task-list-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            border: 1px solid #e2e8f0;
        }

        .task-list-item.completed {
            opacity: 0.7;
            background: #f8fafc;
        }
    </style>
</head>
<body>
    <div id="app" class="app-container">
        <!-- PÁGINA DE LOGIN -->
        <div id="loginPage" class="login-page">
            <div class="login-header">
                <div class="logo">
                    <span class="logo-icon">📅</span>
                    <h1>Organimedia</h1>
                </div>
                <p>Tu calendario inteligente de tareas</p>
            </div>

            <div id="errorMessage" class="error-message"></div>

            <form id="loginForm">
                <div class="form-group">
                    <label class="form-label">Correo electrónico</label>
                    <input type="email" id="email" class="form-input" placeholder="correo@ejemplo.com" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Contraseña</label>
                    <input type="password" id="password" class="form-input" placeholder="••••••••" required>
                </div>

                <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                <button type="button" id="demoLogin" class="btn btn-secondary">Acceder como Demo</button>
            </form>

            <div style="margin-top: 25px; padding: 15px; background: #f7fafc; border-radius: 8px; text-align: center;">
                <p>Usa estas credenciales para probar:</p>
                <div style="background: #e2e8f0; padding: 10px; border-radius: 6px; margin-top: 10px;">
                    <strong>Email:</strong> demo@organimedia.com<br>
                    <strong>Contraseña:</strong> demo123
                    <!-- MODAL PARA CONFIGURAR TELÉFONO (agrégala antes de cerrar body) -->
<div id="phoneModal" class="modal" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3>📱 Configurar Notificaciones por SMS</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label class="form-label">Número de Teléfono</label>
                <input type="tel" id="phoneNumber" class="form-input" 
                       placeholder="+521234567890" maxlength="20">
                <small class="form-hint">Incluye código de país. Ej: +521234567890</small>
            </div>
            
            <div class="form-group">
                <label class="form-checkbox">
                    <input type="checkbox" id="enableSMS">
                    <span>Recibir notificaciones por SMS</span>
                </label>
            </div>
            
            <div class="form-group">
                <label class="form-label">Horario de notificaciones</label>
                <select id="notificationTime" class="form-select">
                    <option value="08:00">8:00 AM</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                </select>
            </div>
            
            <div class="form-group">
                <label class="form-label">Tipo de notificaciones</label>
                <div class="checkbox-group">
                    <label class="form-checkbox">
                        <input type="checkbox" id="notifyUrgent" checked>
                        <span>Tareas urgentes</span>
                    </label>
                    <label class="form-checkbox">
                        <input type="checkbox" id="notifyDaily" checked>
                        <span>Resumen diario</span>
                    </label>
                    <label class="form-checkbox">
                        <input type="checkbox" id="notifyOverdue">
                        <span>Tareas vencidas</span>
                    </label>
                </div>
            </div>
            
            <div class="test-sms">
                <button type="button" id="testSMS" class="btn btn-secondary">
                    📱 Probar notificación
                </button>
                <small>Envía un SMS de prueba a tu teléfono</small>
            </div>
        </div>
        <div class="modal-footer">
            <button id="cancelPhone" class="btn btn-secondary">Cancelar</button>
            <button id="savePhone" class="btn btn-primary">Guardar Configuración</button>
        </div>
    </div>
</div>

<!-- BOTÓN PARA CONFIGURAR SMS (agrega en el navbar) -->
<button id="configureSMS" class="btn btn-sms" style="margin-left: 10px;">
    <span class="sms-icon">📱</span>
    <span class="sms-text">SMS</span>
</button>
                </div>
            </div>
        </div>

        <!-- DASHBOARD -->
        <div id="dashboard" class="dashboard">
            <!-- NAVBAR -->
            <nav class="navbar">
                <!-- BOTÓN PARA CONFIGURAR SMS (agrega en el navbar) -->
<button id="configureSMS" class="btn btn-sms" style="margin-left: 10px;">
    <span class="sms-icon">📱</span>
    <span class="sms-text">SMS</span>
</button>
                <div class="logo">
                    <span class="logo-icon">📅</span>
                    <h1>Organimedia</h1>
                </div>
                <div class="user-info">
                    <div class="user-avatar" id="userAvatar">U</div>
                    <div>
                        <div id="userName">Usuario</div>
                        <button id="logoutBtn" class="btn btn-secondary" style="padding: 8px 15px; font-size: 14px;">
                            Salir
                        </button>
                    </div>
                </div>
            </nav>

            <!-- CALENDARIO -->
            <div class="calendar-container">
                <div class="calendar-header">
                    <h2 id="currentMonth" class="calendar-title">Febrero 2024</h2>
                    <div class="calendar-nav">
                        <button id="prevMonth" class="btn btn-secondary">◀</button>
                        <button id="todayBtn" class="btn btn-primary">Hoy</button>
                        <button id="nextMonth" class="btn btn-secondary">▶</button>
                    </div>
                </div>

                <!-- CALENDARIO GRID -->
                <div class="calendar-grid" id="calendarGrid">
                    <!-- Se llena dinámicamente -->
                </div>

                <!-- PANEL DE TAREAS -->
                <div class="tasks-panel">
                    <h3 style="margin-bottom: 15px;">Tareas para <span id="selectedDayText">hoy</span></h3>
                    
                    <div class="task-form">
                        <input type="text" id="newTaskInput" class="task-input" placeholder="Escribe una nueva tarea...">
                        <button id="addTaskBtn" class="btn btn-primary" style="padding: 10px 20px;">Agregar</button>
                    </div>
                    
                    <div id="tasksList">
                        <!-- Tareas se mostrarán aquí -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- NOTIFICACIONES -->
    <div id="notification" style="display: none; position: fixed; top: 20px; right: 20px; padding: 15px 20px; background: #48bb78; color: white; border-radius: 8px;"></div>

    <script>
        // DATOS DE LA APLICACIÓN
        let currentUser = null;
        let currentDate = new Date();
        let selectedDate = new Date();
        let tasks = [];

        // INICIALIZAR
        document.addEventListener('DOMContentLoaded', function() {
            checkSavedUser();
            setupEventListeners();
            updateSelectedDateText();
        });

        // VERIFICAR USUARIO GUARDADO
        function checkSavedUser() {
            const savedUser = localStorage.getItem('organimedia_user');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                showDashboard();
                loadUserTasks();
            }
        }

        // CONFIGURAR EVENTOS
        function setupEventListeners() {
            // Login
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                login(email, password);
            });

            // Demo login
            document.getElementById('demoLogin').addEventListener('click', function() {
                document.getElementById('email').value = 'demo@organimedia.com';
                document.getElementById('password').value = 'demo123';
                document.getElementById('loginForm').dispatchEvent(new Event('submit'));
            });

            // Logout
            document.getElementById('logoutBtn').addEventListener('click', logout);

            // Navegación del calendario
            document.getElementById('prevMonth').addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });

            document.getElementById('nextMonth').addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });

            document.getElementById('todayBtn').addEventListener('click', function() {
                currentDate = new Date();
                selectedDate = new Date();
                updateCalendar();
                updateSelectedDateText();
                showNotification('Volviendo al día de hoy');
            });

            // Agregar tarea
            document.getElementById('addTaskBtn').addEventListener('click', addTaskFromInput);
            document.getElementById('newTaskInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTaskFromInput();
                }
            });
        }

        // FUNCIÓN DE LOGIN
        function login(email, password) {
            const errorMessage = document.getElementById('errorMessage');
            
            // Validar campos
            if (!email || !password) {
                showError('Por favor completa todos los campos');
                return;
            }

            // Credenciales demo
            if (email === 'demo@organimedia.com' && password === 'demo123') {
                currentUser = {
                    id: 'demo_user',
                    name: 'Usuario Demo',
                    email: email,
                    avatar: 'UD'
                };
                
                localStorage.setItem('organimedia_user', JSON.stringify(currentUser));
                showDashboard();
                showNotification('¡Bienvenido a Organimedia!');
                return;
            }

            // Para otros emails, crear usuario automáticamente
            currentUser = {
                id: 'user_' + Date.now(),
                name: email.split('@')[0],
                email: email,
                avatar: email.charAt(0).toUpperCase()
            };
            
            localStorage.setItem('organimedia_user', JSON.stringify(currentUser));
            showDashboard();
            showNotification(`¡Bienvenido ${currentUser.name}!`);
        }

        // FUNCIÓN DE LOGOUT
        function logout() {
            currentUser = null;
            localStorage.removeItem('organimedia_user');
            showLoginPage();
            showNotification('Sesión cerrada correctamente');
        }

        // MOSTRAR PÁGINA DE LOGIN
        function showLoginPage() {
            document.getElementById('loginPage').style.display = 'block';
            document.getElementById('dashboard').style.display = 'none';
            document.getElementById('errorMessage').classList.remove('show');
        }

        // MOSTRAR DASHBOARD
        function showDashboard() {
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            
            // Actualizar información del usuario
            if (currentUser) {
                document.getElementById('userName').textContent = currentUser.name;
                document.getElementById('userAvatar').textContent = currentUser.avatar;
            }
            
            // Inicializar calendario
            updateCalendar();
            loadUserTasks();
        }

        // CARGAR TAREAS DEL USUARIO
        function loadUserTasks() {
            if (!currentUser) return;
            
            const savedTasks = localStorage.getItem(`organimedia_tasks_${currentUser.id}`);
            
            if (savedTasks) {
                tasks = JSON.parse(savedTasks);
            } else {
                // Tareas de ejemplo
                tasks = [
                    {
                        id: '1',
                        title: 'Reunión de equipo',
                        date: new Date().toISOString(),
                        completed: false
                    },
                    {
                        id: '2',
                        title: 'Entregar reporte mensual',
                        date: new Date().toISOString(),
                        completed: true
                    },
                    {
                        id: '3',
                        title: 'Comprar suministros',
                        date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
                        completed: false
                    }
                ];
                
                saveTasks();
            }
            
            updateTasksList();
        }

        // GUARDAR TAREAS
        function saveTasks() {
            if (currentUser) {
                localStorage.setItem(`organimedia_tasks_${currentUser.id}`, JSON.stringify(tasks));
            }
        }

        // ACTUALIZAR CALENDARIO
        function updateCalendar() {
            const calendarGrid = document.getElementById('calendarGrid');
            const monthNames = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];
            
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Actualizar título
            document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
            
            // Obtener primer día del mes
            const firstDay = new Date(year, month, 1);
            const startingDay = firstDay.getDay();
            
            // Obtener número de días en el mes
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            
            // Crear grid del calendario
            calendarGrid.innerHTML = '';
            
            // Agregar encabezados de días
            const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
            daysOfWeek.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.className = 'calendar-day-header';
                dayHeader.textContent = day;
                calendarGrid.appendChild(dayHeader);
            });
            
            // Agregar días vacíos al inicio
            for (let i = 0; i < startingDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                calendarGrid.appendChild(emptyDay);
            }
            
            // Agregar días del mes
            const today = new Date();
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDate = new Date(year, month, day);
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.dataset.date = dayDate.toISOString();
                
                // Marcar si es hoy
                if (day === today.getDate() && 
                    month === today.getMonth() && 
                    year === today.getFullYear()) {
                    dayElement.classList.add('today');
                }
                
                // Marcar si es seleccionado
                if (isSameDay(dayDate, selectedDate)) {
                    dayElement.classList.add('selected');
                }
                
                // Número del día
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                dayNumber.textContent = day;
                dayElement.appendChild(dayNumber);
                
                // Agregar tareas para este día
                const dayTasks = getTasksForDay(dayDate);
                dayTasks.forEach(task => {
                    const taskElement = document.createElement('div');
                    taskElement.className = `day-task ${task.completed ? 'completed' : ''}`;
                    taskElement.innerHTML = `
                        <span>${task.title}</span>
                        <div class="task-checkbox ${task.completed ? 'checked' : ''}"></div>
                    `;
                    
                    // Evento para marcar como completada
                    const checkbox = taskElement.querySelector('.task-checkbox');
                    checkbox.addEventListener('click', function(e) {
                        e.stopPropagation();
                        toggleTaskCompletion(task.id);
                    });
                    
                    dayElement.appendChild(taskElement);
                });
                
                // Evento click en el día
                dayElement.addEventListener('click', function() {
                    selectDay(dayDate);
                });
                
                calendarGrid.appendChild(dayElement);
            }
        }

        // OBTENER TAREAS PARA UN DÍA
        function getTasksForDay(date) {
            return tasks.filter(task => {
                const taskDate = new Date(task.date);
                return isSameDay(taskDate, date);
            });
        }

        // COMPARAR SI SON EL MISMO DÍA
        function isSameDay(date1, date2) {
            return date1.getDate() === date2.getDate() &&
                   date1.getMonth() === date2.getMonth() &&
                   date1.getFullYear() === date2.getFullYear();
        }

        // SELECCIONAR DÍA
        function selectDay(date) {
            selectedDate = date;
            updateCalendar();
            updateSelectedDateText();
            updateTasksList();
        }

        // ACTUALIZAR TEXTO DEL DÍA SELECCIONADO
        function updateSelectedDateText() {
            const today = new Date();
            const options = { weekday: 'long', day: 'numeric', month: 'long' };
            
            if (isSameDay(selectedDate, today)) {
                document.getElementById('selectedDayText').textContent = 'hoy';
            } else {
                document.getElementById('selectedDayText').textContent = 
                    selectedDate.toLocaleDateString('es-ES', options);
            }
        }

        // AGREGAR TAREA DESDE INPUT
        function addTaskFromInput() {
            const input = document.getElementById('newTaskInput');
            const title = input.value.trim();
            
            if (!title) {
                showNotification('Por favor escribe una tarea', 'error');
                return;
            }
            
            const newTask = {
                id: Date.now().toString(),
                title: title,
                date: selectedDate.toISOString(),
                completed: false
            };
            
            tasks.push(newTask);
            saveTasks();
            updateCalendar();
            updateTasksList();
            
            input.value = '';
            showNotification('Tarea agregada correctamente');
        }

        // MARCAR TAREA COMO COMPLETADA
        function toggleTaskCompletion(taskId) {
            const task = tasks.find(t => t.id === taskId);
            
            if (task) {
                task.completed = !task.completed;
                saveTasks();
                updateCalendar();
                updateTasksList();
                
                const message = task.completed 
                    ? '¡Tarea completada!' 
                    : 'Tarea marcada como pendiente';
                
                showNotification(message);
            }
        }

        // ACTUALIZAR LISTA DE TAREAS
        function updateTasksList() {
            const tasksList = document.getElementById('tasksList');
            const dayTasks = getTasksForDay(selectedDate);
            
            if (dayTasks.length === 0) {
                tasksList.innerHTML = '<p style="color: #666; text-align: center;">No hay tareas para este día</p>';
                return;
            }
            
            tasksList.innerHTML = '';
            
            dayTasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.className = `task-list-item ${task.completed ? 'completed' : ''}`;
                taskElement.innerHTML = `
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                         style="cursor: pointer;"></div>
                    <div style="flex: 1; ${task.completed ? 'text-decoration: line-through; color: #999;' : ''}">
                        ${task.title}
                    </div>
                `;
                
                // Evento para marcar como completada
                const checkbox = taskElement.querySelector('.task-checkbox');
                checkbox.addEventListener('click', function() {
                    toggleTaskCompletion(task.id);
                });
                
                tasksList.appendChild(taskElement);
            });
        }

        // MOSTRAR NOTIFICACIÓN
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.style.background = type === 'error' ? '#ef4444' : '#48bb78';
            notification.style.display = 'block';
            
            setTimeout(function() {
                notification.style.display = 'none';
            }, 3000);
        }

        // MOSTRAR ERROR
        function showError(message) {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            
            setTimeout(function() {
                errorMessage.classList.remove('show');
            }, 5000);
        }
    </script>
</body>
</html>
