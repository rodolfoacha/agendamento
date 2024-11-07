import {
  Button,
  Spinner,
  useToast,
  ButtonProps,
  ChakraProvider,
  extendTheme,
  AlertStatus,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Chakra UI Theme Extension
const theme = extendTheme({
  components: {
    Alert: {
      variants: {
        customLoading: {
          container: {
            bg: '#016234',
          },
        },
      },
    },
  },
});

// 2. Loading Button Component
interface LoadingButtonHomeProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButtonHome: FC<LoadingButtonHomeProps> = ({
  isLoading,
  children,
  ...rest
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <ChakraProvider theme={theme}>
      <Button
        disabled={isLoading}
        aria-disabled={isLoading}
        aria-busy={isLoading}
        {...rest}
        onClick={() => {
          const examplePromise = new Promise<void>((resolve, reject) => {
            setTimeout(() => {
              resolve();
              navigate('/agendamento');
            }, 500);
          }).catch(error => {
            console.error('Promise Error:', error);
          });

          toast.promise(examplePromise, {
            success: {
              title: 'Tudo certo! 😎',
              description: '',
              position: 'top-right',
              isClosable: true,
            },
            error: {
              title: 'Algo deu errado 😭',
              description: 'Por favor, tente novamente.',
              position: 'top-right',
              isClosable: true,
            },
            loading: {
              title: 'Conectando ao servidor',
              description: 'Por favor aguarde ⌛',
              position: 'top-right',
              duration: null, // Prevent auto-dismissal while loading
              variant: 'customLoading' as AlertStatus, // Use correct property
            },
          });
        }}
      >
        {isLoading ? <Spinner mr={2} size='md' /> : children}
      </Button>
    </ChakraProvider>
  );
};

export default LoadingButtonHome;
