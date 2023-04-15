import { cx } from 'src/utils';
import './EmptyField.css';

interface EmptyFieldProps {
  onClick: () => void;
  isSelected?: boolean;
}

export const EmptyField: React.FC<EmptyFieldProps> = ({ onClick, isSelected }) => {
  return <div className={cx('cell', isSelected && 'empty-field-selected')} onClick={onClick} />;
};
