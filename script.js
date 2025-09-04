let dailyTasks = [];
let statusTasks = [];
let allNotes = [];

let primaryColor = null;
let secondaryColor = null;
let bgColor = null;
let textColor = null;

function loadAll() {
  const ONE_DAY = 24*60*60*1000;

    const dailyRaw = JSON.parse(localStorage.getItem("dailyTasks") || "[]");
    dailyTasks = dailyRaw.map(obj => new Task(
      obj.name,
      obj.description,
      obj.type,
      obj.id,
      obj.status,
      obj.streak
    ));
    dailyTasks.forEach(obj => {
      if (Date.now() - obj.id > ONE_DAY && this.status === "completed") {
        obj.status = "in-progress";
        obj.streak++;
    }
    });
    const statusRaw = JSON.parse(localStorage.getItem("statusTasks") || "[]");
    statusTasks = statusRaw.map(obj => new Task(
      obj.name,
      obj.description,
      obj.type,
      obj.id,
      obj.status
    ));
    const notesRaw = JSON.parse(localStorage.getItem("Notes") || "[]");
    allNotes = notesRaw.map(obj => new Task(
      obj.name,
      obj.description,
      obj.type,
      obj.id,
      obj.status
    ));
}

document.addEventListener('DOMContentLoaded', ()=> {
  console.log('Inicialized');
  history.replaceState(null, '', 'index.html');

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

  const setupCont = document.querySelector('.setup');

  loadAll();

  addButtonCheck.addEventListener('click', ()=> {
    if (setupCont) {
      const cont = document.querySelector('main');
      cont.removeChild(setupCont)
    } 
    const setup = new Setup('check'); 
  })
  addButtonStatus.addEventListener('click', ()=> {
    if (setupCont) {
      const cont = document.querySelector('main');
      cont.removeChild(setupCont)
    }
    const setup = new Setup('status'); 
  })
  addButtonNotes.addEventListener('click', ()=> {
    if (setupCont) {
      const cont = document.querySelector('main');
      cont.removeChild(setupCont)
    }
    const task = new Task('note');
  })

  nav1.addEventListener('click', (e)=> {
     e.preventDefault();

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
  constructor(type) {
    this.type = type;
    this.container = document.querySelector('main');
  
    this.setupWindow = document.createElement('div');
    this.setupWindow.classList.add('setup');

    this.textareaWrapper = document.createElement('div');
    this.textareaWrapper.classList.add('setup-textarea');
    this.textareaLabel = document.createElement('label');
    this.textareaLabel.innerHTML = "Describe your task:";
    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('description');

    this.nameInputWrapper = document.createElement('div');
    this.nameInputWrapper.classList.add('name-input-wrapper');
    this.nameLabel = document.createElement('label');
    this.nameLabel.innerHTML = "Name your task:";
    this.nameInput = document.createElement('input');
    this.nameInput.setAttribute('type', 'text');
    this.nameInput.classList.add('task-name');

    this.addButtonArea = document.createElement('div');
    this.addButtonArea.classList.add('add-button-area');

    this.button = document.createElement('button');
    this.button.classList.add('add-button');
    this.button.textContent = 'Add Task';

    this.closeIcon = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    this.closeIcon.classList.add('close-setup');
    this.closeIcon.setAttribute('fill', `${primaryColor}`);
    this.closeIcon.setAttribute('height', '30px');
    this.closeIcon.setAttribute('width', '30px');
    this.closeIcon.setAttribute('viewBox', '16 16 518 1020');
    
    this.path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    this.path.setAttribute('d', 'M400 145.49L366.51 112L256 222.51L145.49 112L112 145.49L222.51 256L112 366.51L145.49 400L256 289.49L366.51 400L400 366.51L289.49 256L400 145.49z')
    this.path.setAttribute('fill', `${primaryColor}`);

    this.init();
    this.appendAll();
  }
    init() {
      this.closeIcon.addEventListener('click', ()=> {
        this.container.removeChild(this.setupWindow);
      });
      this.button.addEventListener('click', ()=> {
        if (this.type === 'check') {
          const task = new Task(this.nameInput.value, this.textarea.value, 'check');
        } else if (this.type === 'status') {
          const task = new Task(this.nameInput.value, this.textarea.value, 'status');
        } 
        this.nameInput.value = "";
        this.textarea.value = "";
      })
    }
    appendAll() {
        this.textareaWrapper.appendChild(this.textareaLabel);
        this.textareaWrapper.appendChild(this.textarea);
        this.nameInputWrapper.appendChild(this.nameLabel);
        this.nameInputWrapper.appendChild(this.nameInput);
        this.addButtonArea.appendChild(this.button);
        this.setupWindow.appendChild(this.nameInputWrapper);
        this.setupWindow.appendChild(this.textareaWrapper);
        this.setupWindow.appendChild(this.addButtonArea);
        this.closeIcon.appendChild(this.path);
        this.setupWindow.appendChild(this.closeIcon); 
        this.container.appendChild(this.setupWindow);  
    }
};

class Task {

  static counter = 0;

  constructor(name = 'empty', description = 'empty', type, id = Date.now(), status = "in-progress", streak = 0) {

    this.checkList = document.querySelector('.check-list');
    this.statusList = document.querySelector('.status-list');
    this.notesList = document.querySelector('.notes-list');

    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.status = status;
    this.streak = streak;

    this.task = document.createElement('div');
    this.task.classList.add('task');

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.classList.add('checkbox');
 
    this.nameOutput = document.createElement('input');
    this.nameOutput.classList.add('name-output')
    this.nameOutput.setAttribute('readonly', '');
    this.nameOutput.value = `${name}`;

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.value = this.description;

    this.progress = document.createElement('input');
    this.progress.setAttribute('readonly', '');
    this.progress.classList.add('status');
    this.progress.value = `${this.status}`;

    this.deleteIcon = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    this.deleteIcon.classList.add('delete-icon');
    this.deleteIcon.setAttribute('fill', `${primaryColor}`);
    this.deleteIcon.setAttribute('viewBox', "0 0 24 24");
    this.deleteIcon.setAttribute('height', '20px');
    this.deleteIcon.setAttribute('width', '20px');
    this.deleteIcon.innerHTML = `<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>`; 

    this.init();
    this.addTask();
  }
   // ======================================================

  init() {

    this.deleteIcon.addEventListener('click', ()=> {
      switch(this.type) {
        case 'check':
          this.uSureOption(this.checkList);
          break;
        case 'status':
          this.uSureOption(this.statusList);
          break;
        case 'note':
          this.uSureOption(this.notesList);
          break;
      }
       
    })
    this.checkbox.addEventListener('change', ()=> {
      this.toggleCompleted();
    })
    this.progress.addEventListener('click', (e)=> {
      e.preventDefault();
      const toggle = new progressWindow(this.task);
    })

  }
   // ======================================================
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        status: this.status,
        type: this.type,
        streak: this.streak
      };
    }
  // ======================================================
   addCheckboxType() {
    
      this.task.appendChild(this.checkbox);
      this.task.appendChild(this.nameOutput);
      this.task.appendChild(document.createTextNode(`${this.streak}`));
      this.task.appendChild(this.textarea);
      this.task.appendChild(this.deleteIcon);
      this.checkList.appendChild(this.task);

      if (this.status === "completed") {
        this.checkbox.checked = true; 
      } else {
        this.checkbox.checked = false; 
}

      dailyTasks.push(this.toJSON());
      localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
   }
   // ======================================================
     addStatusType() {
      this.task.appendChild(this.progress);
      this.task.appendChild(this.textarea);
      this.task.appendChild(this.deleteIcon);
      this.statusList.appendChild(this.task);

      statusTasks.push(this.toJSON());
      localStorage.setItem("statusTasks", JSON.stringify(statusTasks));
   }
   // ======================================================
    addNotes() {
      this.task.appendChild(this.textarea);
      this.task.appendChild(this.deleteIcon);
      this.notesList.appendChild(this.task);

      allNotes.push(this.toJSON());
      localStorage.setItem("Notes", JSON.stringify(allNotes));

    }
  // ======================================================
  addTask() {
    if (this.type === "check") {
      this.addCheckboxType();
    
    } else if (this.type === "status") {
      this.addStatusType();

    } else {
      this.addNotes();
    }
    
  }
  // ======================================================
  uSureOption(parent) {
    
    this.window = document.createElement('div');
    this.window.classList.add('del-option');

    this.p = document.createElement('p');
    this.p.innerHTML = "Are you sure?";
    this.sure = document.createElement('button');
    this.sure.classList.add('choice');
    this.sure.innerHTML = "Sure";

    this.unsure = document.createElement('button');
    this.unsure.classList.add('choice');
    this.unsure.innerHTML = "Not sure";

    this.window.appendChild(this.p);
    this.window.appendChild(this.sure);
    this.window.appendChild(this.unsure);
    this.task.appendChild(this.window);

    this.sure.addEventListener('click', ()=> {
      this.task.removeChild(this.window);
      this.removeTask(parent);
      
    })
    this.unsure.addEventListener('click', ()=> {
      this.task.removeChild(this.window);
    })
  }
   // ======================================================
  removeTask(parent) {
  parent.removeChild(this.task);

  if (parent === this.checkList) {
    dailyTasks = dailyTasks.filter(task => task.id !== this.id);
    localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
  }
  else if (parent === this.statusList) {
    statusTasks = statusTasks.filter(task => task.id !== this.id);
    localStorage.setItem("statusTasks", JSON.stringify(statusTasks));
  }
  else {
    allNotes = allNotes.filter(task => task.id !== this.id);
    localStorage.setItem("Notes", JSON.stringify(allNotes));
  }

  }
  
   // ======================================================
  toggleCompleted() {
    this.task.classList.toggle('completed');
    this.status = this.task.classList.contains('completed') 
    ? "completed" 
    : "in-progress";
    dailyTasks = dailyTasks.map(task => 
      task.id === this.id ? this.toJSON() : task
    );
    localStorage.setItem("dailyTasks", JSON.stringify(dailyTasks));
  }
}
class progressWindow {
  constructor(task) {
    this.container = task;
    this.toggle(this.container);

  }
  toggle() {
  const statuses = ['finished', 'in-progress', 'on-hold', 'review' ];

  const currentIndex = statuses.indexOf(this.container.status);
  const nextIndex = (currentIndex + 1) % statuses.length; // loops back to start
  this.container.status = statuses[nextIndex];
  this.container.querySelector('.status').value = `${this.container.status}`;
}
}