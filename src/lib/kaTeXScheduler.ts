const queue: Array<() => void> = [];
let scheduled = false;

function flush() {
  scheduled = false;
  const deadline = performance.now() + 5;
  while (queue.length > 0 && performance.now() < deadline) {
    queue.shift()!();
  }
  if (queue.length > 0) {
    schedule();
  }
}

function schedule() {
  scheduled = true;
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(flush, { timeout: 80 });
  } else {
    requestAnimationFrame(() => setTimeout(flush, 0));
  }
}

export function scheduleKaTeX(render: () => void) {
  queue.push(render);
  if (!scheduled) schedule();
}
