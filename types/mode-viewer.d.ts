declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      ar?: boolean;
      'ar-modes'?: string;
      'camera-controls'?: boolean;
      'auto-rotate'?: boolean;
      autoplay?: boolean;
      style?: React.CSSProperties;
      'environment-image'?: string;
      'skybox-image'?: string;
      'shadow-intensity'?: string;
      'camera-orbit'?: string;
      'max-camera-orbit'?: string;
    };
  }
}
