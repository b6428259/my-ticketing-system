import React from 'react';
import { IconButton } from '@mui/material';
import { Plus, Minus } from 'lucide-react';

const TicketTypeRow = ({ type, label, price, count, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center justify-between my-2">
      <span>{`${label} ($${price}):`}</span>
      <div className="flex items-center space-x-2">
        <IconButton onClick={onDecrement} aria-label={`Decrease ${type}`} disabled={count <= 0}>
          <Minus />
        </IconButton>
        <span>{count}</span>
        <IconButton onClick={onIncrement} aria-label={`Increase ${type}`} disabled={count >= 10}>
          <Plus />
        </IconButton>
      </div>
    </div>
  );
};

export default TicketTypeRow;