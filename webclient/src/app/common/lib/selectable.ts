export interface Selectable {
  isSelected: boolean;
  select();
  deselect();
  toggleSelected();
}
