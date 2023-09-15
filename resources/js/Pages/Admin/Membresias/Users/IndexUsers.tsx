import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Button, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Pelicula } from "@/types/pelicula";

export default function IndexMembresias({ auth, users }: PageProps<{users: User[]}>) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Membresias</h2>}
        >
            <Head title="Admin" />
            <section>

            <TableContainer>
                <Table size='sm'>
                    <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Correo</Th>
                        <Th>Role</Th>
                        <Th>Created At</Th>
                        <Th>Opciones</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            users.map((user) => (
                                <Tr>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td >{user.role}</Td>
                                    <Td >{user.created_at?.toString()}</Td>
                                    <Td className="flex gap-2">
                                        <Link
                                            href={route('admin.membresias.users.edit', user.id)}
                                        >
                                            <Button>
                                                <EditIcon />
                                            </Button>
                                        </Link>

                                        <Button>
                                            <DeleteIcon />
                                        </Button>

                                    </Td>
                                </Tr>
                            ))
                        }
                   
                    </Tbody>
                </Table>
                </TableContainer>

            </section>
        </AdminLayout>
    )
}