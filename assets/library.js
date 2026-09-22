(() => {
  const input = document.querySelector('[data-library-search]');
  const entries = [...document.querySelectorAll('[data-library-entry]')];
  const count = document.querySelector('[data-library-count]');
  const empty = document.querySelector('[data-library-empty]');

  if (!input || !entries.length) return;

  const normalize = (value) => value
    .toLocaleLowerCase('en')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const update = () => {
    const terms = normalize(input.value).split(/\s+/).filter(Boolean);
    let visible = 0;

    entries.forEach((entry) => {
      const haystack = normalize(`${entry.dataset.search || ''} ${entry.textContent || ''}`);
      const matches = terms.every((term) => haystack.includes(term));
      entry.hidden = !matches;
      if (matches) visible += 1;
    });

    if (count) count.textContent = `${visible} ${visible === 1 ? 'work' : 'works'}`;
    if (empty) empty.hidden = visible !== 0;
  };

  input.addEventListener('input', update);
  update();
})();
