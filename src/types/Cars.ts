import { Color } from './Color';

export type Cars = {
  id: number;
  brand: string;
  rentPrice: number;
  colorId: number;
  color: Color | undefined;
};
