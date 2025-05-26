import React from "react";
import Image from "next/image";
import Input from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";

interface AddTaskModalProps {
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onSave }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Nombre obligatorio"),
      description: Yup.string().required("Descripcion obligatoria"),
    }),
    onSubmit: (values) => {
      onSave(values.title, values.description);
    },
  });

  const handleOnClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div className="w-full h-full bg-dark-grey opacity-75 absolute" />
      <div className="bg-white w-full max-w-sm rounded-md p-6 relative mt-8">
        {/* Close button */}
        <button
          onClick={handleOnClose}
          className="absolute top-3 right-3 text-gray-700 text-xl"
        >
          <Image src="/icons/Close.svg" width={15} height={15} alt="a" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-6">Añadir tarea</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* Nombre */}
          <Input
            label="Nombre"
            required={false}
            error={formik.errors.title}
            name="title"
            type="text"
            placeholder="Nombre"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          <Input
            label="Descripcion"
            required={false}
            error={formik.errors.description}
            name="description"
            placeholder="Descripcion"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            textArea
          />

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="text-primary font-medium"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={`bg-primary-green ${
                formik.isValid && formik.dirty
                  ? ""
                  : "opacity-50 cursor-not-allowed"
              } text-white font-medium px-6 py-2 rounded`}
              disabled={!(formik.isValid && formik.dirty)}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
