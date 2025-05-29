const sidebar = document.getElementById('sidebar');
const toggleIcon = document.getElementById('toggleMenuIcon');
const toggleButtons = document.querySelectorAll('.toggle-btn');

// Toggle sidebar open/close
toggleIcon.addEventListener('click', () => {
  sidebar.classList.toggle('closed');
  sidebar.classList.toggle('open');

  const icon = toggleIcon.querySelector('i');
  if (sidebar.classList.contains('closed')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-chevron-right');
  } else {
    icon.classList.remove('fa-chevron-right');
    icon.classList.add('fa-bars');
  }
});

// Toggle submenus
toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const submenu = document.getElementById(targetId);
    const icon = button.querySelector('i');

    submenu.classList.toggle('open');

    if (submenu.classList.contains('open')) {
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
      icon.classList.add('rotate');
    } else {
      submenu.style.maxHeight = null;
      icon.classList.remove('rotate');
    }
  });
});
