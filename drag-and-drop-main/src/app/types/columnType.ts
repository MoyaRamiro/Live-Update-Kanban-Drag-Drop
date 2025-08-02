import { CardType } from "./cardType";

export interface ColumnType {
  id: string;
  title: string;
  elements: CardType[];
}
