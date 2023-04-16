import { cx } from 'src/utils';
import './Cell.css';

interface CellProps {
  onClick: () => void;
  isSelected?: boolean;
  isHighlighted?: boolean;
  children?: React.ReactNode;
}

export const Cell: React.FC<CellProps> = ({ onClick, isSelected, children, isHighlighted }) => {
  return (
    <span className={cx('cell', isSelected && 'cell-selected', isHighlighted && 'cell-highlighted')} onClick={onClick}>
      {children}
    </span>
  );
};
