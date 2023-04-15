import { createPortal } from 'react-dom';
import './Modal.css';
import { MODAL_ROOT_ID } from 'src/App';
import { observer } from 'mobx-react-lite';

interface ModalProps {
  content: string;
  onConfirm(): void;
  onCancel(): void;
}

export const Modal: React.FC<ModalProps> = observer(({ onCancel, onConfirm, content }) => {
  const element = document.getElementById(MODAL_ROOT_ID);
  return element
    ? createPortal(
        <div className='modal-container'>
          <div className='modal-container-inner'>
            <div className='modal-content'>
              <p>{content}</p>
            </div>
            <div className='modal-buttons'>
              <button type='button' className='confirm' onClick={onConfirm}>
                Confirm
              </button>
              <button type='button' className='cancel' onClick={onCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>,
        element,
      )
    : null;
});
