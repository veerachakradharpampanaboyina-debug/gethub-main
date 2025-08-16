import Image from 'next/image';
import type { ImageProps } from 'next/image';

export default function GethubLogo(props: Partial<ImageProps>) {
  const { width = 200, height = 200, ...rest } = props;
  return (
    <Image
      src="https://placehold.co/200x200.png"
      alt="GETHUB Logo"
      width={width}
      height={height}
      data-ai-hint="logo"
      {...rest}
    />
  );
}
