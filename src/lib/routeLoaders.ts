const loaders: Record<string, () => Promise<unknown>> = {};

export function registerLoader(path: string, loader: () => Promise<unknown>) {
  loaders[path] = loader;
}

export function prefetch(path: string) {
  const loader = loaders[path];
  if (loader) {
    loader();
  }
}
