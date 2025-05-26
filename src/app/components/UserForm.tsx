import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { useAppContext } from "../States/AppProvider";

const UserForm = () => {
  const { user, setUser } = useAppContext();

  const formik = useFormik({
    initialValues: user,
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre requerido"),
      email: Yup.string()
        .email("Email invalido")
        .required("El email es obligatorio"),
      phone: Yup.string()
        .matches(/^\+?[0-9\s\-().]{7,20}$/, "El telefono es invalido")
        .required("Telefono es requerido"),
    }),
    onSubmit: (values) => {
      setUser(values);
      alert("Guardado con exito");
    },
  });

  const isButtonActive = formik.isValid && formik.dirty;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 p-6 shadow-[0px_1px_4px_1px_#0000001F] bg-white rounded-md w-full max-w-md "
    >
      <Input
        label="Nombre"
        required={true}
        type="text"
        name="name"
        placeholder="Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <Input
        label="Email"
        required={true}
        type="email"
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Input
        label="Telefono"
        required={true}
        type="tel"
        name="phone"
        placeholder="Phone"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        error={formik.errors.phone}
      />

      <button
        type="submit"
        disabled={!isButtonActive}
        className={`rounded-[5px] py-[12px] px-[141px] mt-10 flex justify-center items-center gap-[10px] w-full bg-primary-green text-white ${
          isButtonActive ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
        }`}
      >
        Guardar
      </button>
    </form>
  );
};

export default UserForm;
