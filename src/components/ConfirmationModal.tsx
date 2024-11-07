import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Confirmar Exclusão</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        Tem certeza que deseja excluir este funcionário?
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={onClose}>
          Cancelar
        </Button>
        <Button colorScheme="red" onClick={onConfirm}>
          Excluir
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ConfirmationModal;
