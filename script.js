
let primaryColor = null;
let secondaryColor = null;
let bgColor = null;
let textColor = null;

document.addEventListener('DOMContentLoaded', ()=> {
  console.log('Inicialized');
  history.replaceState(null, '', 'index.html');
  
  const taskManager = new TaskManager();
  taskManager.loadFromLocalStorage();

  bgColor = getComputedStyle(document.body).getPropertyValue("--bg-color");
  textColor = getComputedStyle(document.body).getPropertyValue("--text-color");
  primaryColor = getComputedStyle(document.body).getPropertyValue("--primary-color");
  secondaryColor = getComputedStyle(document.body).getPropertyValue("--secondary-color");

  const nav1 = document.querySelector('#daily');
  const nav2 = document.querySelector('#longterm');
  const nav3 = document.querySelector('#notes');

  const daily = document.querySelector('.checkList');
  const statusBased = document.querySelector('.statusList');
  const notes = document.querySelector('.notes');

  const addButtonCheck = document.querySelector('.add-button-check');
  const addButtonStatus = document.querySelector('.add-button-status');
  const addButtonNotes = document.querySelector('.add-button-notes');
  
  const filterContainer = document.querySelector('.filter-by');
  const addCheckFilter = document.querySelector('.add-check-filter');
  const addStatusFiler = document.querySelector('.add-status-filter');
      const all = document.querySelector('.all');
      const completed = document.querySelector('.comp');
      const inProgress = document.querySelector('.inprog');
      const onHold = document.querySelector('.onhold');
      const review = document.querySelector('.review');

  // ------------ filter by ------------- //

    all.addEventListener('click', () => {
      if (statusBased.classList.contains('onscreen-center')) {
        taskManager.loadFilteredStatus('all');
      } else {
          taskManager.loadFilteredDaily('all');
      }
    });
    completed.addEventListener('click', () => {
      if (statusBased.classList.contains('onscreen-center')) {
        taskManager.loadFilteredStatus('completed');
      } else {
          taskManager.loadFilteredDaily('completed');
      }
    });
    inProgress.addEventListener('click', () => {
      if (statusBased.classList.contains('onscreen-center')) {
        taskManager.loadFilteredStatus('in-progress');
      } else {
          taskManager.loadFilteredDaily('in-progress');
      }
    });
    onHold.addEventListener('click', () => {
      if (statusBased.classList.contains('onscreen-center')) {
        taskManager.loadFilteredStatus('on-hold');
      } else {
          taskManager.loadFilteredDaily('on-hold');
      }
    });
    review.addEventListener('click', () => {
      if (statusBased.classList.contains('onscreen-center')) {
        taskManager.loadFilteredStatus('review');
      } else {
          taskManager.loadFilteredDaily('review');
      }
    });

  // ------------ Filter button ------------- //

  addCheckFilter.addEventListener('click', ()=> {
    filterContainer.classList.toggle('hidden');
    onHold.classList.add('hidden');
    review.classList.add('hidden');
  });

  addStatusFiler.addEventListener('click', ()=> {
    filterContainer.classList.toggle('hidden');
    onHold.classList.remove('hidden');
    review.classList.remove('hidden');

  });

  // ------------ Add buttons ------------- //

  addButtonCheck.addEventListener('click', ()=> {
    const setupCont = document.querySelector('.setup');
    if (setupCont) {
      const cont = document.querySelector('main');
      cont.removeChild(setupCont);
    } 
    const setup = new Setup('check', taskManager); 
  });
  addButtonStatus.addEventListener('click', ()=> {
    const setupCont = document.querySelector('.setup');
    if (setupCont) {
      const cont = document.querySelector('main');
      cont.removeChild(setupCont);
    }
    const setup = new Setup('status', taskManager); 
  })
  addButtonNotes.addEventListener('click', ()=> {
    const setupCont = document.querySelector('.setup');
    if (setupCont) {
      const cont = document.querySelector('main');
      cont.removeChild(setupCont);
    }
    const setup = new Setup('note', taskManager);
  })

  // ------------ Nav buttons ------------- //

  nav1.addEventListener('click', (e)=> {
     e.preventDefault();
     const filterContainer = document.querySelector('.filter-by');

        const setupCont = document.querySelector('.setup');
        if (setupCont) {
          const cont = document.querySelector('main');
          cont.removeChild(setupCont);
        } 
        if (!filterContainer.classList.contains('hidden')) {
          filterContainer.classList.add('hidden');
        }

     nav1.classList.add('underline');
     nav2.classList.remove('underline');
     nav3.classList.remove('underline');

     daily.classList.remove('ofscreen-left');
     daily.classList.remove('ofscreen-right');
     daily.classList.add('onscreen-center');

     statusBased.classList.remove('onscreen-center');
     statusBased.classList.remove('ofscreen-left');
     statusBased.classList.add('ofscreen-right');

     notes.classList.remove('ofscreen-right');
     notes.classList.remove('onscreen-center');
     notes.classList.add('ofscreen-left');
  });

  nav2.addEventListener('click', (e)=> {
     e.preventDefault();
     const filterContainer = document.querySelector('.filter-by');

      const setupCont = document.querySelector('.setup');
        if (setupCont) {
          const cont = document.querySelector('main');
          cont.removeChild(setupCont);
        } 
        if (!filterContainer.classList.contains('hidden')) {
          filterContainer.classList.add('hidden');
        }

     nav1.classList.remove('underline');
     nav2.classList.add('underline');
     nav3.classList.remove('underline');

     daily.classList.add('ofscreen-left');
     daily.classList.remove('ofscreen-right');
     daily.classList.remove('onscreen-center');

     statusBased.classList.add('onscreen-center');
     statusBased.classList.remove('ofscreen-left');
     statusBased.classList.remove('ofscreen-right');

     notes.classList.add('ofscreen-right');
     notes.classList.remove('onscreen-center');
     notes.classList.remove('ofscreen-left');
  });

  nav3.addEventListener('click', (e)=> {
     e.preventDefault();
     const filterContainer = document.querySelector('.filter-by');

      const setupCont = document.querySelector('.setup');
        if (setupCont) {
          const cont = document.querySelector('main');
          cont.removeChild(setupCont);
        }
        if (!filterContainer.classList.contains('hidden')) {
          filterContainer.classList.add('hidden');
        }

     nav1.classList.remove('underline'); 
     nav2.classList.remove('underline');
     nav3.classList.add('underline');

     daily.classList.remove('ofscreen-left');
     daily.classList.add('ofscreen-right');
     daily.classList.remove('onscreen-center');

     statusBased.classList.remove('onscreen-center');
     statusBased.classList.add('ofscreen-left');
     statusBased.classList.remove('ofscreen-right');

     notes.classList.remove('ofscreen-right');
     notes.classList.add('onscreen-center');
     notes.classList.remove('ofscreen-left');
  });

})
class Setup {
  constructor(type, manager) {
    this.type = type;
    this.manager = manager;
    this.main = document.querySelector('main');

    this.container = document.createElement('div');
    this.container.classList.add('setup');

    this.createElements();
    this.closeIcon.appendChild(this.path);
    this.container.appendChild(this.closeIcon);

    if (type === 'check') this.addDailyTask();
    else if (type === 'status') this.addStatusTask();
    else this.addNote();

    this.container.appendChild(this.button);
    this.main.appendChild(this.container);
    this.init();
  }

  createElements() {
    this.button = document.createElement('button');
    this.button.classList.add('add-button');

    this.closeIcon = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    this.closeIcon.classList.add('close-setup');
    this.closeIcon.setAttribute('height', '30px');
    this.closeIcon.setAttribute('width', '30px');
    this.closeIcon.setAttribute('viewBox', "16 16 518 1020");

    this.path = document.createElementNS("http://www.w3.org/2000/svg",'path');
    this.path.setAttribute('d', "M400 145.49L366.51 112L256 222.51L145.49 112L112 145.49L222.51 256L112 366.51L145.49 400L256 289.49L366.51 400L400 366.51L289.49 256L400 145.49z");

    this.textAreaWrapper = document.createElement('div');
    this.textAreaWrapper.classList.add('setup-textarea');
    this.textArea = document.createElement('textarea');
    this.textArea.classList.add('description');

    this.textAreaWrapper.appendChild(this.textArea);
  }

  init() {
    this.closeIcon.addEventListener('click', ()=> {
      this.main.removeChild(this.container);
    })
    this.button.addEventListener('click', ()=> {
      if (this.type === 'check') new dailyTask(this.textArea.value, undefined, "in-progress", 0, this.manager);
      else if (this.type === 'status') new statusTask(this.textArea.value, 'in-progress', undefined, this.manager);
      else new Note(this.textArea.value, undefined, this.manager);

      this.textArea.value = "";
    });
  }

  addDailyTask() {
    const h3 = document.createElement('h3');
    h3.textContent = "Adding a daily task";
    this.container.appendChild(h3);
    this.container.appendChild(this.textAreaWrapper);
  }

  addStatusTask() {
    const h3 = document.createElement('h3');
    h3.textContent = "Adding a status task";
    this.container.appendChild(h3);
    this.container.appendChild(this.textAreaWrapper);
  }

  addNote() {
    const h3 = document.createElement('h3');
    h3.textContent = "Adding a note";
    this.container.appendChild(h3);
    this.container.appendChild(this.textAreaWrapper);
  }
}

class TaskManager {
  constructor() {
    this.dailyList = [];
    this.statusList = [];
    this.notesList = [];

    console.log(this.notesList);
    console.log(this.statusList);
    console.log(this.dailyList);
  }

  dailyTask(task) {
    this.dailyList.push(task);
    this.storeToLocalStorage('dailyList');
  }

  statusTask(task) {
    this.statusList.push(task);
    this.storeToLocalStorage('statusList');
  }

  note(task) {
    this.notesList.push(task);
    this.storeToLocalStorage('notesList');
  }

  storeToLocalStorage(listName) {
    localStorage.setItem(listName, JSON.stringify(this[listName]));
  }

  loadFromLocalStorage() {
    const savedDaily = JSON.parse(localStorage.getItem('dailyList') || "[]");
    const savedStatus = JSON.parse(localStorage.getItem('statusList') || "[]");
    const savedNotes = JSON.parse(localStorage.getItem('notesList') || "[]");

    savedDaily.forEach(obj => new dailyTask(obj.description, obj.id, obj.status, obj.streak, this, true));
    savedStatus.forEach(obj => new statusTask(obj.description, obj.status, obj.id, this, true));
    savedNotes.forEach(obj => new Note(obj.description, obj.id, this, true));
  }

  loadFilteredDaily(value) {
    const checkList = document.querySelector('.check-list');
    while (checkList.firstChild) {
      checkList.removeChild(checkList.firstChild);
    }

    const savedDaily = JSON.parse(localStorage.getItem('dailyList') || "[]");
    let toRender = [];

    if (value === 'all') {
      toRender = savedDaily;
    } else {
      toRender = savedDaily.filter(t => t.status === value);
    }

    toRender.forEach(task => new dailyTask(task.description, task.id, task.status, task.streak, this, true));
    return toRender;
  }

  loadFilteredStatus(value) {
    const statusList = document.querySelector('.status-list');
    while (statusList.firstChild) {
      statusList.removeChild(statusList.firstChild);
    }

    const savedStatus = JSON.parse(localStorage.getItem('statusList') || "[]");
    let toRender = [];

    if (value === 'all') {
      toRender = savedStatus;
    } else {
      toRender = savedStatus.filter(t => t.status === value);
    }

    toRender.forEach(task => new statusTask(task.description, task.status, task.id, this, true));
    return toRender;
  }
}

class dailyTask {
  constructor(description='none', id=Date.now(), status="in-progress", streak=0, manager, fromStorage=false) {
    this.manager = manager;
    this.id = id;
    this.description = description;
    this.status = status;
    this.streak = streak;

    this.checkList = document.querySelector('.check-list');

    this.task = document.createElement('div');
    this.task.classList.add('daily-task');

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.classList.add('checkbox')

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.value = description;

    this.deleteIcon = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    this.deleteIcon.classList.add('delete-icon');
    this.deleteIcon.setAttribute('fill', primaryColor);
    this.deleteIcon.setAttribute('viewBox', "0 0 19 25");
    this.deleteIcon.setAttribute('height', '25px');
    this.deleteIcon.setAttribute('width', '25px');
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute('d', "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z");
    this.deleteIcon.appendChild(path);

     if (!fromStorage && manager) this.addToManager();
      this.render();
      this.init();
  }

  toJSON() {
    return {id:this.id,description:this.description,status:this.status,streak:this.streak};
  }

  addToManager() {
    if(this.manager) this.manager.dailyTask(this.toJSON());
  }
  render() {
    this.task.appendChild(this.checkbox);
    this.task.appendChild(document.createTextNode(`${this.streak}`));
    this.task.appendChild(this.textarea);
    this.task.appendChild(this.deleteIcon);
    this.checkList.appendChild(this.task);
    this.checkbox.checked = this.status === "completed";
    this.task.classList.toggle('completed', this.status === "completed");
  }

  init() {
    this.checkbox.addEventListener('change', ()=> {
      this.status = this.checkbox.checked ? "completed" : "in-progress";

      this.task.classList.toggle('completed', this.checkbox.checked);
      if(this.manager) {
        const idx = this.manager.dailyList.findIndex(t=>t.id===this.id);
        if(idx!==-1) this.manager.dailyList[idx].status = this.status;
        this.manager.storeToLocalStorage('dailyList');
      }
    });

    this.textarea.addEventListener('change', () => {
    this.description = this.textarea.value;
    if(this.manager) {
        const idx = this.manager.dailyList.findIndex(t => t.id === this.id);
        if(idx !== -1) this.manager.dailyList[idx].description = this.description;
        this.manager.storeToLocalStorage('dailyList');
    }
});

    this.deleteIcon.addEventListener('click', ()=> {
      this.checkList.removeChild(this.task);
      if(this.manager) {
        this.manager.dailyList = this.manager.dailyList.filter(t=>t.id!==this.id);
        this.manager.storeToLocalStorage('dailyList');
      }
    });
  }
}

class statusTask {
  constructor(description='none', status='in-progress', id=Date.now(), manager, fromStorage=false) {
    this.manager = manager;
    this.id = id;
    this.description = description;
    this.status = status;

    this.statusList = document.querySelector('.status-list');

    this.task = document.createElement('div');
    this.task.classList.add('status-task');

    this.progress = document.createElement('input');
    this.progress.setAttribute('readonly','');
    this.progress.classList.add('status');
    this.progress.value = status;

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.value = description;

    this.deleteIcon = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    this.deleteIcon.classList.add('delete-icon');
    this.deleteIcon.setAttribute('fill', primaryColor);
    this.deleteIcon.setAttribute('viewBox', "0 0 19 25");
    this.deleteIcon.setAttribute('height', '25px');
    this.deleteIcon.setAttribute('width', '25px');
    const path = document.createElementNS("http://www.w3.org/2000/svg",'path');
    path.setAttribute('d', "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z");
    this.deleteIcon.appendChild(path);

     if (!fromStorage && manager) this.addToManager();
      this.render();
      this.init();
  }

  toJSON() {
    return {id:this.id,description:this.description,status:this.status};
  }

  addToManager() {
    if(this.manager) { 
      this.manager.statusTask(this.toJSON())};
  }

  render() {
    this.task.appendChild(this.progress);
    this.task.appendChild(this.textarea);
    this.task.appendChild(this.deleteIcon);
    this.statusList.appendChild(this.task);
  }

  init() {
    this.textarea.addEventListener('change', () => {
    this.description = this.textarea.value;
    if(this.manager) {
        const idx = this.manager.statusList.findIndex(t => t.id === this.id);
        if(idx !== -1) this.manager.statusList[idx].description = this.description;
        this.manager.storeToLocalStorage('statusList');
    }
    });
    this.deleteIcon.addEventListener('click', ()=>{
      this.statusList.removeChild(this.task);
      if(this.manager) {
        this.manager.statusList = this.manager.statusList.filter(t=>t.id!==this.id);
        this.manager.storeToLocalStorage('statusList');
      }
    });

    this.progress.addEventListener('click', ()=>{
      const statuses = ['completed', 'in-progress', 'on-hold', 'review'];
      const currentIndex = statuses.indexOf(this.status);
      const nextIndex = (currentIndex + 1) % statuses.length;
      this.status = statuses[nextIndex];
      this.progress.value = this.status;
      if(this.manager) {
        const idx = this.manager.statusList.findIndex(t=>t.id===this.id);
        if(idx!==-1) this.manager.statusList[idx].status = this.status;
        this.manager.storeToLocalStorage('statusList');
      }
    });

    this.textarea.addEventListener('change', ()=>{ this.description = this.textarea.value; });
  }
}

class Note {
  constructor(description='none', id=Date.now(), manager, fromStorage=false) {
    this.manager = manager;
    this.id = id;
    this.description = description;

    this.notesList = document.querySelector('.notes-list');
    this.task = document.createElement('div');
    this.task.classList.add('note');

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.value = description;

    this.deleteIcon = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    this.deleteIcon.classList.add('delete-icon');
    this.deleteIcon.setAttribute('fill', primaryColor);
    this.deleteIcon.setAttribute('viewBox', "0 0 19 25");
    this.deleteIcon.setAttribute('height', '25px');
    this.deleteIcon.setAttribute('width', '25px');
    const path = document.createElementNS("http://www.w3.org/2000/svg",'path');
    path.setAttribute('d', "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z");
    this.deleteIcon.appendChild(path);
    if (!fromStorage && manager) this.addToManager();
        this.render();
        this.init();
    }

  toJSON() {
    return {id:this.id,description:this.description};
  }

  addToManager() {
    if(this.manager) this.manager.note(this.toJSON());
  }

  render() {
    this.task.appendChild(this.textarea);
    this.task.appendChild(this.deleteIcon);
    this.notesList.appendChild(this.task);
  }

  init() {
    this.textarea.addEventListener('change', () => {
    this.description = this.textarea.value;
    if(this.manager) {
        const idx = this.manager.notesList.findIndex(t => t.id === this.id);
        if(idx !== -1) this.manager.notesList[idx].description = this.description;
        this.manager.storeToLocalStorage('notesList');
    }
    });
    this.deleteIcon.addEventListener('click', ()=>{
      this.notesList.removeChild(this.task);
      if(this.manager) {
        this.manager.notesList = this.manager.notesList.filter(t=>t.id!==this.id);
        this.manager.storeToLocalStorage('notesList');
      }
    });
  }
}