// columns/ingredients.columns.ts

import { ColumnDef } from "@tanstack/react-table";

export type Ingredient = {
  id: string;
  name: string;
  category: string;
  unit: string;
  cost: string;
};

export const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "name",
    header: "Ingredient",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category,
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => row.original.unit,
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => row.original.cost,
  },
];
