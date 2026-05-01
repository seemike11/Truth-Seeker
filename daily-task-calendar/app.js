const STORAGE_KEY = 'dailyTaskCalendar.tasks.v2';

const $ = (id) => document.getElementById(id);
let selectedDate = new Date();
selectedDate.setHours(0, 0, 0, 0);

function localDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function taskAppliesToDate(task, dateStr) {
  return task.date === dateStr || task.repeatDaily;
}

function getTasksForDate(dateStr) {
  return loadTasks()
    .filter(task => taskAppliesToDate(task, dateStr))
    .sort((a, b) => a.time.localeCompare(b.time));
}

function isDone(task, dateStr) {
  return Array.isArray(task.doneDates) && task.doneDates.includes(dateStr);
}

function render() {
  const today = new Date();
  const selectedDateStr = localDateString(selectedDate);

  if ($('todayLabel')) $('todayLabel').textContent = `Today: ${formatDate(today)}`;
  if ($('selectedDateLabel')) $('selectedDateLabel').textContent = formatDate(selectedDate);
  if ($('jumpDate')) $('jumpDate').value = selectedDateStr;

  const taskList = $('taskList');
  if (!taskList) return;

  const tasks = getTasksForDate(selectedDateStr);
  if (!tasks.length) {
    taskList.innerHTML = '<div class="empty">No tasks for this day.</div>';
    return;
  }

  taskList.innerHTML = tasks.map(task => {
    const done = isDone(task, selectedDateStr);
    return `
      <div class="task ${done ? 'doneItem' : ''}">
        <div class="taskHeader">
          <div class="taskTitle">${escapeHtml(task.title)}</div>
          <div class="taskTime">${escapeHtml(task.time)}${task.repeatDaily ? ' · daily' : ''}</div>
        </div>
        ${task.notes ? `<div class="taskNotes">${escapeHtml(task.notes)}</div>` : ''}
        <div class="actions">
          <button class="done" onclick="toggleDone('${task.id}', '${selectedDateStr}')">${done ? 'Undo' : 'Done'}</button>
          <button class="danger" onclick="deleteTask('${task.id}')">Delete</button>
        </div>
      </div>`;
  }).join('');
}

function toggleDone(id, dateStr) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.doneDates = task.doneDates || [];
  if (task.doneDates.includes(dateStr)) {
    task.doneDates = task.doneDates.filter(d => d !== dateStr);
  } else {
    task.doneDates.push(dateStr);
  }
  saveTasks(tasks);
  render();
}

function deleteTask(id) {
  saveTasks(loadTasks().filter(t => t.id !== id));
  render();
}

async function enableNotifications() {
  if (!('Notification' in window)) {
    alert('This browser does not support browser notifications.');
    return;
  }
  const permission = await Notification.requestPermission();
  alert(permission === 'granted' ? 'Reminders enabled.' : 'Notifications not allowed.');
}

function reminderLoop() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const now = new Date();
  const todayStr = localDateString(now);
  const timeStr = now.toTimeString().slice(0, 5);
  const tasks = getTasksForDate(todayStr);
  const sent = JSON.parse(sessionStorage.getItem('sentReminders') || '[]');

  tasks.forEach(task => {
    const key = `${task.id}-${todayStr}-${timeStr}`;
    if (task.time === timeStr && !sent.includes(key) && !isDone(task, todayStr)) {
      new Notification(task.title, { body: task.notes || 'Task reminder', tag: key });
      sent.push(key);
    }
  });

  sessionStorage.setItem('sentReminders', JSON.stringify(sent.slice(-300)));
}

window.toggleDone = toggleDone;
window.deleteTask = deleteTask;

window.addEventListener('DOMContentLoaded', () => {
  const todayStr = localDateString(new Date());
  if ($('taskDate')) $('taskDate').value = todayStr;

  $('notifyBtn')?.addEventListener('click', enableNotifications);

  $('taskForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = $('taskTitle').value.trim();
    const notes = $('taskNotes').value.trim();
    const date = $('taskDate').value;
    const time = $('taskTime').value;
    const repeatDaily = $('repeatDaily').checked;

    if (!title || !date || !time) {
      alert('Add a task name, date, and reminder time.');
      return;
    }

    const tasks = loadTasks();
    tasks.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title,
      notes,
      date,
      time,
      repeatDaily,
      doneDates: []
    });
    saveTasks(tasks);

    $('taskForm').reset();
    $('taskDate').value = todayStr;
    selectedDate = new Date(date + 'T00:00:00');
    render();
  });

  $('prevDay')?.addEventListener('click', () => {
    selectedDate.setDate(selectedDate.getDate() - 1);
    render();
  });

  $('nextDay')?.addEventListener('click', () => {
    selectedDate.setDate(selectedDate.getDate() + 1);
    render();
  });

  $('jumpDate')?.addEventListener('change', (event) => {
    selectedDate = new Date(event.target.value + 'T00:00:00');
    render();
  });

  render();
  setInterval(reminderLoop, 30000);
});
