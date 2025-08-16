import Image from 'next/image';
import type { ImageProps } from 'next/image';

export default function GethubLogo(props: Partial<ImageProps>) {
  const { width = 200, height = 200, ...rest } = props;
  return (
    <Image
      src="https://storage.googleapis.com/res-studio-user-images/projects/f2283e78-3844-41f2-9599-f47a61d15c1b/ventura_1722330366885_616859_processed.png"
      alt="GETHUB Logo"
      width={width}
      height={height}
      {...rest}
    />
  );
}
