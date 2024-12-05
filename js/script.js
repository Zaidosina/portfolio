const skills = {
    data: [
      { name: 'html', level: 80 },
      { name: 'css', level: 100 },
      { name: 'python', level: 10 },
      { name: 'c++', level: 55 }
    ],
  
    sortMode: null,
  
    generateList(parentElement) {
      parentElement.innerHTML = '';
      this.data.forEach(skill => {
        const skillItem = document.createElement('dt');
        skillItem.classList.add('skill-item');
        skillItem.style.backgroundImage = `url("../portfolio/img/skill-${skill.name}.svg")`;
        skillItem.textContent = skill.name;
  
        const skillLevel = document.createElement('dd');
        skillLevel.classList.add('skill-level');
  
        const skillBar = document.createElement('div');
        skillBar.style.width = `${skill.level}%`;
        skillBar.textContent = `${skill.level}%`;
  
        skillLevel.append(skillBar);
        parentElement.append(skillItem, skillLevel);
      });
    },
  
    sortList(type) {
      if (this.sortMode !== type) {
        this.data.sort(this.getComparer(type));
        console.log(`Отсортировали данные по ${type}`);
      } else {
        this.data.reverse();
        console.log(`Инвертировали порядок сортировки`);
      }
  
      this.sortMode = type;
    },
  
    getComparer(prop) {
      return function(a, b) {
        if (a[prop] < b[prop]) {
          return -1;
        }
        if (a[prop] > b[prop]) {
          return 1;
        }
        return 0;
      };
    }
  };
  
  const skillList = document.querySelector('dl.skill-list');
  const sortBtnsBlock = document.querySelector('.skills-button');
  const menu = {
    nav: null,
    btn: null,
  
    init(navSelector, btnSelector) {
      this.nav = document.querySelector(navSelector);
      this.btn = document.querySelector(btnSelector);
      this.close();
      this.btn.addEventListener('click', this.toggle.bind(this));
    },
  
    open() {
      this.nav.classList.remove('main-nav_closed');
      this.btn.classList.remove('main-menu-button-open');
      this.btn.classList.add('main-menu-button-close');
      this.btn.innerHTML = '<span class="visually-hidden"> Закрыть меню</span>';
    },
  
    close() {
      this.nav.classList.add('main-nav_closed');
      this.btn.classList.remove('main-menu-button-close');
      this.btn.classList.add('main-menu-button-open');
      this.btn.innerHTML = '<span class="visually-hidden"> Открыть меню</span>';
    },
  
    toggle() {
      if (this.nav.classList.contains('main-nav_closed')) {
        this.open();
      } else {
        this.close();
      }
    }
  };

  const themeCheckbox = document.querySelector('input[type="checkbox"]');
  const body = document.body;

  function saveTheme(theme) {
  localStorage.setItem('theme', theme);
  }

  function loadTheme() {
  return localStorage.getItem('theme');
  }
  
  themeCheckbox.addEventListener('change', function() {
    if (this.checked) {
      body.classList.remove('dark-theme');
      saveTheme('light');
    } else {
      body.classList.add('dark-theme');
      saveTheme('dark');
    }
  });
  
  window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = loadTheme();
    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      themeCheckbox.checked = false;
    } else {
      body.classList.remove('dark-theme');
      themeCheckbox.checked = true;
    }
  });

  menu.init('.main-nav', '.main-menu');
  sortBtnsBlock.addEventListener('click', handleButtonClick);
  
  function handleButtonClick(event) {
    if (event.target.nodeName === 'BUTTON') {
      skills.sortList(event.target.dataset.type);
      skills.generateList(skillList);
    }
  }
  
  skills.generateList(skillList);