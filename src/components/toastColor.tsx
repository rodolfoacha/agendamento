import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  components: {
    Alert: {
      variants: {
        'custom-success': {
          container: {
            bg: '#00963f',
            color: 'white',
          },
        },
      },
    },
  },
});

export default customTheme;
