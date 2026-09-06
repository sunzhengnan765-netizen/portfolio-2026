import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

test('Nyro-style home exposes portfolio routes and interaction hooks', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const id of ['home', 'works', 'projects', 'contact', 'p4', 'p23', 'p37']) {
    assert.match(html, new RegExp(`id=["']${id}["']|href=["']#${id}["']`));
  }
  assert.match(html, /data-home-menu/);
  assert.match(html, /data-hero-word/);
  assert.match(html, /IntersectionObserver/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /<video class="side-demo"[\s\S]*autoplay loop muted/);
});
