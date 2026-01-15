# LifeTracker - Your Personal Health & Life Dashboard

A beautiful, feature-rich Progressive Web App (PWA) for tracking your health, diet, schedule, and appointments - all in one place!

![LifeTracker](https://img.shields.io/badge/version-1.0.0-blue.svg)
![PWA](https://img.shields.io/badge/PWA-enabled-green.svg)
![Mobile](https://img.shields.io/badge/mobile-optimized-purple.svg)

## ✨ Features

### 💪 Health Tracking
- **Weight Logging**: Track your weight with customizable units (lbs/kg)
- **Exercise Sessions**: Record workouts with type and duration
- **Water Intake**: Monitor daily hydration (8 glasses goal)
- **Sleep Tracking**: Log hours of sleep for better rest

### 🥗 Diet & Nutrition
- **Meal Logging**: Record breakfast, lunch, dinner, and snacks
- **Calorie Tracking**: Monitor daily caloric intake
- **Macro Nutrients**: Track protein, carbs, and fats
- **Meal Notes**: Add details and feelings about meals

### 📅 Schedule Manager
- **Task Management**: Create and organize to-do items
- **Event Planning**: Schedule activities with time slots
- **Priority Levels**: Tag tasks as Low, Medium, or High priority
- **Categories**: Organize by Work, Personal, Health, etc.
- **Status Tracking**: Mark tasks as completed or pending

### 🩺 Appointments
- **Medical Appointments**: Doctor visits, checkups, prescriptions
- **Professional Meetings**: Work consultations and business meetings
- **Personal Events**: Haircuts, vet visits, and more
- **Location & Notes**: Store address and important details
- **Time Reminders**: Never miss an important appointment

### 📊 Additional Features
- **Dashboard Overview**: See today's stats at a glance
- **History View**: Browse past entries across all categories
- **Data Export/Import**: Backup and restore your data
- **Offline Support**: Works without internet connection
- **Install as App**: Add to home screen for native app experience
- **Beautiful UI**: Modern design with smooth animations
- **Dark Theme**: Easy on the eyes with vibrant accents

## 🚀 Setup Instructions

### Method 1: Quick Start (Recommended)

1. **Download or Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/life-tracker-app.git
   cd life-tracker-app
   ```

2. **Serve the App Locally**
   
   **Option A: Using Python (if installed)**
   ```bash
   # Python 3.x
   python -m http.server 8000
   
   # Python 2.x
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js (if installed)**
   ```bash
   # Install http-server globally
   npm install -g http-server
   
   # Run the server
   http-server -p 8000
   ```
   
   **Option C: Using VS Code**
   - Install the "Live Server" extension
   - Right-click `index.html` and select "Open with Live Server"

3. **Open in Browser**
   - Navigate to `http://localhost:8000`
   - For mobile testing, find your computer's IP address and access from phone

4. **Install as PWA (Optional but Recommended)**
   - **On Mobile (iOS/Android)**:
     - Open the app in your mobile browser
     - Tap the browser menu (⋮ or share icon)
     - Select "Add to Home Screen" or "Install App"
     - Tap "Add" or "Install"
   
   - **On Desktop (Chrome/Edge)**:
     - Click the install icon in the address bar (+)
     - Click "Install" in the dialog

### Method 2: Deploy to Web Hosting

**Deploy to GitHub Pages:**
```bash
# In your repository
git add .
git commit -m "Initial commit"
git push origin main

# Enable GitHub Pages in repository settings
# Go to Settings > Pages > Source > main branch > Save
```

**Deploy to Netlify:**
1. Drag and drop the `life-tracker-app` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your app will be live instantly with HTTPS

**Deploy to Vercel:**
```bash
npm install -g vercel
vercel
```

## 📱 How to Use - Complete Guide

### Getting Started

1. **First Launch**
   - The app opens to a welcome screen
   - Tap "Get Started" to enter the dashboard
   - Tap "View User Guide" for detailed instructions

2. **Dashboard Navigation**
   - **Home Tab**: View quick stats and access categories
   - **History Tab**: Browse past entries (coming soon)
   - **Settings Tab**: Manage data and app preferences

### Health Tracker Guide

**Logging Weight:**
1. Tap the "Health" card on dashboard
2. Tap the "+" button (top right)
3. Select "Weight" as type
4. Enter your weight and select unit (lbs/kg)
5. Tap "Save Entry"

**Recording Exercise:**
1. Open Health tracker
2. Tap "+" button
3. Select "Exercise" as type
4. Enter exercise name (e.g., "Running", "Yoga")
5. Enter duration in minutes
6. Tap "Save Entry"

**Tracking Water Intake:**
1. Open Health tracker
2. Tap "+" button
3. Select "Water Intake"
4. Tap "Save Entry" (logs 1 glass)
5. Repeat throughout the day (goal: 8 glasses)

**Logging Sleep:**
1. Open Health tracker
2. Tap "+" button
3. Select "Sleep"
4. Enter hours of sleep (e.g., 7.5)
5. Tap "Save Entry"

### Diet Tracker Guide

**Logging a Meal:**
1. Tap "Diet" card on dashboard
2. Tap the "+" button
3. Select meal type (Breakfast, Lunch, Dinner, Snack)
4. Describe what you ate
5. Enter calories (optional)
6. Enter protein in grams (optional)
7. Add notes about how you felt (optional)
8. Tap "Save Entry"

**Tracking Daily Calories:**
- Your total daily calories appear on the dashboard
- View individual meal calories in the Diet section
- Track trends over time

### Schedule Manager Guide

**Creating a Task:**
1. Tap "Schedule" card
2. Tap "+" button
3. Enter task description
4. Select date (defaults to today)
5. Set time (optional)
6. Choose priority (Low/Medium/High)
7. Select category (Work/Personal/Health/Other)
8. Tap "Save Entry"

**Managing Tasks:**
- View all tasks in the Schedule section
- Pending tasks show on dashboard
- Delete tasks when completed

### Appointments Guide

**Adding an Appointment:**
1. Tap "Appointments" card
2. Tap "+" button
3. Enter appointment title
4. Select type (Medical/Dental/Business/Personal/Other)
5. Set date and time
6. Add location/address
7. Add notes (doctor name, preparation, etc.)
8. Tap "Save Entry"

**Appointment Best Practices:**
- Add location for easy navigation
- Include doctor/contact name in notes
- Set appointments a day early to get reminders
- Include any preparation instructions

## 💾 Data Management

### Backing Up Your Data

1. Tap the "Settings" tab (bottom navigation)
2. Tap "Export Data"
3. A JSON file will download automatically
4. Save this file safely (Google Drive, iCloud, etc.)

### Restoring Data

1. Go to Settings
2. Tap "Import Data"
3. Select your backup JSON file
4. Data will be restored immediately

### Clearing Data

⚠️ **Warning**: This deletes ALL entries permanently!

1. Go to Settings
2. Tap "Clear All Data"
3. Confirm twice
4. All data will be erased

## 🎨 UI Features

### Visual Design
- **Modern Dark Theme**: Easy on the eyes
- **Gradient Accents**: Beautiful purple-blue gradients
- **Smooth Animations**: Micro-interactions throughout
- **Glassmorphism**: Modern blur effects
- **Responsive**: Perfect on all screen sizes

### Interactive Elements
- **Hover Effects**: Cards respond to mouse/finger
- **Touch Feedback**: Buttons scale on press
- **Loading States**: Visual feedback for actions
- **Empty States**: Helpful messages when no data exists

## 🔧 Technical Details

### Built With
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: No frameworks, fast performance
- **PWA**: Service worker for offline support
- **LocalStorage**: Client-side data persistence

### Browser Support
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS & Android)

### Data Privacy
- **100% Local**: All data stored on your device
- **No Server**: No data sent anywhere
- **No Tracking**: No analytics or cookies
- **Offline First**: Works without internet

## 📊 Tips & Best Practices

### For Health Tracking
- ⏰ Weigh yourself at the same time daily (morning is best)
- 📈 Track weekly trends, not daily fluctuations
- 💧 Set reminders to drink water throughout the day
- 😴 Aim for 7-9 hours of sleep per night

### For Diet Tracking
- 📸 Take photos of meals for visual records
- 🍽️ Log meals immediately after eating
- 📝 Note how foods make you feel
- 🎯 Set realistic calorie goals

### For Schedule Management
- 🌅 Review your schedule each morning
- 🎨 Use categories to organize tasks
- ⚡ Tackle high-priority items first
- ✅ Celebrate completed tasks

### For Appointments
- 📍 Always include location/address
- ⏰ Add appointments when scheduled
- 📋 Include preparation instructions
- 📞 Save contact information in notes

## 🆘 Troubleshooting

### App Won't Install
- Ensure you're using HTTPS (or localhost)
- Try a different browser (Chrome recommended)
- Clear browser cache and try again

### Data Not Saving
- Check browser localStorage is enabled
- Ensure sufficient device storage
- Try exporting and importing data

### Offline Mode Not Working
- Service worker needs HTTPS to function
- Wait a few seconds after first visit
- Refresh the page to activate

## 🚀 Advanced Usage

### Using as Daily Journal
- Use Diet notes to track emotions
- Use Schedule for habit tracking
- Use Health for mood/energy levels

### Multi-Device Sync
1. Export data from Device A
2. Email/cloud save the JSON file
3. Import on Device B
4. Repeat when switching devices

### Custom Workflows
- Morning: Log weight, plan schedule
- After meals: Log diet entries
- Evening: Review day, log sleep plan
- Weekly: Export backup, review trends

## 📞 Support

For issues, questions, or feature requests:
- Check the User Guide in the app
- Review this README carefully
- All data is stored locally - no cloud support needed

## 📄 License

This project is open source and available for personal use.

---

**Made with ❤️ for better health and productivity**

Start tracking your life today! 🎯
