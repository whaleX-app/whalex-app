import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

export const twConfig = resolveConfig(tailwindConfig) as any;
