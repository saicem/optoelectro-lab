type Task = { render: () => void; priority: number };

const queue: Task[] = [];
let scheduled = false;

function flush() {
  scheduled = false;
  queue.sort((a, b) => b.priority - a.priority);
  const deadline = performance.now() + 15;
  while (queue.length > 0 && performance.now() < deadline) {
    queue.shift()!.render();
  }
  if (queue.length > 0) {
    schedule();
  }
}

function schedule() {
  scheduled = true;
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(flush, { timeout: 30 });
  } else {
    requestAnimationFrame(() => setTimeout(flush, 0));
  }
}

export function scheduleKaTeX(render: () => void, priority = 0) {
  queue.push({ render, priority });
  if (!scheduled) schedule();
}
