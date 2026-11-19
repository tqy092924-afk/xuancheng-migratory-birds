/* Film chapter navigation and photo filtering; native media and quiz feedback live in main.js. */
(() => {
  'use strict';
  if (document.documentElement.dataset.chaptersReady) return;
  document.documentElement.dataset.chaptersReady = 'true';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const film = $('#wetland-film');
  if (film) {
    const chapters = $$('.film-chapter');
    let pendingSeek = null;
    const updateFilm = () => {
      const current = film.currentTime || 0;
      const active = chapters.reduce((found, item) => current >= Number(item.dataset.videoTime) ? item : found, chapters[0]);
      chapters.forEach(item => item.setAttribute('aria-current', String(item === active)));
    };
    const seekPending = (force = false) => {
      if (pendingSeek === null || film.readyState < 1 || (film.seeking && !force)) return;
      const target = Math.min(pendingSeek, film.duration || pendingSeek);
      // Keep the request until seeked confirms it; metadata alone does not mean the target is available.
      try { film.currentTime = target; } catch (_) { /* Retry when more media data is available. */ }
    };
    ['loadedmetadata', 'progress', 'canplay'].forEach(event => film.addEventListener(event, () => {
      seekPending();
      updateFilm();
    }));
    film.addEventListener('seeked', () => {
      if (pendingSeek !== null && Math.abs(film.currentTime - Math.min(pendingSeek, film.duration || pendingSeek)) < .5) pendingSeek = null;
    });
    ['timeupdate', 'seeked', 'ended', 'durationchange'].forEach(event => film.addEventListener(event, updateFilm));
    $$('[data-video-time]', $('#visuals')).forEach(button => button.addEventListener('click', () => {
      pendingSeek = Number(button.dataset.videoTime);
      if (film.readyState >= 1) seekPending(true);
      else { film.preload = 'auto'; film.load(); }
      film.play().catch(() => { /* The native video controls remain available. */ });
      updateFilm();
    }));
    updateFilm();
  }

  const gallery = $('#wetland-gallery');
  if (gallery) {
    const filters = $$('[data-gallery-filter]', $('#visuals'));
    const figures = $$('.gallery-item', gallery);
    filters.forEach(button => button.addEventListener('click', () => {
      const category = button.dataset.galleryFilter;
      filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      figures.forEach(item => { item.hidden = category !== 'all' && item.dataset.galleryCategory !== category; });
      gallery.classList.toggle('is-filtered', category !== 'all');
      const count = figures.filter(item => !item.hidden).length;
      $('.gallery-count').textContent = count + ' 张照片';
    }));
  }

})();
