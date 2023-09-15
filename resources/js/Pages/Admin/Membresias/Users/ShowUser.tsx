import AdminLayout from "@/Layouts/AdminLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select } from "@chakra-ui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Field, Form, Formik } from "formik";



export default function ShowUser({ auth, user }: PageProps<{user: User}>) {
    const { data, setData, patch, errors } = useForm({
        name: user.name,
        role: user.role,
    });
    
    function validateForm(value: User) {
        const errors: any = {};
        
        if (!value.name) {
            errors.name = "Se requiere un nombre de usuario";
        }
        
        if (!value.email) {
            errors.info = "Se requiere un correo electronico";
        }
    
        if (!value.role) {
            errors.files = "Se requiere un rol";
        }
        
        return errors;
    }
    
    



    function sendForm(value: User, actions: any) {

        patch(route('admin.membresias.users.update', user.id));

        actions.setSubmitting(false);
    }


    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Membresias</h2>}
        >
            <Head title="Admin" />
            <section>

                <h3 className="font-semibold text-lg mb-6">Edicion de usuario</h3>

                {/* Para ver los errores */}
                <p>{errors.name}</p>
                <p>{errors.role}</p>

                <Formik
                    

                    initialValues={{
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }}

                    onSubmit={sendForm}
                    validate={validateForm}
                    
                >
                    {
                        (props) => (
                            <Form className="grid grid-cols-2 gap-3">
                                {/* Name */}
                                <Field name="name">
                                    {(dataa: { field: any; form: any }) => (
                                        <FormControl
                                            isInvalid={dataa.form.errors.name && dataa.form.touched.name}
                                        >
                                        <div>
                                            <FormLabel>Nombre de la Empresa</FormLabel>
                                            <Input {...dataa.field} placeholder="Nombre de usuario" 
                                                value={data.name}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    setData('name', value);
                                                    dataa.form.setFieldValue('name', value);
                                                }}
                                            />
                                            <FormErrorMessage>{dataa.form.errors.name}</FormErrorMessage>
                                        </div>
                                        </FormControl>
                                    )}
                                </Field>
                                
                                {/* Email */}
                                <Field name="email">
                                    {(data: { field: any; form: any }) => (
                                        <FormControl
                                            isInvalid={data.form.errors.email && data.form.touched.email}

                                        >
                                        <div>
                                            <FormLabel>Correo Electronico</FormLabel>
                                            <Input {...data.field} placeholder="Correo Electronico" disabled/>
                                            <FormErrorMessage>{data.form.errors.email}</FormErrorMessage>
                                        </div>
                                        </FormControl>
                                    )}
                                </Field>

                                {/* Role - Select */}
                                <Field name="role">
                                    {(dataa: { field: any; form: any }) => (
                                        <FormControl
                                            isInvalid={dataa.form.errors.role && dataa.form.touched.role}
                                        >
                                        <div>
                                            <FormLabel>Rol</FormLabel>
                                            <Select placeholder='Elija un rol'
                                                {...dataa.field}
                                                value={data.role}
                                                onChange={(event) => {
                                                    const value = event.target.value;
                                                    dataa.form.setFieldValue('role', value);
                                                    setData('role', value);
                                                  }}
                                            >
                                                <option value='admin'>Administrador</option>
                                                <option value='user'>Usuario</option>
                                            </Select>

                                            <FormErrorMessage>{dataa.form.errors.role}</FormErrorMessage>
                                        </div>
                                        </FormControl>
                                    )}
                                </Field>

                                <div className="col-span-2">
                                    <Button
                                        mt={4}
                                        colorScheme="blue"
                                        isLoading={props.isSubmitting}
                                        type="submit"
                                        >
                                        Enviar
                                    </Button>

                                </div>


                            </Form>

                        )
                    }

                </Formik>
                

            </section>
        </AdminLayout>
    )
}