import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"

export const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "City",
      header: "City",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("City")}</div>
      ),
    },
    {
      accessorKey: "Product line",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product line
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("Product line")}</div>,
    },
    {
      accessorKey: "total_amount",
      header: () => <div className="text-right">total_amount</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{parseInt(row.getValue("total_amount")).toFixed(2)}</div>
      },
    },
    {
      accessorKey: "total_quantity",
      header: () => <div className="text-right">total_quantity</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("total_quantity")}</div>
      },
    },
    {
      accessorKey: "total_tax",
      header: () => <div className="text-right">total_tax</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{parseInt(row.getValue("total_tax")).toFixed(2)}</div>
      },
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const payment = row.original
  
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(payment.id)}
    //           >
    //             Copy payment ID
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem>View customer</DropdownMenuItem>
    //           <DropdownMenuItem>View payment details</DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     )
    //   },
    // },
  ]