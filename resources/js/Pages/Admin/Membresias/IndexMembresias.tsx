import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Button } from "@chakra-ui/react";
import { Head, Link } from "@inertiajs/react";

export default function IndexMembresias({ auth }: PageProps) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Membresias</h2>}
        >
            <Head title="Admin" />
            <section>

                <Link 
                    href={route('admin.membresias.users')}
                >
                
                    <Button colorScheme="blue"
                    >
                        Ver Usuarios
                    </Button>
                </Link>
                

            </section>
        </AdminLayout>
    )
}