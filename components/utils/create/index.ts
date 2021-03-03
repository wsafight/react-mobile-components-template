import { createBEM } from './bem';

export function createNamespace(name: string) {
  name = `van-${name}`;
  return [createBEM(name)] as const;
}
