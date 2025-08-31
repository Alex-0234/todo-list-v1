
let primaryColor = null;
let secondaryColor = null;
let bgColor = null;
let textColor = null;

document.addEventListener('DOMContentLoaded', ()=> {
  console.log('Inicialized');


  primaryColor = getComputedStyle(document.body).getPropertyValue("--primary-color");
  secondaryColor = getComputedStyle(document.body).getPropertyValue("--secondary-color");
  bgColor = getComputedStyle(document.body).getPropertyValue("--bg-color");
  textColor = getComputedStyle(document.body).getPropertyValue("--text-color");


  const sectionButton = document.querySelector('.addButton');

  sectionButton.addEventListener('click', ()=> {
    const setup = new Setup();
  })

})
class Setup {
  constructor() {
    this.container = document.querySelector('.addTask');

    this.setup = document.createElement('div');
    this.setup.classList.add('setup');

    this.firstRow = document.createElement('div');
    this.firstRow.classList.add('setup-row1');

    this.nameLabel = document.createElement('label');
    this.nameLabel.innerHTML = "Name your task:";

    this.nameInput = document.createElement('input');
    this.nameInput.setAttribute('type', 'text');
    this.nameInput.classList.add('task-name');

    this.textareaWrapper = document.createElement('div');
    this.textareaWrapper.classList.add('setup-textarea');

    this.textareaLabel = document.createElement('label');
    this.textareaLabel.innerHTML = "Describe your task:";

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('description');

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
        this.container.removeChild(this.setup);
      });
      this.button.addEventListener('click', ()=> {
        const task = new Task(this.nameInput.value, this.textarea.value);
        this.nameInput.value = "";
        this.textarea.value = "";
      })
    }
    appendAll() {

        this.firstRow.appendChild(this.nameLabel);
        this.firstRow.appendChild(this.nameInput);
        this.textareaWrapper.appendChild(this.textareaLabel);
        this.textareaWrapper.appendChild(this.textarea);
        this.addButtonArea.appendChild(this.button);
        this.setup.appendChild(this.firstRow);
        this.setup.appendChild(this.textareaWrapper);
        this.setup.appendChild(this.addButtonArea);
        this.closeIcon.appendChild(this.path);
        this.setup.appendChild(this.closeIcon); 
        this.container.appendChild(this.setup);
    }
  
};


class Task {

  static counter = 0;

  constructor(name, description) {

    this.taskList = document.querySelector('.taskList');

    this.id = ++Task.counter;
    this.name = name;
    this.description = description;

    this.task = document.createElement('div');
    this.task.classList.add('task-closed');

    this.smallWrapper = document.createElement('div');
    this.smallWrapper.classList.add('small-wrapper');
    this.smallWrapper.classList.add('center');

    this.openTaskButton = document.createElement('button');
    this.openTaskButton.classList.add('task-open-button');
    this.openTaskButton.textContent = "See description";

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.classList.add('checkbox');

    this.num = document.createElement('input');
    this.num.setAttribute('readonly', '');
    this.num.classList.add('num');
    this.num.value = `${this.id}.`;

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.value = this.description;
    this.textarea.classList.add('hidden');

    this.deleteIcon = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    this.deleteIcon.classList.add('delete-icon');
    this.deleteIcon.setAttribute('fill', `${primaryColor}`);
    this.deleteIcon.setAttribute('viewBox', "0 0 24 24");
    this.deleteIcon.setAttribute('height', '20px');
    this.deleteIcon.setAttribute('width', '20px');
    this.deleteIcon.innerHTML = `<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>`; 


    this.smallWrapper.appendChild(this.checkbox);
    this.smallWrapper.appendChild(this.openTaskButton);
    this.smallWrapper.appendChild(this.num);
    this.task.appendChild(this.smallWrapper);
    this.task.appendChild(document.createTextNode(name));
    this.task.appendChild(this.textarea);
    this.task.appendChild(this.deleteIcon);

    this.init();
    this.addTask(this.taskList);
  }
  init() {
    this.openTaskButton.addEventListener('click', ()=> {
      this.task.classList.toggle('task-closed');
      this.task.classList.toggle('task-open');
      if (this.task.classList.contains('task-closed')) {
        this.textarea.classList.add('hidden');
      } else {
        this.textarea.classList.remove('hidden');
      }
    })
    this.deleteIcon.addEventListener('click', ()=> {
       this.uSureOption(this.taskList);
    })
  }
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
      this.updateTaskNumbers();
      this.removeTask(parent);
      
    })
    this.unsure.addEventListener('click', ()=> {
      this.task.removeChild(this.window);
    })
  }
  
  addTask(parent) {
    parent.appendChild(this.task);
  }
  removeTask(parent) {
    parent.removeChild(this.task);
  }

  toggleCompleted() {
    this.task.classList.toggle('completed');
    this.checkbox.checked = !this.checkbox.checked;
  }
}
