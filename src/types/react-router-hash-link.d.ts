declare module 'react-router-hash-link' {
  import type { ComponentType, ReactNode, MouseEventHandler } from 'react';
  import type { LinkProps } from 'react-router-dom';

  export interface HashLinkProps extends Omit<LinkProps, 'to'> {
    to: string;
    smooth?: boolean;
    scroll?: (element: HTMLElement) => void;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    className?: string;
  }

  export const HashLink: ComponentType<HashLinkProps>;
  export const NavHashLink: ComponentType<HashLinkProps>;
}
