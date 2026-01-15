// ===== Application State =====
const app = {
    currentScreen: 'welcome',
    currentCategory: null,
    data: {
        health: [],
        diet: [],
        schedule: [],
        appointments: []
    },

    // Initialize the app
    init() {
        this.loadData();
        this.updateDate();
        this.updateStats();
        this.updateBadges();

        // Set up service worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js')
                .catch(err => console.log('Service worker registration failed:', err));
        }

        // Check if returning user
        const hasVisited = localStorage.getItem('hasVisited');
        if (hasVisited) {
            this.showDashboard();
        }
    },

    // Screen Navigation
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;
    },

    showDashboard() {
        localStorage.setItem('hasVisited', 'true');
        this.showScreen('dashboardScreen');
        this.renderDashboard();
        this.updateStats();
        this.updateBadges();
        this.updateNavigation('dashboard');
    },

    renderDashboard() {
        const content = document.querySelector('.dashboard-content');
        if (!content) return;

        // Check if dashboard content exists, if not, restore it
        const categoryGrid = content.querySelector('.category-grid');
        if (!categoryGrid) {
            content.innerHTML = `
                <div class="date-display">
                    <p id="currentDate"></p>
                </div>

                <div class="quick-stats">
                    <div class="stat-card">
                        <div class="stat-icon">💧</div>
                        <div class="stat-content">
                            <p class="stat-label">Water Today</p>
                            <p class="stat-value" id="waterStat">0/8 glasses</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🔥</div>
                        <div class="stat-content">
                            <p class="stat-label">Calories</p>
                            <p class="stat-value" id="caloriesStat">0 kcal</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏰</div>
                        <div class="stat-content">
                            <p class="stat-label">Today's Tasks</p>
                            <p class="stat-value" id="tasksStat">0 pending</p>
                        </div>
                    </div>
                </div>

                <div class="category-grid">
                    <div class="category-card" onclick="app.showCategory('health')">
                        <div class="category-icon">💪</div>
                        <h3>Health</h3>
                        <p>Fitness & Wellness</p>
                        <div class="category-badge" id="healthBadge">0</div>
                    </div>
                    
                    <div class="category-card" onclick="app.showCategory('diet')">
                        <div class="category-icon">🥗</div>
                        <h3>Diet</h3>
                        <p>Meals & Nutrition</p>
                        <div class="category-badge" id="dietBadge">0</div>
                    </div>
                    
                    <div class="category-card" onclick="app.showCategory('schedule')">
                        <div class="category-icon">📅</div>
                        <h3>Schedule</h3>
                        <p>Calendar & Events</p>
                        <div class="category-badge" id="scheduleBadge">0</div>
                    </div>
                    
                    <div class="category-card" onclick="app.showCategory('appointments')">
                        <div class="category-icon">🩺</div>
                        <h3>Appointments</h3>
                        <p>Medical & Meetings</p>
                        <div class="category-badge" id="appointmentsBadge">0</div>
                    </div>
                </div>
            `;
        }

        this.updateDate();
    },

    showCategory(category) {
        this.currentCategory = category;
        this.showScreen('categoryScreen');
        this.renderCategory();
    },

    showHistory() {
        this.showScreen('dashboardScreen');
        this.updateNavigation('history');
        this.renderHistory();
    },

    showSettings() {
        this.showScreen('dashboardScreen');
        this.updateNavigation('settings');
        this.renderSettings();
    },

    showGuide() {
        this.showScreen('guideScreen');
    },

    hideGuide() {
        if (this.currentScreen === 'welcome') {
            this.showScreen('welcomeScreen');
        } else {
            this.showDashboard();
        }
    },

    updateNavigation(active) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // The dashboard nav will be marked active by default
    },

    // Date and Stats
    updateDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = today.toLocaleDateString('en-US', options);
        const dateEl = document.getElementById('currentDate');
        if (dateEl) {
            dateEl.textContent = dateStr;
        }
    },

    updateStats() {
        const today = this.getTodayString();

        // Water intake
        const waterToday = this.data.health.filter(entry =>
            entry.date === today && entry.type === 'water'
        ).length;
        document.getElementById('waterStat').textContent = `${waterToday}/8 glasses`;

        // Calories
        const caloriesToday = this.data.diet
            .filter(entry => entry.date === today)
            .reduce((sum, entry) => sum + (entry.calories || 0), 0);
        document.getElementById('caloriesStat').textContent = `${caloriesToday} kcal`;

        // Tasks
        const tasksToday = this.data.schedule.filter(entry =>
            entry.date === today && !entry.completed
        ).length;
        document.getElementById('tasksStat').textContent = `${tasksToday} pending`;
    },

    updateBadges() {
        document.getElementById('healthBadge').textContent = this.data.health.length;
        document.getElementById('dietBadge').textContent = this.data.diet.length;
        document.getElementById('scheduleBadge').textContent = this.data.schedule.length;
        document.getElementById('appointmentsBadge').textContent = this.data.appointments.length;
    },

    getTodayString() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    },

    // Category Rendering
    renderCategory() {
        const category = this.currentCategory;
        const categoryInfo = this.getCategoryInfo(category);

        document.getElementById('categoryTitle').innerHTML = `${categoryInfo.icon} ${categoryInfo.title}`;

        const content = document.getElementById('categoryContent');
        const entries = this.data[category];

        if (entries.length === 0) {
            content.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">${categoryInfo.icon}</div>
                    <h3>No Entries Yet</h3>
                    <p>${categoryInfo.emptyMessage}</p>
                    <button class="btn-primary" onclick="app.showAddEntry()">
                        Add Your First Entry
                    </button>
                </div>
            `;
        } else {
            const sortedEntries = [...entries].sort((a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            );

            content.innerHTML = `
                <div class="entry-list">
                    ${sortedEntries.map((entry, index) => this.renderEntry(entry, index, category)).join('')}
                </div>
            `;
        }
    },

    renderEntry(entry, index, category) {
        const date = new Date(entry.timestamp);
        const timeStr = date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });

        let details = this.getEntryDetails(entry, category);

        return `
            <div class="entry-card">
                <div class="entry-header">
                    <div class="entry-title">${entry.title || this.getCategoryInfo(category).title}</div>
                    <div class="entry-time">${timeStr}</div>
                </div>
                <div class="entry-details">${details}</div>
                <div class="entry-actions">
                    <button class="btn-small btn-danger" onclick="app.deleteEntry('${category}', ${index})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    },

    getEntryDetails(entry, category) {
        switch (category) {
            case 'health':
                if (entry.type === 'weight') {
                    return `<strong>Weight:</strong> ${entry.weight} ${entry.unit || 'lbs'}`;
                } else if (entry.type === 'exercise') {
                    return `<strong>Exercise:</strong> ${entry.exercise} - ${entry.duration} minutes`;
                } else if (entry.type === 'water') {
                    return `💧 Water logged`;
                } else if (entry.type === 'sleep') {
                    return `<strong>Sleep:</strong> ${entry.hours} hours`;
                }
                break;
            case 'diet':
                return `
                    <strong>Meal:</strong> ${entry.meal}<br>
                    <strong>Calories:</strong> ${entry.calories || 'N/A'} kcal<br>
                    ${entry.notes ? `<strong>Notes:</strong> ${entry.notes}` : ''}
                `;
            case 'schedule':
                return `
                    <strong>Task:</strong> ${entry.task}<br>
                    <strong>Priority:</strong> ${entry.priority || 'Medium'}<br>
                    <strong>Status:</strong> ${entry.completed ? '✅ Completed' : '⏳ Pending'}
                `;
            case 'appointments':
                return `
                    <strong>Type:</strong> ${entry.type}<br>
                    <strong>Location:</strong> ${entry.location || 'N/A'}<br>
                    <strong>Time:</strong> ${entry.time || 'TBD'}<br>
                    ${entry.notes ? `<strong>Notes:</strong> ${entry.notes}` : ''}
                `;
        }
        return '';
    },

    getCategoryInfo(category) {
        const info = {
            health: {
                icon: '💪',
                title: 'Health',
                emptyMessage: 'Start tracking your health metrics like weight, exercise, water intake, and sleep.',
            },
            diet: {
                icon: '🥗',
                title: 'Diet',
                emptyMessage: 'Log your meals and track your nutrition throughout the day.',
            },
            schedule: {
                icon: '📅',
                title: 'Schedule',
                emptyMessage: 'Add tasks and events to organize your day.',
            },
            appointments: {
                icon: '🩺',
                title: 'Appointments',
                emptyMessage: 'Keep track of important appointments and meetings.',
            }
        };
        return info[category];
    },

    // Modal Management
    showAddEntry() {
        const category = this.currentCategory;
        const modal = document.getElementById('addEntryModal');
        const modalBody = document.getElementById('modalBody');
        const categoryInfo = this.getCategoryInfo(category);

        document.getElementById('modalTitle').textContent = `Add ${categoryInfo.title} Entry`;

        modalBody.innerHTML = this.getEntryForm(category);
        modal.classList.add('active');
    },

    closeModal() {
        document.getElementById('addEntryModal').classList.remove('active');
    },

    getEntryForm(category) {
        switch (category) {
            case 'health':
                return `
                    <div class="form-group">
                        <label class="form-label">Type</label>
                        <select class="form-select" id="healthType" onchange="app.updateHealthForm()">
                            <option value="weight">Weight</option>
                            <option value="exercise">Exercise</option>
                            <option value="water">Water Intake</option>
                            <option value="sleep">Sleep</option>
                        </select>
                    </div>
                    <div id="healthFormFields"></div>
                    <div class="form-actions">
                        <button class="btn-primary" onclick="app.saveHealthEntry()">Save Entry</button>
                        <button class="btn-ghost" onclick="app.closeModal()">Cancel</button>
                    </div>
                `;
            case 'diet':
                return `
                    <div class="form-group">
                        <label class="form-label">Meal Type</label>
                        <select class="form-select" id="dietMealType">
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">What did you eat?</label>
                        <textarea class="form-textarea" id="dietMeal" placeholder="Describe your meal..."></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Calories</label>
                            <input type="number" class="form-input" id="dietCalories" placeholder="500">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Protein (g)</label>
                            <input type="number" class="form-input" id="dietProtein" placeholder="30">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Notes (optional)</label>
                        <textarea class="form-textarea" id="dietNotes" placeholder="How did you feel?"></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="btn-primary" onclick="app.saveDietEntry()">Save Entry</button>
                        <button class="btn-ghost" onclick="app.closeModal()">Cancel</button>
                    </div>
                `;
            case 'schedule':
                return `
                    <div class="form-group">
                        <label class="form-label">Task/Event</label>
                        <input type="text" class="form-input" id="scheduleTask" placeholder="What do you need to do?">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Date</label>
                            <input type="date" class="form-input" id="scheduleDate" value="${this.getTodayString()}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Time</label>
                            <input type="time" class="form-input" id="scheduleTime">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Priority</label>
                        <select class="form-select" id="schedulePriority">
                            <option value="Low">Low</option>
                            <option value="Medium" selected>Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Category</label>
                        <select class="form-select" id="scheduleCategory">
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Health">Health</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button class="btn-primary" onclick="app.saveScheduleEntry()">Save Entry</button>
                        <button class="btn-ghost" onclick="app.closeModal()">Cancel</button>
                    </div>
                `;
            case 'appointments':
                return `
                    <div class="form-group">
                        <label class="form-label">Appointment Title</label>
                        <input type="text" class="form-input" id="apptTitle" placeholder="Doctor Visit, Meeting, etc.">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Type</label>
                        <select class="form-select" id="apptType">
                            <option value="Medical">Medical</option>
                            <option value="Dental">Dental</option>
                            <option value="Business">Business</option>
                            <option value="Personal">Personal</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Date</label>
                            <input type="date" class="form-input" id="apptDate">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Time</label>
                            <input type="time" class="form-input" id="apptTime">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" class="form-input" id="apptLocation" placeholder="Address or place name">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Notes (optional)</label>
                        <textarea class="form-textarea" id="apptNotes" placeholder="Doctor name, preparation needed, etc."></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="btn-primary" onclick="app.saveApptEntry()">Save Entry</button>
                        <button class="btn-ghost" onclick="app.closeModal()">Cancel</button>
                    </div>
                `;
        }
    },

    updateHealthForm() {
        const type = document.getElementById('healthType').value;
        const container = document.getElementById('healthFormFields');

        switch (type) {
            case 'weight':
                container.innerHTML = `
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Weight</label>
                            <input type="number" step="0.1" class="form-input" id="healthWeight" placeholder="150">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Unit</label>
                            <select class="form-select" id="healthUnit">
                                <option value="lbs">lbs</option>
                                <option value="kg">kg</option>
                            </select>
                        </div>
                    </div>
                `;
                break;
            case 'exercise':
                container.innerHTML = `
                    <div class="form-group">
                        <label class="form-label">Exercise Type</label>
                        <input type="text" class="form-input" id="healthExercise" placeholder="Running, Yoga, etc.">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Duration (minutes)</label>
                        <input type="number" class="form-input" id="healthDuration" placeholder="30">
                    </div>
                `;
                break;
            case 'water':
                container.innerHTML = `
                    <div class="form-group">
                        <p style="color: var(--text-secondary);">Click save to log one glass of water (8 oz)</p>
                    </div>
                `;
                break;
            case 'sleep':
                container.innerHTML = `
                    <div class="form-group">
                        <label class="form-label">Hours of Sleep</label>
                        <input type="number" step="0.5" class="form-input" id="healthSleep" placeholder="7.5">
                    </div>
                `;
                break;
        }
    },

    // Save Entry Functions
    saveHealthEntry() {
        const type = document.getElementById('healthType').value;
        const entry = {
            timestamp: new Date().toISOString(),
            date: this.getTodayString(),
            type: type
        };

        switch (type) {
            case 'weight':
                entry.weight = parseFloat(document.getElementById('healthWeight').value);
                entry.unit = document.getElementById('healthUnit').value;
                entry.title = `Weight: ${entry.weight} ${entry.unit}`;
                break;
            case 'exercise':
                entry.exercise = document.getElementById('healthExercise').value;
                entry.duration = parseInt(document.getElementById('healthDuration').value);
                entry.title = `Exercise: ${entry.exercise}`;
                break;
            case 'water':
                entry.title = 'Water Intake';
                break;
            case 'sleep':
                entry.hours = parseFloat(document.getElementById('healthSleep').value);
                entry.title = `Sleep: ${entry.hours} hours`;
                break;
        }

        this.data.health.push(entry);
        this.saveData();
        this.closeModal();
        this.renderCategory();
        this.updateStats();
        this.updateBadges();
    },

    saveDietEntry() {
        const entry = {
            timestamp: new Date().toISOString(),
            date: this.getTodayString(),
            mealType: document.getElementById('dietMealType').value,
            meal: document.getElementById('dietMeal').value,
            calories: parseInt(document.getElementById('dietCalories').value) || 0,
            protein: parseInt(document.getElementById('dietProtein').value) || 0,
            notes: document.getElementById('dietNotes').value,
            title: document.getElementById('dietMealType').value
        };

        this.data.diet.push(entry);
        this.saveData();
        this.closeModal();
        this.renderCategory();
        this.updateStats();
        this.updateBadges();
    },

    saveScheduleEntry() {
        const entry = {
            timestamp: new Date().toISOString(),
            date: document.getElementById('scheduleDate').value,
            task: document.getElementById('scheduleTask').value,
            time: document.getElementById('scheduleTime').value,
            priority: document.getElementById('schedulePriority').value,
            category: document.getElementById('scheduleCategory').value,
            completed: false,
            title: document.getElementById('scheduleTask').value
        };

        this.data.schedule.push(entry);
        this.saveData();
        this.closeModal();
        this.renderCategory();
        this.updateStats();
        this.updateBadges();
    },

    saveApptEntry() {
        const entry = {
            timestamp: new Date().toISOString(),
            date: document.getElementById('apptDate').value,
            title: document.getElementById('apptTitle').value,
            type: document.getElementById('apptType').value,
            time: document.getElementById('apptTime').value,
            location: document.getElementById('apptLocation').value,
            notes: document.getElementById('apptNotes').value
        };

        this.data.appointments.push(entry);
        this.saveData();
        this.closeModal();
        this.renderCategory();
        this.updateStats();
        this.updateBadges();
    },

    deleteEntry(category, index) {
        if (confirm('Are you sure you want to delete this entry?')) {
            this.data[category].splice(index, 1);
            this.saveData();
            this.renderCategory();
            this.updateStats();
            this.updateBadges();
        }
    },

    // Data Persistence
    saveData() {
        localStorage.setItem('lifeTrackerData', JSON.stringify(this.data));
    },

    loadData() {
        const saved = localStorage.getItem('lifeTrackerData');
        if (saved) {
            try {
                this.data = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading data:', e);
            }
        }
    },

    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `lifetracker-backup-${this.getTodayString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        alert('Data exported successfully!');
    },

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    this.data = JSON.parse(event.target.result);
                    this.saveData();
                    this.updateStats();
                    this.updateBadges();
                    alert('Data imported successfully!');
                } catch (error) {
                    alert('Error importing data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    clearAllData() {
        if (confirm('⚠️ WARNING: This will delete ALL your data. This cannot be undone. Are you absolutely sure?')) {
            if (confirm('Last chance! Really delete everything?')) {
                this.data = {
                    health: [],
                    diet: [],
                    schedule: [],
                    appointments: []
                };
                this.saveData();
                this.updateStats();
                this.updateBadges();
                alert('All data has been cleared.');
                this.showDashboard();
            }
        }
    },

    // Settings Screen
    renderSettings() {
        const content = document.querySelector('.dashboard-content');
        content.innerHTML = `
            <h2 style="margin-bottom: var(--spacing-lg);">Settings</h2>
            
            <div class="settings-section">
                <h3>About</h3>
                <div class="setting-item">
                    <h4>LifeTracker v1.0</h4>
                    <p>Your personal health and life management app</p>
                </div>
                <div class="setting-item" onclick="app.showGuide()">
                    <h4>User Guide</h4>
                    <p>Learn how to use all features</p>
                </div>
            </div>
        `;
    },

    // History Screen
    renderHistory() {
        const content = document.querySelector('.dashboard-content');

        // Gather all entries from all categories
        const allEntries = [];

        Object.keys(this.data).forEach(category => {
            this.data[category].forEach(entry => {
                allEntries.push({
                    ...entry,
                    category: category,
                    categoryInfo: this.getCategoryInfo(category)
                });
            });
        });

        // Sort by timestamp, newest first
        allEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (allEntries.length === 0) {
            content.innerHTML = `
                <h2 style="margin-bottom: var(--spacing-lg);">History</h2>
                <div class="empty-state">
                    <div class="empty-state-icon">📜</div>
                    <h3>No Entries Yet</h3>
                    <p>Start tracking your health, diet, schedule, and appointments to see your history here.</p>
                    <button class="btn-primary" onclick="app.showDashboard()">
                        Go to Dashboard
                    </button>
                </div>
            `;
        } else {
            const entriesHtml = allEntries.map((entry, index) => {
                const date = new Date(entry.timestamp);
                const timeStr = date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                });

                const details = this.getEntryDetails(entry, entry.category);

                return `
                    <div class="entry-card">
                        <div class="entry-header">
                            <div>
                                <div class="entry-category">${entry.categoryInfo.icon} ${entry.categoryInfo.title}</div>
                                <div class="entry-title">${entry.title || entry.categoryInfo.title}</div>
                            </div>
                            <div class="entry-time">${timeStr}</div>
                        </div>
                        <div class="entry-details">${details}</div>
                    </div>
                `;
            }).join('');

            content.innerHTML = `
                <h2 style="margin-bottom: var(--spacing-lg);">History (${allEntries.length} entries)</h2>
                <div class="entry-list">
                    ${entriesHtml}
                </div>
            `;
        }
    }
};

// Initialize the health form when modal opens
document.addEventListener('DOMContentLoaded', () => {
    app.init();

    // Update health form fields on first render
    setTimeout(() => {
        const healthFormFields = document.getElementById('healthFormFields');
        if (healthFormFields) {
            app.updateHealthForm();
        }
    }, 100);
});

// Close modal when clicking outside
document.getElementById('addEntryModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'addEntryModal') {
        app.closeModal();
    }
});
