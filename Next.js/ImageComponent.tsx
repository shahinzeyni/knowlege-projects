import Image from 'next/image';

const MyComponent = () => {
  return (
    <Image
      src="/example.jpg"
      alt="Example Image"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default MyComponent;
