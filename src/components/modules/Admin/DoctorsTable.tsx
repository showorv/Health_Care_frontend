"use client";


import { getDoctors } from "@/src/services/doctor.services";

import { useQuery } from "@tanstack/react-query";
import {
    
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";

import DataTable from "../../shared/table/DataTable";
import { IDoctor } from "@/src/types/doctor.types";


const DoctorsTable = () => {

    const doctorColumns = [
      { accessorKey: "name", header: "Name" },
    //   { accessorKey: "specialization", header: "Specialization" },
      { accessorKey: "experience", header: "Experience" },
    //   { accessorKey: "rating", header: "Rating" },
    ];

   

    const { data : doctorDataResponse , isLoading} = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors
    });

    const { data : doctors } = doctorDataResponse! || [];


    // const { getHeaderGroups, getRowModel } = useReactTable({
    //    data: doctors,
    //    columns: doctorColumns,
    //    getCoreRowModel: getCoreRowModel(),
    // });   

    // console.log(doctorDataResponse?.data.map(doctor => doctor.name));

    console.log(doctors);

     const handleView = (doctor : IDoctor) => {
        console.log("View doctor", doctor);
    }

    const handleEdit = (doctor : IDoctor) => {
        console.log("Edit doctor", doctor);
    }

    const handleDelete = (doctor : IDoctor) => {
        console.log("Delete doctor", doctor);
    }
  // return (

  //   <Table>
  //     <TableHeader>
  //       {getHeaderGroups().map((hg) => (
  //         <TableRow key={hg.id}>
  //           {hg.headers.map((header) => (
  //             <TableHead key={header.id}>
  //               {flexRender(
  //                 header.column.columnDef.header,
  //                 header.getContext(),
  //               )}
  //             </TableHead>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableHeader>
  //     <TableBody>
  //       {getRowModel().rows.map((row) => (
  //         <TableRow key={row.id}>
  //           {row.getVisibleCells().map((cell) => (
  //             <TableCell key={cell.id}>
  //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //             </TableCell>
  //           ))}
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // );

  return (
      <DataTable
        data={doctors}
        columns={doctorColumns}
        isLoading={isLoading}
        emptyMessage="No doctors found."
        actions={
          {
            onView : handleView,
            onEdit : handleEdit,
            onDelete : handleDelete
          }
        }
      />
    )

}

export default DoctorsTable