import { describe, expect, it } from 'vitest';
import { parseHash } from './router';
import { createProgressStore } from './storage';
import { sessions } from '../content/sessions';

const ids = ['launchlab'];

describe('hash routes', () => {
  it('parses known routes', () => {
    expect(parseHash('', ids)).toEqual({ name: 'home', section: 'top' });
    expect(parseHash('#home', ids)).toEqual({ name: 'home', section: 'top' });
    expect(parseHash('#sessions', ids)).toEqual({ name: 'home', section: 'sessions' });
    expect(parseHash('#about', ids)).toEqual({ name: 'home', section: 'about' });
    expect(parseHash('#session/launchlab', ids)).toEqual({ name: 'session', id: 'launchlab' });
    expect(parseHash('#/session/LaunchLab/', ids)).toEqual({ name: 'session', id: 'launchlab' });
  });

  it('treats unknown sessions as not found', () => {
    expect(parseHash('#session/unknown', ids).name).toBe('notFound');
    expect(parseHash('#something-else', ids).name).toBe('notFound');
  });
});

describe('session content', () => {
  it('has unique ids and orders, and no guessed date', () => {
    expect(new Set(sessions.map((s) => s.id)).size).toBe(sessions.length);
    expect(new Set(sessions.map((s) => s.order)).size).toBe(sessions.length);
    const launchLab = sessions.find((s) => s.id === 'launchlab')!;
    expect(launchLab.date).toBeNull();
    expect(launchLab.speakers.map((s) => s.name)).toEqual(['Yibo Yang', 'Rishabh Modi', 'Nirvan Anand']);
    expect(launchLab.speakers[2].image).toBeNull();
    for (const speaker of sessions.flatMap((s) => s.speakers)) {
      if (speaker.linkedin) expect(speaker.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/);
    }
  });
});

describe('progress storage', () => {
  it('survives storage that throws, and discards corrupted data', () => {
    const throwing = createProgressStore(() => ({
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    }));
    throwing.forgetMemory();
    expect(throwing.load('k')).toBeNull();
    expect(throwing.save('k', { a: 1 })).toBe(false);
    expect(throwing.load('k')).toEqual({ a: 1 });

    const data = new Map<string, string>([['bad', '{not json']]);
    const store = createProgressStore(() => ({
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => void data.set(key, value),
      removeItem: (key) => void data.delete(key),
    }));
    store.forgetMemory();
    expect(store.load('bad')).toBeNull();
    expect(data.has('bad')).toBe(false);
    store.save('other', 1);
    store.clear('bad');
    expect(data.get('other')).toBe('1');
  });
});
