// columns/recipes.columns.ts

import { ColumnDef } from "@tanstack/react-table";

export type Recipe = {
  id: string;
  name: string;
  yield: string;
  description: string;
};

export const columns: ColumnDef<Recipe>[] = [
  {
    accessorKey: "name",
    header: "Recipe",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "yield",
    header: "Yield",
    cell: ({ row }) => row.original.yield,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description,
  },
];
