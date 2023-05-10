/// <reference types="nativewind/types" />

declare module '*.jpg';
declare module '*.png';
declare module '*.otf';
declare module '*.webviewjs';

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
