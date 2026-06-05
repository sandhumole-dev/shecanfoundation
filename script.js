// Sticky nav
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    function checkReveal() {
      reveals.forEach(function (el) {
        var top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
          el.classList.add('visible');
        }
      });
    }
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);

    // Form submit
    function submitForm() {
      var name  = document.getElementById('f-name').value.trim();
      var email = document.getElementById('f-email').value.trim();
      var msg   = document.getElementById('f-msg').value.trim();
      var success = document.getElementById('form-success');

      if (!name || !email || !msg) {
        alert('Please fill in all fields before sending.');
        return;
      }
      success.style.display = 'block';
      document.getElementById('f-name').value  = '';
      document.getElementById('f-email').value = '';
      document.getElementById('f-msg').value   = '';
    }

    // Stat counter animation
    function animateCounters() {
      var counters = document.querySelectorAll('.stat-num');
      counters.forEach(function (el) {
        var target = el.textContent;
        var num    = parseFloat(target.replace(/[^0-9.]/g, ''));
        var suffix = target.replace(/[0-9.]/g, '');
        var start  = 0;
        var duration = 1500;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var current  = Math.floor(progress * num);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }

    // Trigger counter when stats section is visible
    var statsSection  = document.getElementById('stats');
    var counterFired  = false;
    window.addEventListener('scroll', function () {
      if (!counterFired) {
        var rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          counterFired = true;
          animateCounters();
        }
      }
    });