import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
// @ts-ignore
const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  const { control, register, handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const { fields, append, remove } = useFieldArray({ control, name: 'fields' });
  const [isJsonInput, setIsJsonInput] = useState(false);
  const watchFields = watch('fields');
  // @ts-ignore
  const onSubmit = (data) => {
    if (isJsonInput) {
      try {
        const parsedJson = JSON.parse(data.jsonInput);
        onAdd(parsedJson);
      } catch (error) {
        alert('Invalid JSON');
        return;
      }
    } else {
      // @ts-ignore
      const format = data.fields.reduce((acc, field) => {
        if (field.type === 'object' || field.type === 'array') {
          acc[field.name] = { type: field.type, properties: {} };
        } else {
          acc[field.name] = { type: field.type };
        }
        return acc;
      }, {});

      onAdd(format);
    }
    onClose();
  };

  const onCloseRemove = () => {
    setValue('fields', []);
    setValue('jsonInput', '');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="mb-8 font-semibold text-2xl">Add Format</h2>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsJsonInput(false)}
            className={`px-4 py-2 border ${!isJsonInput ? 'border-indigo-600' : 'border-gray-300'} rounded-md shadow-sm text-sm font-medium ${!isJsonInput ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} hover:bg-indigo-700 hover:text-white`}
          >
            Form Input
          </button>
          <button
            onClick={() => setIsJsonInput(true)}
            className={`px-4 py-2 border ${isJsonInput ? 'border-indigo-600' : 'border-gray-300'} rounded-md shadow-sm text-sm font-medium ${isJsonInput ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} hover:bg-indigo-700 hover:text-white`}
          >
            JSON Input
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {!isJsonInput ? (
            <>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-3 mb-6">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    {...register(`fields.${index}.name`, { required: true })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    {...register(`fields.${index}.type`, { required: true })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                  </select>
                  {watchFields[index]?.type === 'object' || watchFields[index]?.type === 'array' ? (
                    <button
                      type="button"
                      onClick={() => append({ name: '', type: 'string' })}
                      className="mb-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add Subfield
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mb-4 px-4 py-2 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Remove Field
                  </button>
                  {// @ts-ignore
                  errors.fields?.[index] && <p className="mt-2 text-sm text-red-600">This field is required</p>}
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ name: '', type: 'string' })}
                className="mb-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Add Field
              </button>
            </>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">JSON Input</label>
              <textarea
                {...register('jsonInput', { required: true })}
                rows={10}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.jsonInput && <p className="mt-2 text-sm text-red-600">This field is required</p>}
            </div>
          )}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
