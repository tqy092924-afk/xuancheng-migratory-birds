/* Section navigation and accessible interactions; no network dependencies. */
(() => {
  'use strict';
  const sections = [...document.querySelectorAll('.page-section')];
  const header = document.querySelector('#site-header');
  const menu = document.querySelector('#menu-toggle');
  const positions = new Map();
  let activeId = null, toastTimer;
  let chartScript;
  function loadCharts(section) {
    if (!section.dataset.chartScript || chartScript || window.initWetlandCharts) return;
    section.querySelector('.chart-retry')?.remove();
    chartScript = document.createElement('script');
    chartScript.src = section.dataset.chartScript;
    chartScript.onerror = () => {
      chartScript.remove();
      chartScript = null;
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.className = 'chart-retry';
      retry.textContent = '重新加载图表';
      retry.addEventListener('click', () => loadCharts(section));
      section.querySelector('#chart-observations').append(retry);
    };
    document.head.append(chartScript);
  }
  function closeMenu() {
    header.classList.remove('menu-open');
    menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','打开导航菜单');
  }
  function route(hash, focus = false) {
    let id;
    try { id = decodeURIComponent((hash || '#home').slice(1)); } catch { id = 'home'; }
    const target = document.getElementById(id);
    const section = target?.closest('.page-section') || sections[0];
    const changed = activeId !== section.id;
    if (activeId && changed) positions.set(activeId,window.scrollY);
    if (changed) document.querySelectorAll('audio, video').forEach(m => m.pause());
    sections.forEach(s => { s.hidden = s !== section; s.classList.toggle('is-active',s === section); });
    document.querySelectorAll('.nav-link').forEach(a => {
      const current = a.hash === '#' + section.id;
      a.classList.toggle('is-active',current);
      if (current) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    activeId = section.id;
    document.body.dataset.section = section.id;
    if (section.id === 'data') loadCharts(section);
    if (section.id === 'visuals') {
      const film = section.querySelector('video[data-poster]');
      if (film && !film.hasAttribute('poster')) film.poster = film.dataset.poster;
    }
    const heading = section.querySelector('h1, h2');
    document.title = (section.id === 'home' ? '万羽南归，宣城为驿' : heading?.textContent || '候鸟赴皖') + '｜候鸟赴皖';
    closeMenu();
    document.dispatchEvent(new CustomEvent('wetland:sectionchange',{detail:{id:section.id}}));
    if (target && target !== section) target.scrollIntoView({block:'start',behavior:'instant'});
    else if (changed) window.scrollTo({top:positions.get(section.id) || 0,behavior:'instant'});
    if (focus && heading) { heading.setAttribute('tabindex','-1'); heading.focus({preventScroll:true}); }
  }
  document.addEventListener('click',event => {
    const a = event.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#' || a.getAttribute('href') === '#main-content') return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!document.getElementById(a.hash.slice(1))) return;
    event.preventDefault();
    if (a.classList.contains('hero-start')) positions.delete('data');
    if (location.hash !== a.hash) history.pushState(null,'',a.hash);
    route(a.hash,true);
  });
  window.addEventListener('popstate',() => route(location.hash));
  window.addEventListener('hashchange',() => route(location.hash));
  menu.addEventListener('click',() => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    header.classList.toggle('menu-open',open);
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open ? '关闭导航菜单' : '打开导航菜单');
  });
  document.addEventListener('keydown',e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click',e => { if (!header.contains(e.target)) closeMenu(); });
  window.addEventListener('scroll',() => header.classList.toggle('is-scrolled',window.scrollY > 8),{passive:true});
  const stationControls = document.querySelectorAll('[data-station], [data-station-point]');
  stationControls.forEach(button => button.addEventListener('click',() => {
    const station = button.dataset.station || button.dataset.stationPoint;
    stationControls.forEach(b => {
      const current = (b.dataset.station || b.dataset.stationPoint) === station;
      b.classList.toggle('is-active',current); b.setAttribute('aria-pressed',String(current));
    });
    document.querySelectorAll('[data-leader]').forEach(line => line.classList.toggle('is-active',line.dataset.leader === station));
    document.querySelectorAll('.station-detail').forEach(s => { s.hidden = s.id !== 'station-' + station; });
  }));
  const birdDialog = document.querySelector('#bird-dialog');
  let birdTrigger;
  document.querySelectorAll('.bird-flip').forEach(button => button.addEventListener('click',() => {
    if (!birdDialog) return;
    birdTrigger = button;
    const front = button.querySelector('.bird-front');
    const back = button.querySelector('.bird-back');
    const image = birdDialog.querySelector('#bird-dialog-image');
    image.src = front.querySelector('img').src;
    image.alt = front.querySelector('img').alt;
    birdDialog.querySelector('#bird-dialog-title').textContent = front.querySelector('strong').textContent;
    const description = birdDialog.querySelector('#bird-dialog-description');
    description.replaceChildren();
    const paragraph = document.createElement('p');
    paragraph.textContent = back.querySelector(':scope > span').textContent;
    description.append(paragraph,back.querySelector('em').cloneNode(true));
    birdDialog.querySelector('#bird-dialog-credit').innerHTML = button.closest('.bird-entry').querySelector('.media-caption').innerHTML;
    button.setAttribute('aria-expanded','true');
    birdDialog.showModal();
    document.body.style.overflow = 'hidden';
  }));
  birdDialog?.addEventListener('close',() => {
    birdTrigger?.setAttribute('aria-expanded','false');
    birdTrigger?.focus({preventScroll:true});
    document.body.style.overflow = '';
  });
  function toast(message) {
    const el = document.querySelector('#toast');
    el.textContent = message; el.classList.add('is-visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('is-visible'),5000);
  }
  const media = [...document.querySelectorAll('audio, video')];
  media.forEach(item => {
    item.addEventListener('play',() => media.forEach(other => { if (other !== item) other.pause(); }));
    item.addEventListener('error',() => toast('媒体暂时无法播放，请确认整个网页文件夹已完整保留。'));
  });
  document.querySelectorAll('.quiz-card[data-answer]').forEach(card => {
    card.querySelectorAll('[data-option]').forEach(button => button.addEventListener('click',() => {
      const correct = button.dataset.option === card.dataset.answer;
      card.querySelectorAll('[data-option]').forEach(other => {
        other.classList.remove('is-correct','is-wrong'); other.setAttribute('aria-pressed',String(other === button));
      });
      button.classList.add(correct ? 'is-correct' : 'is-wrong');
      const feedback = card.querySelector('.quiz-feedback');
      feedback.classList.toggle('is-success',correct);
      feedback.textContent = (correct ? '答对了。' : '再看一看，答案是 ' + card.dataset.answer + '。') + feedback.dataset.explanation;
    }));
  });
  const dialog = document.querySelector('#image-dialog');
  document.querySelectorAll('.image-open').forEach(button => button.addEventListener('click',() => {
    const img = document.querySelector('#dialog-image');
    img.src = button.dataset.image; img.alt = button.dataset.caption;
    document.querySelector('#image-caption').textContent = button.dataset.caption;
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }));
  dialog.querySelector('.dialog-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close',() => { document.body.style.overflow = ''; });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  route(location.hash);
})();
