import { Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const ScrollUpButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollY, setScrollY] = useState(0);
  console.log(scrollY);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 300) {
        onOpen();
      } else {
        onClose();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onOpen, onClose]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button className='top-button' bg={'#016234'}>
      <IconButton
        display='flex'
        justifyContent='center'
        alignItems='center'
        color={'white'}
        aria-label='Options'
        bg={'#016234'}
        // variant="outline"
        m={'10px'}
        boxShadow={'1px 1px 2px hsla(0, 28%, 0%, 0.7)'}
        border={'none'}
        _hover={{
          bg: '#00963f',
          fontWeight: 'bold',
        }}
        _active={{}}
        onClick={scrollToTop}
        position='fixed'
        bottom='20px'
        right='20px'
        // display={isOpen ? 'block' : 'none'}
        transition='all 0.5s ease'
        opacity={isOpen ? 1 : 0}
        zIndex={1990}
        icon={<FaArrowUp />}
      />
    </Button>
  );
};

export default ScrollUpButton;
