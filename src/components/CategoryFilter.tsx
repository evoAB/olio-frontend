import { Button, Stack } from '@mui/material';
import type { Category } from '../types/Category';

interface Props {
  categories: Category[];
  onSelect: (id: number | null) => void;
}

const CategoryFilter = ({ categories, onSelect }: Props) => (
  <Stack direction="row" spacing={2}>
    <Button variant="outlined" onClick={() => onSelect(null)}>All</Button>
    {categories.map((cat) => (
      <Button key={cat.id} variant="outlined" onClick={() => onSelect(cat.id)}>
        {cat.name}
      </Button>
    ))}
  </Stack>
);

export default CategoryFilter;
