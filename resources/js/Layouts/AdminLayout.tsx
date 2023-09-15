import { User } from "@/types";
import { PropsWithChildren, ReactNode } from "react";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function AdminLayout({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const routesSideBar = [
        {
            name: 'Inicio',
            route: 'admin.index',
        },
        {
            name: 'Peliculas',
            route: 'admin.index',
        },

        {
            name: 'Membresias',
            route: 'admin.membresias',
        },
        {
            name: 'Almacen',
            route: 'admin.index',
        }, 
        {
            name: 'Compras',
            route: 'admin.index',
        },
        {
            name: 'Personal',
            route: 'admin.index',
        }
    ]


    return (
        <AuthenticatedLayout
        user={user}
        header={header}
        >
            <div className="flex gap-3">
                {/* SideBar */}

                <div className="flex flex-col gap-2 bg-slate-50 px-3 py-2 dark:bg-gray-800">
                    {
                        routesSideBar.map((item) => (
                            <Link
                                href={route(item.route)}
                                className="text-gray-500 dark:text-gray-400 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                </div>

                <section className="flex-1 px-4 py-3 bg-white dark:bg-gray-900">
                    {
                        children
                    }
                </section>


            </div>


        </AuthenticatedLayout>
    )

}