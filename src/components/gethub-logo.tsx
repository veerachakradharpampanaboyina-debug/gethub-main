import Image from 'next/image';
import type { ImageProps } from 'next/image';

export default function GethubLogo(props: Partial<ImageProps>) {
  const { width = 200, height = 200, ...rest } = props;
  return (
    <Image
      src="https://i.ibb.co/xqNC3WZC/logo-jpg.jpg"
      alt="GETHUB Logo"
      width={width}
      height={height}
      {...rest}
    />
  );
}
